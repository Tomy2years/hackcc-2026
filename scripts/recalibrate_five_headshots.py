import os
from PIL import Image

HEADSHOT_DIR = "public/assets/headshots"
BACKUP_DIR = "public/assets/headshots-backup"

def save_all_variants(canvas: Image.Image, name: str):
    """Save canvas as cutout PNG and also overwrite any base image format to avoid caching/broken links."""
    out_cutout = os.path.join(HEADSHOT_DIR, f"{name}-headshot-cutout.png")
    canvas.save(out_cutout, "PNG", optimize=True)
    print(f"Saved {out_cutout} ({canvas.size})")

    for ext in [".png", ".jpg", ".jpeg", ".JPG", ".JPEG"]:
        p = os.path.join(HEADSHOT_DIR, f"{name}-headshot{ext}")
        if os.path.exists(p):
            canvas.save(p, "PNG", optimize=True)
            print(f"  -> Also updated {p}")

def process_headshot(
    rem_image_path: str,
    name: str,
    target_canvas_w: int = 640,
    target_canvas_h: int = 800,
    top_y: int = 70,
    scale_factor: float = 1.0,
    custom_crop=None
):
    rem = Image.open(rem_image_path).convert("RGBA")
    
    if custom_crop:
        cropped = rem.crop(custom_crop)
    else:
        bbox = rem.getbbox()
        cropped = rem.crop(bbox)
        
    w, h = cropped.size
    
    # Calculate uniform scaling factor
    new_w = int(w * scale_factor)
    new_h = int(h * scale_factor)
    
    scaled = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new("RGBA", (target_canvas_w, target_canvas_h), (0, 0, 0, 0))
    paste_x = (target_canvas_w - new_w) // 2
    paste_y = top_y
    
    canvas.paste(scaled, (paste_x, paste_y), scaled)
    save_all_variants(canvas, name)
    return canvas

def main():
    print("Recalibrating the 5 requested organizers headshots...")

    # 1. Ethan Wu
    # scratch_ethan_rem.png bbox is (80, 185, 1019, 1080)
    # Head height in orig is ~455px. We scale so head is ~345px (scale ~0.76)
    # This brings total height to ~680px, placed at top_y=70, shoulders width=715px on 640 canvas
    # Result: Full headshot showing head, neck, shoulders, and chest without over-zooming.
    process_headshot(
        rem_image_path="scratch_ethan_rem.png",
        name="ethan-wu",
        target_canvas_w=640,
        target_canvas_h=800,
        top_y=70,
        scale_factor=0.765
    )

    # 2. Anjani Shaw
    # scratch_anjani_rem.png bbox is (11, 213, 600, 800)
    # Original width 589, height 587. Scale uniformly by 1.18 to match standard headshot size
    # Result: Completely uncompressed, natural 1:1 aspect ratio.
    process_headshot(
        rem_image_path="scratch_anjani_rem.png",
        name="anjani-shaw",
        target_canvas_w=640,
        target_canvas_h=800,
        top_y=75,
        scale_factor=1.18
    )

    # 3. Hillary Nguyen
    # scratch_hillary_rem.png bbox is (75, 65, 514, 800)
    # Original width 439, height 735. In orig, top of head is at y=65.
    # We position her with top_y=80 on canvas (640, 800) and scale 1.02 uniformly.
    # Result: Head has generous breathing room from the top edge so it is never cut off.
    process_headshot(
        rem_image_path="scratch_hillary_rem.png",
        name="hillary-nguyen",
        target_canvas_w=640,
        target_canvas_h=800,
        top_y=80,
        scale_factor=1.02
    )

    # 4. Kaden Lo
    # scratch_kaden_rem.png size is (896, 1195), bbox (0, 173, 896, 1195)
    # Person height is 1022. Scale uniformly by 0.725 so height is ~740px.
    # Result: Perfect 1:1 aspect ratio with zero horizontal compression.
    process_headshot(
        rem_image_path="scratch_kaden_rem.png",
        name="kaden-lo",
        target_canvas_w=640,
        target_canvas_h=800,
        top_y=60,
        scale_factor=0.725
    )

    # 5. Yuval Perel
    # scratch_yuval_rem.png size is (1080, 1080), bbox (236, 168, 845, 1080)
    # Width 609, height 912. Scale uniformly by 0.76 (new_w=463, new_h=693).
    # Result: Exact natural aspect ratio, no horizontal stretch on ears or face, head starts at top_y=85.
    process_headshot(
        rem_image_path="scratch_yuval_rem.png",
        name="yuval-perel",
        target_canvas_w=640,
        target_canvas_h=800,
        top_y=85,
        scale_factor=0.76
    )

    print("\nAll 5 organizer portraits recalibrated and saved successfully!")

if __name__ == "__main__":
    main()
