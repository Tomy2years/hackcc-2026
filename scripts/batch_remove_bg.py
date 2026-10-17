import os
import sys
import glob
import time
from PIL import Image
from rembg import remove, new_session

def main():
    input_dir = os.path.abspath("public/assets/headshots-backup")
    output_dir = os.path.abspath("public/assets/headshots")
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Supported image extensions
    patterns = ["*.png", "*.jpg", "*.jpeg", "*.JPG", "*.JPEG"]
    files = []
    for p in patterns:
        files.extend(glob.glob(os.path.join(input_dir, p)))
    files = sorted(list(set(files)))
    
    print(f"Found {len(files)} headshots to process in {input_dir}")
    print("Initializing rembg session (bria-rmbg)...")
    
    t0 = time.time()
    session = new_session("bria-rmbg")
    print(f"Session initialized in {time.time() - t0:.2f}s")
    
    for i, file_path in enumerate(files, 1):
        filename = os.path.basename(file_path)
        stem = os.path.splitext(filename)[0]
        out_png = os.path.join(output_dir, f"{stem}.png")
        
        print(f"[{i}/{len(files)}] Processing {filename} -> {stem}.png ...", end=" ", flush=True)
        img_t0 = time.time()
        try:
            with Image.open(file_path) as img:
                # Remove background
                result = remove(img, session=session)
                # Save as transparent PNG
                result.save(out_png, format="PNG")
                
                # If original was .jpg or .jpeg, also save a PNG-encoded copy to the original filename 
                # to prevent any broken links before json update
                orig_target = os.path.join(output_dir, filename)
                if orig_target != out_png:
                    result.save(orig_target, format="PNG")
                    
            print(f"Done in {time.time() - img_t0:.2f}s")
        except Exception as e:
            print(f"FAILED: {e}")
            
    print(f"\nAll {len(files)} headshots processed successfully in {time.time() - t0:.2f}s!")

if __name__ == "__main__":
    main()
