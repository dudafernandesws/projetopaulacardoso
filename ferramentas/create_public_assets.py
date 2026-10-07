from pathlib import Path
import base64
import json
import re

project = Path(__file__).resolve().parents[1]
dist = project / "site" / "web"
output = project / "entregas"
public_js = (dist / "public.js").read_text()
html = (dist / "index.html").read_text()

css = (dist / "style.css").read_text()
embedded_assets = {}
for path in (dist / "assets").glob("*.jpg"):
    uri = "data:image/jpeg;base64," + base64.b64encode(path.read_bytes()).decode()
    embedded_assets[path.name] = uri
    css = css.replace("assets/" + path.name, uri)
embedded_js = "window.__embeddedAssets=" + json.dumps(embedded_assets) + ";\n" + public_js
standalone = re.sub(r'<link rel="stylesheet" href="style.css[^"]*">', '<style>'+css+'</style>', html)
standalone = re.sub(r'<script src="public.js[^"]*"></script>', '<script>'+embedded_js.replace('</script','<\\/script')+'</script>', standalone)
(output / "paula-cardoso-publica.html").write_text(standalone, encoding="utf-8")
print("Public assets updated")
