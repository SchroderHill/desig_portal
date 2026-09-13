"""Run with: python server/desktop.py. Loopback only; not a public hosting server."""
from concurrent.futures import ThreadPoolExecutor
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
import threading
from urllib.parse import urlparse, unquote
import uuid

from slope_service import SlopeService

ROOT = Path(__file__).resolve().parents[1]


def create_server(port=4174, service=None):
    service = service or SlopeService()
    executor = ThreadPoolExecutor(max_workers=1)
    jobs = {}
    progress = {}
    cancellations = {}
    lock = threading.Lock()

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(ROOT), **kwargs)

        def allowed_origin(self):
            host = self.headers.get('Host', '')
            allowed = {f'localhost:{self.server.server_port}', f'127.0.0.1:{self.server.server_port}'}
            origin = self.headers.get('Origin')
            return host in allowed and (not origin or origin in {f'http://{h}' for h in allowed})

        def send_json(self, value, status=200):
            content = json.dumps(value).encode()
            self.send_response(status)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(content)

        def do_POST(self):
            if not self.allowed_origin():
                return self.send_json(dict(error='Only same-origin desktop requests are allowed'), 403)
            if self.path.startswith('/api/slope/cancel/'):
                key = self.path.rsplit('/', 1)[-1]
                event = cancellations.get(key)
                if event:
                    event.set()
                return self.send_json(dict(cancelled=bool(event)))
            if self.path != '/api/slope/prepare':
                return self.send_json(dict(error='Not found'), 404)
            try:
                length = int(self.headers.get('Content-Length', '0'))
                if not 0 < length <= 250000:
                    raise ValueError('Invalid request size')
                request = json.loads(self.rfile.read(length))
                if not isinstance(request, dict):
                    raise ValueError('Request must be an object')
                from slope_service import request_tiles
                if not request.get('areas'):
                    raise ValueError('Load a GeoPDF or select an analysis area first')
                request_tiles(request.get('bounds'), request.get('roads', []), request['areas'])
                with lock:
                    if sum(not job.done() for job in jobs.values()) >= 2:
                        return self.send_json(dict(error='Slope service busy; retry shortly'), 429)
                    if len(jobs) > 100:
                        for key in list(jobs):
                            if jobs[key].done():
                                del jobs[key]
                                progress.pop(key, None)
                                cancellations.pop(key, None)
                    key = uuid.uuid4().hex
                    cancellations[key] = threading.Event()
                    progress[key] = 'Waiting for LiDAR preparation…'
                    jobs[key] = executor.submit(service.prepare, request['bounds'], request.get('roads', []), request['areas'],
                        progress=lambda message: progress.update({key: message}), cancelled=cancellations[key].is_set)
                self.send_json(dict(job=key), 202)
            except (ValueError, TypeError, KeyError) as error:
                self.send_json(dict(error=str(error)), 400)

        def do_GET(self):
            if not self.allowed_origin():
                return self.send_json(dict(error='Only loopback desktop access is allowed'), 403)
            path = urlparse(self.path).path
            if path == '/api/slope/coverage':
                return self.send_json(dict(name='LINZ national 1 m DEM', bounds=[166, -48, 180, -33]))
            if path.startswith('/api/slope/jobs/'):
                key = path.rsplit('/', 1)[-1]
                job = jobs.get(key)
                if job is None: return self.send_json(dict(error='Unknown slope job'), 404)
                if not job.done(): return self.send_json(dict(state='preparing', message=progress.get(key)))
                try: return self.send_json(dict(state='ready', result=job.result()))
                except Exception as error: return self.send_json(dict(state='error', error=str(error)), 502)
            if path.startswith('/api/slope/tiles/'):
                filename = path.rsplit('/', 1)[-1]
                if not re.fullmatch(r'[0-9a-f]{20}-[0-9]+-[0-9]+\.json\.gz', filename):
                    return self.send_json(dict(error='Invalid tile'), 400)
                file = service.cache/filename
                if not file.is_file(): return self.send_json(dict(error='Tile not found'), 404)
                content = file.read_bytes()
                self.send_response(200)
                self.send_header('Content-Type', 'application/gzip')
                self.send_header('Content-Length', str(len(content)))
                self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
                self.end_headers()
                return self.wfile.write(content)
            # Never expose git metadata, local references, scripts, or directory listings.
            decoded = unquote(path)
            if '..' in decoded.split('/') or not (decoded in ('/', '/index.html') or decoded.startswith(('/geopdf-dist/', '/data/slope/'))):
                return self.send_error(404)
            resolved = (ROOT/decoded.lstrip('/')).resolve()
            if not resolved.is_relative_to(ROOT) or (resolved.is_dir() and decoded != '/'):
                return self.send_error(404)
            if decoded == '/': self.path = '/index.html'
            super().do_GET()

        def do_HEAD(self):
            self.send_error(405)

    server = ThreadingHTTPServer(('127.0.0.1', port), Handler)
    server.daemon_threads = True
    return server


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4174)
    args = parser.parse_args()
    print(f'Design Portal desktop trial: http://127.0.0.1:{args.port}/', flush=True)
    create_server(args.port).serve_forever()
