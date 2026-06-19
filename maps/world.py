import re
import pycountry

# Load your SVG data
with open("world.svg", "r", encoding="utf-8") as f:
    svg_data = f.read()

# Find all 2-letter country codes used in id="..." or class="..."
# This regex looks for standard lowercase alpha-2 codes
codes = set(re.findall(r'id="([a-z]{2})"', svg_data))

for code in codes:
    try:
        # Look up the full country name
        country = pycountry.countries.get(alpha_2=code.upper())
        if country:
            # Format name: replace spaces, hyphens, and commas with underscores
            full_name = re.sub(r'[\s\-,]+', '_', country.name)
            
            # Clean up trailing punctuation if any (e.g., "Iran,_Islamic_Republic_of")
            full_name = full_name.strip('_')
            
            # Replace id and class attributes in the SVG text
            svg_data = svg_data.replace(f'id="{code}"', f'id="{full_name}"')
            svg_data = svg_data.replace(f'class="land {code}"', f'class="land {full_name}"')
            svg_data = svg_data.replace(f'class="circle {code}"', f'class="circle {full_name}"')
            # Also updates the CSS stylesheet block
            svg_data = svg_data.replace(f'.{code}', f'.{full_name}')
    except Exception:
        continue

# Save the updated SVG map
with open("Labeled_World_Map.svg", "w", encoding="utf-8") as f:
    f.write(svg_data)