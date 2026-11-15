import urllib.request
import re

js_url = 'https://tiranlasry.com/assets/index-DU29JcrF.js'
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request(js_url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        js = resp.read().decode('utf-8', errors='ignore')
        
        # Look for nav items
        nav_matches = re.findall(r'\{to:["\']([^"\']+)["\'],[^}]*label:([^}]+)\}', js)
        print("Nav items:", nav_matches[:10])
        
        # Look for Hero text or intro
        # What is the navbar background?
        idx = js.find('entry-logo')
        print("entry-logo context:")
        print(js[idx-100:idx+400])
        
except Exception as e:
    print("Error:", e)
