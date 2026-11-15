import urllib.request
import re

html_url = 'https://tiranlasry.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

req = urllib.request.Request(html_url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        css_files = re.findall(r'<link[^>]+href=["\']([^"\']+\.css)["\']', html)
        print("CSS files:", css_files)
        
        for css in css_files:
            css_url = f"https://tiranlasry.com{css}" if css.startswith('/') else css
            req_css = urllib.request.Request(css_url, headers=headers)
            with urllib.request.urlopen(req_css, timeout=15) as cresp:
                css_text = cresp.read().decode('utf-8', errors='ignore')
                print(f"CSS {css} length:", len(css_text))
                # Search for body background color
                body_match = re.search(r'body\s*\{([^}]+)\}', css_text)
                if body_match:
                    print("body style:", body_match.group(1))
                # Search for colors
                colors = re.findall(r'#[0-9a-fA-F]{3,6}', css_text)
                print("Popular colors:", list(dict.fromkeys(colors))[:15])

except Exception as e:
    print("Error:", e)
