#!/usr/bin/env python3
# This script converts SVG to various favicon formats

import os
import sys
try:
    import cairosvg
except ImportError:
    print("Installing required package cairosvg...")
    os.system("pip3 install cairosvg pillow")
    try:
        import cairosvg
        from PIL import Image
    except ImportError:
        print("Error: Failed to install cairosvg. Please install it manually with:")
        print("pip3 install cairosvg pillow")
        sys.exit(1)

from PIL import Image

# Ensure output directory exists
favicon_dir = "images/favicon"
os.makedirs(favicon_dir, exist_ok=True)

# SVG source file
svg_file = os.path.join(favicon_dir, "favicon.svg")

# Convert SVG to different size PNGs
sizes = [16, 32, 96, 192]
png_files = []

print(f"Converting SVG file: {svg_file}")

for size in sizes:
    output_file = os.path.join(favicon_dir, f"favicon-{size}x{size}.png")
    print(f"Creating {size}x{size} PNG: {output_file}")
    
    # Convert SVG to PNG using cairosvg
    cairosvg.svg2png(url=svg_file, write_to=output_file, output_width=size, output_height=size)
    png_files.append(output_file)
    
    # Create specific files for standard favicon sizes
    if size == 16:
        os.replace(output_file, os.path.join(favicon_dir, "favicon-16x16.png"))
    elif size == 32:
        os.replace(output_file, os.path.join(favicon_dir, "favicon-32x32.png"))
    elif size == 192:
        os.replace(output_file, os.path.join(favicon_dir, "favicon-192x192.png"))

# Create multi-size ICO file for favicon.ico
ico_file = os.path.join(favicon_dir, "favicon.ico")
print(f"Creating ICO file: {ico_file}")

# Open the 32x32 PNG first as base
with Image.open(os.path.join(favicon_dir, "favicon-32x32.png")) as img:
    # PIL requires ICO to have at least 16x16 and 32x32
    icon_sizes = [(16, 16), (32, 32)]
    imgs = []
    
    # Add 16x16 image
    with Image.open(os.path.join(favicon_dir, "favicon-16x16.png")) as small_img:
        imgs.append(small_img.copy())
    
    # Add 32x32 image
    imgs.append(img.copy())
    
    # Save as ICO
    img.save(ico_file, format='ICO', sizes=icon_sizes, append_images=imgs[:-1])

# Create a copy at the root level for broader compatibility
root_ico = "favicon.ico"
print(f"Creating root favicon.ico: {root_ico}")
os.system(f"cp {ico_file} {root_ico}")

print("Favicon files created successfully!")
print("\nAdd these to your HTML:")
print('<link rel="icon" type="image/svg+xml" href="images/favicon/favicon.svg">')
print('<link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">')
print('<link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">')
print('<link rel="shortcut icon" href="images/favicon/favicon.ico">')
print('<link rel="apple-touch-icon" href="images/favicon/favicon-192x192.png">')
print('<link rel="manifest" href="images/favicon/manifest.json">') 