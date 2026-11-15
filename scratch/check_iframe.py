import urllib.request

req = urllib.request.Request('https://tiranlasry.com', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        print("X-Frame-Options:", resp.headers.get('X-Frame-Options'))
        print("Content-Security-Policy:", resp.headers.get('Content-Security-Policy'))
except Exception as e:
    print("Error:", e)
