# Crew Battle Map - Equipment & Personnel Tracker

A modular, self-contained web application for visualizing and tracking the locations of equipment, trucks, and crews on a map. Perfect for coordinating transportation and managing field operations.

![Crew Battle Map](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Visual Map Overlay**: Upload your own area map as a static image
- **Drag & Drop**: Easily place and move crews, trucks, and equipment on the map
- **CRUD Operations**: Add, edit, and delete all types of pieces
- **Local Storage**: All data persists automatically in browser storage
- **Export/Import**: Backup and restore your data with JSON export/import
- **Modular Design**: Easy to integrate into larger applications
- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Responsive**: Works on desktop and mobile devices
- **Professional UI**: Clean, modern interface with intuitive controls

## Quick Start

### Standalone Usage

1. Open `index.html` in any modern web browser
2. Upload a map image using the "Upload Map" button
3. Add crews, trucks, and equipment using the sidebar buttons
4. Drag items from the sidebar onto the map
5. Move pieces around by clicking and dragging them
6. Double-click any piece to remove it from the map

### Integration into Your Site

#### Option 1: IFrame Integration (Easiest)

```html
<iframe src="path/to/crew-battle-map/index.html"
        width="100%"
        height="800px"
        frameborder="0">
</iframe>
```

#### Option 2: Direct Integration

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path/to/crew-battle-map.css">
</head>
<body>
    <div id="battlemap-container"></div>
    <script src="path/to/crew-battle-map.js"></script>
    <script>
        // Initialize the battle map
        const battleMap = new CrewBattleMap('#battlemap-container', {
            // Optional configuration
        });
    </script>
</body>
</html>
```

## Usage Guide

### Adding Items

1. Click one of the colored buttons in the sidebar:
   - **+ Crew** (Purple): Add a crew member or team
   - **+ Truck** (Orange): Add a vehicle
   - **+ Equipment** (Teal): Add equipment or machinery

2. Fill in the item details:
   - **Name**: Required - the display name
   - **Details**: Optional - additional information

3. Click "Save" to add the item to your inventory

### Placing Items on the Map

1. **Upload a Map**: Click "Upload Map" and select an image of your area
2. **Drag to Map**: Click and hold an item in the sidebar, then drag it onto the map
3. **Position**: Release to place the item at that location

### Moving Pieces

- Click and drag any piece on the map to reposition it
- Changes are saved automatically

### Editing Items

- Click the pencil (✏️) icon next to any item in the sidebar
- Update the name or details
- Changes apply to all instances on the map

### Deleting Items

- Click the trash (🗑️) icon next to any item in the sidebar
- Confirm deletion
- The item will be removed from inventory and map

### Removing from Map

- Double-click any piece on the map to remove it
- The item remains in your inventory

## Data Management

### Export Data

Click the "📥 Export" button to download a JSON file containing:
- All items (crews, trucks, equipment)
- All piece positions on the map
- The map image (base64 encoded)
- Export timestamp

Use this for:
- Backups
- Sharing with team members
- Archiving historical data

### Import Data

Click the "📤 Import" button to restore data from a JSON file:
- All current data will be replaced
- Confirmation required before import
- Map and pieces are restored to previous state

### Clear All

Click the "🗑️ Clear" button to remove all data:
- Deletes all items and pieces
- Removes map image
- Clears local storage
- **Warning**: This action cannot be undone!

## Keyboard Shortcuts

Currently, the application is mouse/touch-driven. Keyboard shortcuts may be added in future versions.

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Storage Limits

The application uses browser `localStorage`:
- Typical limit: 5-10 MB per domain
- Large map images may consume significant space
- Recommended: Export data regularly as backup

## Technical Details

### Architecture

The application follows modular design principles:
- **Encapsulated**: All code wrapped in IIFE
- **Single Global**: `window.CrewBattleMap` is the only global variable
- **Self-Contained**: No external dependencies
- **Event-Driven**: Uses standard DOM events

### Data Structure

```javascript
{
  "items": {
    "crew": [
      { "id": "...", "name": "Team Alpha", "details": "5 members" }
    ],
    "truck": [
      { "id": "...", "name": "Truck 1", "details": "F-150" }
    ],
    "equipment": [
      { "id": "...", "name": "Excavator", "details": "CAT 320" }
    ]
  },
  "pieces": [
    {
      "id": "...",
      "type": "crew",
      "itemId": "...",
      "x": 450,
      "y": 320
    }
  ],
  "mapImage": "data:image/png;base64,...",
  "exportDate": "2025-11-05T..."
}
```

### Local Storage Keys

- `crewBattleMapData`: Items and piece positions
- `crewBattleMapImage`: Map image (base64)

## Configuration Options

When using the modular JavaScript version, you can pass options:

```javascript
const battleMap = new CrewBattleMap(container, {
    // Future options
    primaryColor: '#3498db',
    enableKeyboard: true,
    autoSave: true
});
```

## Customization

### Changing Colors

Edit the CSS custom properties in the `:root` selector:

```css
:root {
    --cbm-crew: #9b59b6;      /* Purple for crews */
    --cbm-truck: #e67e22;     /* Orange for trucks */
    --cbm-equipment: #16a085; /* Teal for equipment */
    --cbm-primary: #2c3e50;   /* Primary UI color */
    --cbm-secondary: #3498db; /* Secondary UI color */
}
```

### Changing Icons

Edit the `ICONS` object in the JavaScript:

```javascript
const ICONS = {
    crew: '👥',      // Change to any emoji or text
    truck: '🚚',     // Unicode characters work
    equipment: '🔧'  // Or use text like 'C', 'T', 'E'
};
```

## Use Cases

- **Construction Management**: Track crews and equipment across job sites
- **Logistics**: Coordinate truck positions and routes
- **Emergency Response**: Visualize resource deployment
- **Event Planning**: Manage staff and equipment placement
- **Field Operations**: Any scenario requiring spatial coordination

## Roadmap

Potential future enhancements:
- [ ] Keyboard shortcuts for power users
- [ ] Undo/redo functionality
- [ ] Multiple map layers
- [ ] Custom piece types
- [ ] Notes and annotations on map
- [ ] Distance/routing tools
- [ ] Time-based playback
- [ ] CSV import/export
- [ ] Print-friendly views

## Troubleshooting

### Map image not loading
- Check file format (JPG, PNG, GIF supported)
- Try smaller image size if over 5MB
- Clear browser cache and reload

### Data not persisting
- Check browser allows localStorage
- Check available storage space
- Try exporting/importing manually

### Pieces not dragging
- Ensure JavaScript is enabled
- Try different browser
- Check browser console for errors

## Support

For issues, questions, or feature requests, please open an issue in the repository.

## License

MIT License - Free to use, modify, and distribute.

## Credits

Built using the **Modular Block Builder** methodology - a professional approach to creating pluggable web components.

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Author**: Created with Claude Code
