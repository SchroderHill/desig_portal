"""Refresh the small official source metadata index; downloads no DEM pixels."""
import json
from pathlib import Path
import sys
import tempfile

root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root/'server'))
from linz_catalogue import load_catalogue

cache = Path(tempfile.gettempdir())/'design-portal-slope-cache'
cache.mkdir(exist_ok=True)
sources = load_catalogue(cache)
path = root/'server'/'linz-dem-index.json'
path.write_text(json.dumps(sources, separators=(',', ':'))+'\n')
print(f'Indexed {len(sources)} LINZ DEM sources ({path.stat().st_size} bytes)', flush=True)
