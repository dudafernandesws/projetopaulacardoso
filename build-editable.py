from pathlib import Path
import base64,json,re
root=Path(__file__).parent/'dist'
sources=[(root/n).read_text() for n in ['style.css','app.js','editor.js']]
# A single-file copy uses embedded full-resolution photos instead of responsive paths.
sources[1]=re.sub(r' srcset="[^"]*" sizes="[^"]*"','',sources[1])
for path in (root/'assets').glob('*.jpg'):
 uri='data:image/jpeg;base64,'+base64.b64encode(path.read_bytes()).decode()
 sources=[s.replace('assets/'+path.name,uri) for s in sources]
safe=lambda s:re.sub('</script',r'<\\/script',s,flags=re.I)
html=(root/'index.html').read_text()
html=re.sub(r'<link rel="stylesheet" href="style.css[^\"]*">',lambda m:'<style>'+sources[0]+'</style>',html)
html=re.sub(r'<script src="(?:saved-edits|app|editor)\.js[^\"]*"></script>','',html)
script='<script>'+safe((root/'saved-edits.js').read_text())+'window.CLARA_SOURCE='+safe(json.dumps(sources,ensure_ascii=False))+';\n'+safe(sources[1])+'\n'+safe(sources[2])+'</script>'
html=html.replace('</body>',script+'</body>')
(root.parent/'clara-luz-editavel.html').write_text(html)
print('Standalone updated:',round(len(html.encode())/1e6,2),'MB')
print('Original photos:',sum(p.stat().st_size for p in (root/'assets').glob('*.png')),'bytes')
print('960px JPG photos:',sum(p.stat().st_size for p in (root/'assets').glob('*-960.jpg')),'bytes')
