import urllib.request
import re

js_url = 'https://tiranlasry.com/assets/index-DU29JcrF.js'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

req = urllib.request.Request(js_url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        js = resp.read().decode('utf-8', errors='ignore')
        
        # Look for hero section or home component in the JS
        # search for Living_room or CAT_ or slogans
        idx = js.find('Living_room')
        if idx != -1:
            print("Found Living_room context:")
            print(js[max(0, idx-300):idx+500])
            
        idx2 = js.find('CAT_CEILING')
        if idx2 != -1:
            print("\nFound CAT_CEILING context:")
            print(js[max(0, idx2-200):idx2+400])

        # Also search for CSS colors / background colors
        # What is the navbar like, what is the hero like?
        idx3 = js.find('bright_logo_horizontal')
        if idx3 != -1:
            print("\nFound bright_logo_horizontal context:")
            print(js[max(0, idx3-200):idx3+400])

except Exception as e:
    print("Error:", e)
