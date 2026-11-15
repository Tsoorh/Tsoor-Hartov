import urllib.request

images_to_test = [
    'https://tiranlasry.com/images/Figma/bright_logo_horizontal.png',
    'https://tiranlasry.com/images/Figma/Tiran_T_Grey_Logo.png',
    'https://tiranlasry.com/images/Figma/CAT_CEILING.jpg',
    'https://tiranlasry.com/images/Figma/CAT_WALL.jpg',
    'https://tiranlasry.com/images/Figma/CAT_PENDANT.jpg',
    'https://tiranlasry.com/images/Figma/Living_room.png',
    'https://tiranlasry.com/images/Figma/Green_light.png',
    'https://tiranlasry.com/images/Figma/Table_light.png',
    'https://tiranlasry.com/images/Figma/Tiran_lasry_slogen.png'
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for img in images_to_test:
    req = urllib.request.Request(img, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"200 OK: {img} (Content-Type: {resp.headers.get('Content-Type')}, length: {resp.headers.get('Content-Length')})")
    except Exception as e:
        print(f"FAILED: {img} -> {e}")
