# Sample Assets

This folder contains sample resources you can use to test the Crew Battle Map.

## Sample Map

**`sample-map.svg`** - A vector-based sample work area map showing:
- Four zones (North, South, East, West)
- Main roads and highways
- Headquarters location
- Two warehouses
- Parking areas
- Compass and scale
- Legend

### How to Use

1. Open the Crew Battle Map application (`index.html`)
2. Click "🗺️ Upload Map"
3. Select `sample-map.svg` from this folder
4. Start adding crews, trucks, and equipment to different zones

### Converting to Other Formats

If you need PNG or JPG:

**Using a browser:**
1. Open `sample-map.svg` in Chrome/Firefox
2. Right-click and "Save As..."
3. Choose PNG format

**Using ImageMagick (command line):**
```bash
convert sample-map.svg -resize 1200x900 sample-map.png
```

**Using Inkscape:**
```bash
inkscape sample-map.svg --export-filename=sample-map.png --export-width=1200
```

## Creating Your Own Map

### From Scratch

Use any image editor:
- Recommended size: 1200x900 to 2000x1500 pixels
- Format: PNG, JPG, or SVG
- Keep file size under 2MB for best performance

### From Google Maps

1. Go to Google Maps
2. Navigate to your area
3. Screenshot the area
4. Crop and save as PNG/JPG

### From Printed Maps

1. Scan or photograph the map
2. Crop to area of interest
3. Adjust brightness/contrast for clarity
4. Save as PNG or JPG

## Tips for Good Maps

- **Clarity**: Ensure text and roads are visible
- **Size**: Larger is better, but keep under 5MB
- **Format**: PNG for diagrams, JPG for photos
- **Contrast**: Good contrast helps pieces stand out
- **Labels**: Include zone names and landmarks

## Sample Data

You can also use this sample data for testing. Create a file `sample-data.json`:

```json
{
  "items": {
    "crew": [
      {
        "id": "crew_1",
        "name": "Team Alpha",
        "details": "5 members - Electrical work"
      },
      {
        "id": "crew_2",
        "name": "Team Bravo",
        "details": "4 members - Plumbing"
      },
      {
        "id": "crew_3",
        "name": "Team Charlie",
        "details": "6 members - General construction"
      }
    ],
    "truck": [
      {
        "id": "truck_1",
        "name": "Truck 101",
        "details": "F-150 - Tools & equipment"
      },
      {
        "id": "truck_2",
        "name": "Truck 202",
        "details": "Transit Van - Materials"
      },
      {
        "id": "truck_3",
        "name": "Truck 303",
        "details": "Flatbed - Heavy equipment"
      }
    ],
    "equipment": [
      {
        "id": "equip_1",
        "name": "Excavator A",
        "details": "CAT 320 - Digging"
      },
      {
        "id": "equip_2",
        "name": "Generator B",
        "details": "50kW Diesel"
      },
      {
        "id": "equip_3",
        "name": "Crane C",
        "details": "Mobile - 40ft reach"
      }
    ]
  },
  "pieces": [
    {
      "id": "piece_1",
      "type": "crew",
      "itemId": "crew_1",
      "x": 300,
      "y": 180
    },
    {
      "id": "piece_2",
      "type": "truck",
      "itemId": "truck_1",
      "x": 200,
      "y": 560
    },
    {
      "id": "piece_3",
      "type": "equipment",
      "itemId": "equip_1",
      "x": 900,
      "y": 180
    }
  ],
  "exportDate": "2025-11-05T00:00:00.000Z"
}
```

To import this data:
1. Copy the JSON above
2. Save as `sample-data.json`
3. In the app, click "📤 Import"
4. Select the JSON file
