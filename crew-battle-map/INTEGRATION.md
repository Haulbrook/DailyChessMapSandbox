# Integration Guide - Crew Battle Map

This guide shows developers how to integrate the Crew Battle Map into existing websites and applications.

## Files Overview

### Standalone Version
- **`index.html`** - Complete self-contained application with embedded CSS and JavaScript

### Modular Version (in `dist/` folder)
- **`crew-battle-map.css`** - Stylesheet with scoped classes (cbm- prefix)
- **`crew-battle-map.js`** - JavaScript module exposing `window.CrewBattleMap`
- **`index.html`** - HTML structure that links to separate CSS and JS files

## Integration Methods

### Method 1: IFrame Integration (Simplest)

Best for: Quick integration, isolated sandboxing, no code conflicts

```html
<iframe
    src="/path/to/crew-battle-map/index.html"
    width="100%"
    height="800px"
    frameborder="0"
    style="border: 1px solid #ddd; border-radius: 8px;">
</iframe>
```

**Pros:**
- Zero integration effort
- Complete isolation
- No CSS/JS conflicts
- Works immediately

**Cons:**
- Limited customization
- Separate localStorage scope
- Cannot access from parent page easily

---

### Method 2: Direct File Integration (Recommended)

Best for: Full control, customization, parent-child communication

**Step 1:** Copy files to your project

```bash
# Copy the modular files
cp crew-battle-map/dist/* your-project/static/crew-map/
```

**Step 2:** Include in your HTML

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/static/crew-map/crew-battle-map.css">
</head>
<body>
    <!-- Your existing content -->

    <!-- Battle Map Container -->
    <div id="my-battle-map">
        <!-- The HTML structure from dist/index.html goes here -->
        <!-- Or create a container div and mount dynamically -->
    </div>

    <script src="/static/crew-map/crew-battle-map.js"></script>
    <script>
        // Initialize after DOM loads
        document.addEventListener('DOMContentLoaded', function() {
            CrewBattleMap.init();
        });
    </script>
</body>
</html>
```

---

### Method 3: Embedded in Existing Page

Best for: Integration into dashboards, admin panels

**Step 1:** Add CSS to your `<head>`

```html
<link rel="stylesheet" href="/path/to/crew-battle-map.css">
```

**Step 2:** Add HTML structure where you want the map

```html
<div class="cbm-container">
    <!-- Copy the entire HTML structure from dist/index.html -->
    <!-- Everything inside <body> -->
</div>
```

**Step 3:** Add JavaScript before closing `</body>`

```html
<script src="/path/to/crew-battle-map.js"></script>
```

---

### Method 4: Module/Build System Integration

Best for: React, Vue, Angular, Webpack projects

#### React Example

```javascript
import React, { useEffect } from 'react';
import '../crew-battle-map.css';

