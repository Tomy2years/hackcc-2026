import os
from PIL import Image

CUTOUT_DIR = "public/assets/headshots"

def save_and_copy(im, name):
    # Save both *-headshot-cutout.png and *-headshot.png (and .jpg if existed)
    out_cutout = os.path.join(CUTOUT_DIR, f"{name}-headshot-cutout.png")
    im.save(out_cutout, "PNG")
    
    # Also save to base name
    for ext in [".png", ".jpg", ".jpeg", ".JPG", ".JPEG"]:
        p = os.path.join(CUTOUT_DIR, f"{name}-headshot{ext}")
        if os.path.exists(p):
            im.save(p, "PNG")

def main():
    print("Starting headshot calibration for all organizers...")
    
    # 1. Grace Xu
    im = Image.open(f"{CUTOUT_DIR}/grace-xu-headshot-cutout.png").convert("RGBA")
    c = im.crop((145, 170, 620, 800))
    res = c.resize((600, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "grace-xu")
    print("Processed Grace Xu")

    # 2. Jessie Joyce
    im = Image.open(f"{CUTOUT_DIR}/jessie-joyce-headshot-cutout.png").convert("RGBA")
    c = im.crop((130, 205, 475, 609))
    res = c.resize((640, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "jessie-joyce")
    print("Processed Jessie Joyce")

    # 3. Yuval Perel
    im = Image.open(f"{CUTOUT_DIR}/yuval-perel-headshot-cutout.png").convert("RGBA")
    c = im.crop((165, 95, 635, 800))
    res = c.resize((600, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "yuval-perel")
    print("Processed Yuval Perel")

    # 4. Ethan Wu
    im = Image.open(f"{CUTOUT_DIR}/ethan-wu-headshot-cutout.png").convert("RGBA")
    cropped = im.crop((59, 137, 755, 800))
    scaled_w = int(cropped.width * (730 / cropped.height))
    scaled = cropped.resize((scaled_w, 730), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (640, 800), (0, 0, 0, 0))
    paste_x = (640 - scaled_w) // 2
    canvas.paste(scaled, (paste_x, 70), scaled)
    save_and_copy(canvas, "ethan-wu")
    print("Processed Ethan Wu")

    # 5. Kate Lay
    im = Image.open(f"{CUTOUT_DIR}/kate-lay-headshot-cutout.png").convert("RGBA")
    bbox = im.getbbox()
    cropped = im.crop(bbox)
    scaled_w = int(cropped.width * (730 / cropped.height))
    scaled = cropped.resize((scaled_w, 730), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (640, 800), (0, 0, 0, 0))
    paste_x = (640 - scaled_w) // 2
    canvas.paste(scaled, (paste_x, 70), scaled)
    save_and_copy(canvas, "kate-lay")
    print("Processed Kate Lay")

    # 6. Anjani Shaw
    im = Image.open(f"{CUTOUT_DIR}/anjani-shaw-headshot-cutout.png").convert("RGBA")
    c = im.crop((10, 160, 600, 800))
    res = c.resize((620, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "anjani-shaw")
    print("Processed Anjani Shaw")

    # 7. Elai Aviv
    im = Image.open(f"{CUTOUT_DIR}/elai-aviv-headshot-cutout.png").convert("RGBA")
    c = im.crop((0, 180, 365, 800))
    scaled_w = int(c.width * (750 / c.height))
    scaled = c.resize((scaled_w, 750), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (600, 800), (0, 0, 0, 0))
    canvas.paste(scaled, ((600 - scaled_w) // 2, 50), scaled)
    save_and_copy(canvas, "elai-aviv")
    print("Processed Elai Aviv")

    # 8. Evelyn Cao
    im = Image.open(f"{CUTOUT_DIR}/evelyn-cao-headshot-cutout.png").convert("RGBA")
    c = im.crop((135, 50, 705, 800))
    res = c.resize((620, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "evelyn-cao")
    print("Processed Evelyn Cao")

    # 9. Hillary Nguyen
    im = Image.open(f"{CUTOUT_DIR}/hillary-nguyen-headshot-cutout.png").convert("RGBA")
    c = im.crop((70, 50, 520, 670))
    res = c.resize((600, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "hillary-nguyen")
    print("Processed Hillary Nguyen")

    # 10. Jay De Guzman
    im = Image.open(f"{CUTOUT_DIR}/jay-de-guzman-headshot-cutout.png").convert("RGBA")
    c = im.crop((0, 130, 450, 800))
    scaled_w = int(c.width * (750 / c.height))
    scaled = c.resize((scaled_w, 750), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (600, 800), (0, 0, 0, 0))
    canvas.paste(scaled, ((600 - scaled_w) // 2, 50), scaled)
    save_and_copy(canvas, "jay-de-guzman")
    print("Processed Jay De Guzman")

    # 11. Dasha Binskaia
    im = Image.open(f"{CUTOUT_DIR}/dasha-binskaia-headshot-cutout.png").convert("RGBA")
    bbox = im.getbbox()
    c = im.crop(bbox)
    scaled_w = int(c.width * (730 / c.height))
    scaled = c.resize((scaled_w, 730), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (640, 800), (0, 0, 0, 0))
    canvas.paste(scaled, ((640 - scaled_w) // 2, 50), scaled)
    save_and_copy(canvas, "dasha-binskaia")
    print("Processed Dasha Binskaia")

    # 12. Huy Doan
    im = Image.open(f"{CUTOUT_DIR}/huy-doan-headshot-cutout.png").convert("RGBA")
    c = im.crop((30, 50, 640, 800))
    res = c.resize((640, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "huy-doan")
    print("Processed Huy Doan")

    # 13. Jacob Aquino
    im = Image.open(f"{CUTOUT_DIR}/jacob-aquino-headshot-cutout.png").convert("RGBA")
    c = im.crop((20, 40, 630, 800))
    res = c.resize((640, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "jacob-aquino")
    print("Processed Jacob Aquino")

    # 14. Kaden Lo
    im = Image.open(f"{CUTOUT_DIR}/kaden-lo-headshot-cutout.png").convert("RGBA")
    c = im.crop((0, 60, 599, 800))
    res = c.resize((600, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "kaden-lo")
    print("Processed Kaden Lo")

    # 15. Miles Li
    im = Image.open(f"{CUTOUT_DIR}/miles-li-headshot-cutout.png").convert("RGBA")
    c = im.crop((0, 80, 600, 800))
    res = c.resize((600, 800), Image.Resampling.LANCZOS)
    save_and_copy(res, "miles-li")
    print("Processed Miles Li")

    # 16. Vien Le
    im = Image.open(f"{CUTOUT_DIR}/vien-le-headshot-cutout.png").convert("RGBA")
    bbox = im.getbbox()
    c = im.crop(bbox)
    scaled_w = int(c.width * (750 / c.height))
    scaled = c.resize((scaled_w, 750), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (600, 800), (0, 0, 0, 0))
    canvas.paste(scaled, ((600 - scaled_w) // 2, 50), scaled)
    save_and_copy(canvas, "vien-le")
    print("Processed Vien Le")

    # 17. Liam Najjar
    im = Image.open(f"{CUTOUT_DIR}/liam-najjar-headshot-cutout.png").convert("RGBA")
    bbox = im.getbbox()
    c = im.crop(bbox)
    scaled_w = int(c.width * (740 / c.height))
    scaled = c.resize((scaled_w, 740), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (640, 800), (0, 0, 0, 0))
    canvas.paste(scaled, ((640 - scaled_w) // 2, 60), scaled)
    save_and_copy(canvas, "liam-najjar")
    print("Processed Liam Najjar")

    print("All organizer headshots calibrated and standardized successfully!")

if __name__ == "__main__":
    main()
