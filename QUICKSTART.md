# Quick Start Guide - Crew Battle Map

Get started with the Crew Battle Map in under 2 minutes!

## What You'll Find Here

1. **Modular Block Builder Skill** - A professional developer skill for building pluggable components
2. **Crew Battle Map** - A complete application for tracking crews, trucks, and equipment on maps

## Getting Started

### Option 1: Try It Now (Standalone)

1. Navigate to the application:
   ```bash
   cd crew-battle-map
   ```

2. Open in your browser:
   ```bash
   # Open directly
   open index.html
   # Or if using a local server
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. Upload the sample map:
   - Click "🗺️ Upload Map"
   - Select `sample-assets/sample-map.svg`

4. Add some items:
   - Click "+ Crew" to add a crew
   - Click "+ Truck" to add a truck
   - Click "+ Equipment" to add equipment

5. Place them on the map:
   - Drag items from the sidebar onto the map
   - Move pieces around by dragging them
   - Double-click to remove from map

### Option 2: Integrate Into Your Site

See `crew-battle-map/INTEGRATION.md` for detailed integration instructions.

Quick integration:
```html
<iframe src="/crew-battle-map/index.html" width="100%" height="800px"></iframe>
```

### Option 3: Use Modular Files

For full control, use the separated files in `crew-battle-map/dist/`:
- `crew-battle-map.css` - Styles
- `crew-battle-map.js` - Logic
- `index.html` - Structure

```html
<link rel="stylesheet" href="dist/crew-battle-map.css">
<script src="dist/crew-battle-map.js"></script>
```

## What Can You Do?

### Add Items
- **Crews**: Add teams with member counts and specialties
- **Trucks**: Track vehicles with capacity and type
- **Equipment**: Log machinery with specifications

### Manage Map
- **Upload Map**: Use any image (PNG, JPG, SVG)
- **Place Pieces**: Drag items onto the map
- **Move Pieces**: Reposition by dragging
- **Remove Pieces**: Double-click to remove

### Data Management
- **Auto-Save**: Everything saves to browser storage automatically
- **Export**: Download JSON backup of all data
- **Import**: Restore from JSON file
- **Clear**: Remove all data (with confirmation)

## Using the Modular Block Builder Skill

The skill is located at `.claude/skills/modular-block-builder.md`

To use it with Claude Code:
```bash
# The skill is automatically available
# It focuses on building modular, pluggable components
```

This skill was used to build the Crew Battle Map following these principles:
- ✅ Encapsulated code (no global pollution)
- ✅ Zero dependencies
- ✅ Self-contained styles
- ✅ Local storage persistence
- ✅ Clean API
- ✅ Professional UI

## File Structure

```
DailyChessMap/
├── .claude/
│   └── skills/
│       └── modular-block-builder.md    # Professional skill definition
├── crew-battle-map/
│   ├── index.html                      # Standalone version
│   ├── README.md                       # User documentation
│   ├── INTEGRATION.md                  # Developer guide
│   ├── dist/                           # Modular files
│   │   ├── crew-battle-map.css        # Separated styles
│   │   ├── crew-battle-map.js         # Separated logic
│   │   └── index.html                 # Uses external files
│   └── sample-assets/                  # Sample resources
│       ├── sample-map.svg              # Example map
│       └── README.md                   # Asset guide
└── QUICKSTART.md                       # This file
```

## Next Steps

1. **Read the Documentation**
   - `crew-battle-map/README.md` - Full user guide
   - `crew-battle-map/INTEGRATION.md` - Integration guide
   - `crew-battle-map/sample-assets/README.md` - Asset guide

2. **Customize**
   - Change colors by editing CSS variables
   - Modify icons in the JavaScript
   - Add custom features

3. **Integrate**
   - Add to your website
   - Connect to backend API
   - Sync with database

## Common Use Cases

### Construction Management
Track crews and equipment across multiple job sites

### Logistics
Coordinate truck positions and delivery routes

### Emergency Response
Visualize resource deployment in real-time

### Event Planning
Manage staff and equipment placement

### Field Operations
Any scenario requiring spatial coordination

## Tips

- **Use PNG for photos**, SVG for diagrams
- **Keep images under 5MB** for best performance
- **Export regularly** to backup your data
- **Use Chrome/Firefox** for best compatibility
- **Test on mobile** if needed for field use

## Support

- **User Guide**: See `crew-battle-map/README.md`
- **Integration Help**: See `crew-battle-map/INTEGRATION.md`
- **Skill Documentation**: See `.claude/skills/modular-block-builder.md`

## License

MIT License - Free to use, modify, and distribute.

---

**Built with:** Vanilla JavaScript, HTML5, CSS3
**Version:** 1.0.0
**Created:** November 2025