function CrewMapComponent() {
    useEffect(() => {
        // Load the script dynamically
        const script = document.createElement('script');
        script.src = '/crew-battle-map.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.CrewBattleMap) {
                window.CrewBattleMap.init();
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="crew-map-wrapper">
            {/* Paste HTML structure here */}
            <div className="cbm-container">
                {/* ... */}
            </div>
        </div>
    );
}

export default CrewMapComponent;
```

#### Vue Example

```vue
<template>
    <div class="crew-map-wrapper">
        <div class="cbm-container">
            <!-- Paste HTML structure here -->
        </div>
    </div>
</template>

<script>
import '../crew-battle-map.css';

export default {
    name: 'CrewMapComponent',
    mounted() {
        const script = document.createElement('script');
        script.src = '/crew-battle-map.js';
        script.onload = () => {
            if (window.CrewBattleMap) {
                window.CrewBattleMap.init();
            }
        };
        document.body.appendChild(script);
    }
}
</script>
```

---

## API Reference

The `CrewBattleMap` object is exposed globally and provides these methods:

### Initialization

```javascript
// Initialize with default container
CrewBattleMap.init();

// Or specify a custom container (future feature)
CrewBattleMap.init('#my-container');
```

### Data Management

```javascript
// Get current data
const data = CrewBattleMap.getData();
console.log(data.items);      // { crew: [], truck: [], equipment: [] }
console.log(data.pieces);     // Array of pieces on map
console.log(data.mapImage);   // Base64 image data

// Set data programmatically
CrewBattleMap.setData({
    items: {
        crew: [
            { id: '1', name: 'Alpha Team', details: '5 members' }
        ],
        truck: [],
        equipment: []
    },
    pieces: [],
    mapImage: null
});

// Export data to JSON file
CrewBattleMap.exportData();

// Import data from JSON file (opens file picker)
CrewBattleMap.importData();

// Clear all data
CrewBattleMap.clearAll();
```

### UI Operations

```javascript
// Open add modal for specific type
CrewBattleMap.openAddModal('crew');
CrewBattleMap.openAddModal('truck');
CrewBattleMap.openAddModal('equipment');

// Close modal
CrewBattleMap.closeModal();

// Clear map image
CrewBattleMap.clearMap();

// Re-render everything
CrewBattleMap.render();
```

### Programmatic Item Management

```javascript
// Add item programmatically
// (Note: Direct manipulation of items not exposed in current version)
// Use openAddModal() and let user fill form, or use setData()

// Edit item
CrewBattleMap.editItem('crew', 'item_id_here');

// Delete item
CrewBattleMap.deleteItem('crew', 'item_id_here');
```

---

## Parent-Child Communication

If you need to communicate between your app and the Crew Battle Map:

### From Parent to Map

```javascript
// Load data from your backend
fetch('/api/crew-data')
    .then(res => res.json())
    .then(data => {
        CrewBattleMap.setData(data);
    });

// Save data to your backend
const data = CrewBattleMap.getData();
fetch('/api/crew-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### From Map to Parent (Event Listeners)

Currently, the map doesn't emit custom events, but you can wrap the methods:

```javascript
// Wrap the save function to trigger events
const originalSaveState = CrewBattleMap.saveState;
CrewBattleMap.saveState = function() {
    originalSaveState.call(this);

    // Emit custom event
    window.dispatchEvent(new CustomEvent('crewmap:saved', {
        detail: CrewBattleMap.getData()
    }));
};

// Listen for the event
window.addEventListener('crewmap:saved', (e) => {
    console.log('Map data saved:', e.detail);
    // Sync to your backend
});
```

---

## Customization

### Change Colors

Edit CSS custom properties:

```css
/* In your stylesheet, after crew-battle-map.css */
:root {
    --cbm-crew: #8e44ad;        /* Change crew color */
    --cbm-truck: #d35400;       /* Change truck color */
    --cbm-equipment: #16a085;   /* Change equipment color */
    --cbm-primary: #34495e;     /* Primary UI color */
}
```

### Change Icons

Edit the ICONS object in `crew-battle-map.js`:

```javascript
// Line ~30 in crew-battle-map.js
const ICONS = {
    crew: '👷',      // Change to worker emoji
    truck: '🚛',     // Change to delivery truck
    equipment: '⚙️'  // Change to gear
};
```

### Hide/Remove Features

Use CSS to hide features:

```css
/* Hide export buttons */
.cbm-btn-success,
.cbm-btn-primary,
.cbm-btn-danger {
    display: none;
}

/* Make sidebar narrower */
.cbm-sidebar {
    width: 250px;
}
```

---

## Backend Integration Examples

### Node.js/Express

```javascript
const express = require('express');
const app = express();

// Serve static files
app.use('/crew-map', express.static('crew-battle-map/dist'));

// API endpoint to save data
app.post('/api/crew-map/save', express.json(), (req, res) => {
    const data = req.body;
    // Save to database
    db.collection('crew_maps').updateOne(
        { userId: req.user.id },
        { $set: { data: data, updatedAt: new Date() } },
        { upsert: true }
    );
    res.json({ success: true });
});

// API endpoint to load data
app.get('/api/crew-map/load', async (req, res) => {
    const doc = await db.collection('crew_maps').findOne({
        userId: req.user.id
    });
    res.json(doc ? doc.data : null);
});
```

### PHP/Laravel

```php
// routes/web.php
Route::post('/api/crew-map/save', function (Request $request) {
    $user = auth()->user();

    CrewMap::updateOrCreate(
        ['user_id' => $user->id],
        ['data' => $request->json()->all()]
    );

    return response()->json(['success' => true]);
});

Route::get('/api/crew-map/load', function () {
    $user = auth()->user();
    $map = CrewMap::where('user_id', $user->id)->first();

    return response()->json($map ? $map->data : null);
});
```

### Python/Django

```python
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def save_crew_map(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        CrewMap.objects.update_or_create(
            user=request.user,
            defaults={'data': data}
        )
        return JsonResponse({'success': True})

def load_crew_map(request):
    try:
        crew_map = CrewMap.objects.get(user=request.user)
        return JsonResponse(crew_map.data)
    except CrewMap.DoesNotExist:
        return JsonResponse(None, safe=False)
```

---

## Storage Considerations

### Local Storage (Default)

The map uses `localStorage` by default:
- Key: `crewBattleMapData` (items and pieces)
- Key: `crewBattleMapImage` (map image)
- Limit: ~5-10 MB per domain
- Scope: Per browser, per domain

### Custom Storage Backend

To use your own storage:

```javascript
// Override save/load methods
const originalSaveState = CrewBattleMap.saveState;
const originalLoadState = CrewBattleMap.loadState;

CrewBattleMap.saveState = function() {
    const data = this.getData();

    // Send to your backend instead of localStorage
    fetch('/api/crew-map/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};

CrewBattleMap.loadState = async function() {
    // Load from your backend
    const response = await fetch('/api/crew-map/load');
    const data = await response.json();

    if (data) {
        this.setData(data);
    }
};
```

---

## Troubleshooting

### Map not appearing

Check:
1. Is `crew-battle-map.css` loaded? (View page source)
2. Is `crew-battle-map.js` loaded? (Check browser console)
3. Are there JavaScript errors? (Open DevTools console)
4. Is the container element present? (Inspect HTML)

### Data not persisting

Check:
1. Is localStorage enabled in browser?
2. Is there enough storage space?
3. Are you in private/incognito mode? (localStorage may not persist)
4. Check browser console for storage errors

### CSS conflicts

The map uses `cbm-` prefix for all classes. If you have conflicts:
1. Increase specificity: `.my-container .cbm-btn { }`
2. Use `!important` sparingly
3. Load crew-battle-map.css last

### JavaScript conflicts

The map exposes only `window.CrewBattleMap`. If you have conflicts:
1. Rename the global: `window.MyCrewMap = window.CrewBattleMap;`
2. Use module bundler to encapsulate

---

## Security Considerations

### XSS Protection

The map uses `escapeHtml()` to prevent XSS in user inputs. When integrating:

- All user input is escaped before rendering
- Do not disable this protection
- If you modify the code, maintain HTML escaping

### Content Security Policy

If using CSP, allow:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               style-src 'self' 'unsafe-inline';
               script-src 'self';
               img-src 'self' data:;">
```

Note: `'unsafe-inline'` needed for inline styles, `data:` needed for uploaded images

---

## Performance Tips

1. **Large Maps**: Use compressed images (JPEG with 80% quality)
2. **Many Pieces**: Consider pagination or filtering (custom modification needed)
3. **Slow Browsers**: Reduce animation transitions in CSS
4. **Mobile**: Test on real devices, not just emulators

---

## Support & Resources

- **Documentation**: See `README.md` for user guide
- **Examples**: Check `examples/` folder (if available)
- **Issues**: Report bugs via your project's issue tracker

---

## License

MIT License - Free to use, modify, and distribute.

**Version**: 1.0.0
**Last Updated**: November 2025
