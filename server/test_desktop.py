import json
import threading
import time
import unittest
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from desktop import create_server


class DesktopTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = create_server(0)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def test_coverage_and_page(self):
        with urlopen(self.url+'/api/slope/coverage') as response:
            self.assertEqual(json.load(response)['name'], 'LINZ national 1 m DEM')
        with urlopen(self.url+'/') as response:
            self.assertIn(b'Design Portal', response.read())

    def test_private_paths_and_foreign_origins_blocked(self):
        for path in ['/.git/config', '/server/slope_service.py', '/geopdf-dist/../server/desktop.py']:
            with self.assertRaises(HTTPError) as caught:
                urlopen(self.url+path)
            self.assertEqual(caught.exception.code, 404)
        with self.assertRaises(HTTPError) as caught:
            urlopen(Request(self.url+'/api/slope/coverage', headers={'Origin':'https://example.com'}))
        self.assertEqual(caught.exception.code, 403)

    def test_invalid_request_rejected_without_job(self):
        for payload in [[], {}, {'bounds':{'west':173,'east':174,'south':-42,'north':-41}}]:
            with self.assertRaises(HTTPError) as caught:
                urlopen(Request(self.url+'/api/slope/prepare', data=json.dumps(payload).encode(), headers={'Content-Type':'application/json'}))
            self.assertEqual(caught.exception.code, 400)

    def test_progress_and_cancel_reach_running_job(self):
        started = threading.Event()
        class Service:
            def prepare(self, bounds, roads, areas, progress, cancelled):
                progress('Preparing tile 1')
                started.set()
                deadline = time.monotonic()+3
                while not cancelled() and time.monotonic() < deadline:
                    time.sleep(.01)
                return {'cancelled': cancelled()}
        server = create_server(0, Service())
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        url = f'http://127.0.0.1:{server.server_port}'
        try:
            b = dict(west=173.73, east=173.731, south=-41.65, north=-41.649)
            with urlopen(Request(url+'/api/slope/prepare', data=json.dumps({'bounds':b,'areas':[b]}).encode())) as response:
                job = json.load(response)['job']
            self.assertTrue(started.wait(1))
            with urlopen(url+'/api/slope/jobs/'+job) as response:
                self.assertEqual(json.load(response)['message'], 'Preparing tile 1')
            with urlopen(Request(url+'/api/slope/cancel/'+job, data=b'')) as response:
                self.assertTrue(json.load(response)['cancelled'])
        finally:
            server.shutdown()
            server.server_close()
