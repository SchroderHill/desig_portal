import json
import threading
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
            self.assertEqual(json.load(response)['name'], 'Kenningtons on-demand trial')
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
