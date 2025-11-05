/**
 * Crew Battle Map - Modular JavaScript
 * Version: 1.0.0
 *
 * A self-contained, modular application for tracking crews, trucks,
 * and equipment on a visual map overlay.
 *
 * Usage:
 *   <script src="crew-battle-map.js"></script>
 *   <script>
 *     CrewBattleMap.init();
 *   </script>
 *
 * Or with custom container:
 *   const map = CrewBattleMap.init('#custom-container');
 */

(function(window) {
    'use strict';

    // Private state
    let items = {
        crew: [],
        truck: [],
        equipment: []
    };

    let pieces = []; // Pieces on the map
    let mapImage = null;
    let editingItemId = null;
    let draggedPiece = null;
    let dragOffset = { x: 0, y: 0 };

    const STORAGE_KEY = 'crewBattleMapData';
    const MAP_IMAGE_KEY = 'crewBattleMapImage';

    // Icons for different types
    const ICONS = {
        crew: '👥',
        truck: '🚚',
        equipment: '🔧'
    };

    /**
     * Main CrewBattleMap module
     * @namespace
     */
    const CrewBattleMap = {
        /**
         * Initialize the application
         * @param {string|Element} container - Optional container selector or element
         */
        init: function(container) {
            this.loadState();
            this.render();
            this.attachEvents();
            console.log('Crew Battle Map initialized successfully');
        },

        /**
         * Load state from localStorage
         */
        loadState: function() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const data = JSON.parse(saved);
                    items = data.items || items;
                    pieces = data.pieces || [];
                }

                const savedMap = localStorage.getItem(MAP_IMAGE_KEY);
                if (savedMap) {
                    mapImage = savedMap;
                }
            } catch (e) {
                console.error('Error loading state:', e);
            }
        },

        /**
         * Save state to localStorage
         */
        saveState: function() {
            try {
                const data = {
                    items: items,
                    pieces: pieces
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

                if (mapImage) {
                    localStorage.setItem(MAP_IMAGE_KEY, mapImage);
                }
            } catch (e) {
                console.error('Error saving state:', e);
                alert('Error saving data. Your browser storage may be full.');
            }
        },

        /**
         * Render all UI components
         */
        render: function() {
            this.renderItemsList();
            this.renderMap();
            this.updateStats();
        },

        /**
         * Render the items list in the sidebar
         */
        renderItemsList: function() {
            ['crew', 'truck', 'equipment'].forEach(type => {
                const container = document.getElementById(type + 'List');
                const countEl = document.getElementById(type + 'Count');

                if (!container || !countEl) return;

                container.innerHTML = items[type].map(item => `
                    <div class="cbm-item ${type}" draggable="true" data-id="${item.id}" data-type="${type}">
                        <div class="cbm-item-info">
                            <div class="cbm-item-name">${ICONS[type]} ${this.escapeHtml(item.name)}</div>
                            ${item.details ? `<div class="cbm-item-details">${this.escapeHtml(item.details)}</div>` : ''}
                        </div>
                        <div class="cbm-item-actions">
                            <button class="cbm-icon-btn" onclick="CrewBattleMap.editItem('${type}', '${item.id}')" title="Edit">
                                ✏️
                            </button>
                            <button class="cbm-icon-btn delete" onclick="CrewBattleMap.deleteItem('${type}', '${item.id}')" title="Delete">
                                🗑️
                            </button>
                        </div>
                    </div>
                `).join('');

                countEl.textContent = items[type].length;
            });
        },

        /**
         * Render the map and all pieces
         */
        renderMap: function() {
            const canvas = document.getElementById('mapCanvas');
            const placeholder = document.getElementById('mapPlaceholder');

            if (!canvas) return;

            // Render map image
            let mapImg = canvas.querySelector('.cbm-map-image');
            if (mapImage) {
                if (!mapImg) {
                    mapImg = document.createElement('img');
                    mapImg.className = 'cbm-map-image';
                    canvas.appendChild(mapImg);
                }
                mapImg.src = mapImage;
                if (placeholder) placeholder.style.display = 'none';

                // Adjust canvas size to image
                mapImg.onload = function() {
                    canvas.style.width = mapImg.naturalWidth + 'px';
                    canvas.style.height = mapImg.naturalHeight + 'px';
                };
            } else {
                if (mapImg) {
                    mapImg.remove();
                }
                if (placeholder) placeholder.style.display = 'block';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
            }

            // Remove old pieces
            canvas.querySelectorAll('.cbm-piece').forEach(el => el.remove());

            // Render pieces
            pieces.forEach(piece => {
                const item = items[piece.type].find(i => i.id === piece.itemId);
                if (!item) return;

                const pieceEl = document.createElement('div');
                pieceEl.className = `cbm-piece ${piece.type}`;
                pieceEl.style.left = piece.x + 'px';
                pieceEl.style.top = piece.y + 'px';
                pieceEl.innerHTML = `
                    <span class="cbm-piece-icon">${ICONS[piece.type]}</span>
                    <span>${this.escapeHtml(item.name)}</span>
                `;
                pieceEl.dataset.pieceId = piece.id;

                canvas.appendChild(pieceEl);
            });
        },

        /**
         * Attach all event listeners
         */
        attachEvents: function() {
            const canvas = document.getElementById('mapCanvas');
            if (!canvas) return;

            // Drag from sidebar
            document.addEventListener('dragstart', (e) => {
                if (e.target.classList.contains('cbm-item')) {
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('itemId', e.target.dataset.id);
                    e.dataTransfer.setData('itemType', e.target.dataset.type);
                }
            });

            // Drop on map
            canvas.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            });

            canvas.addEventListener('drop', (e) => {
                e.preventDefault();
                const itemId = e.dataTransfer.getData('itemId');
                const itemType = e.dataTransfer.getData('itemType');

                if (itemId && itemType) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left + canvas.parentElement.scrollLeft;
                    const y = e.clientY - rect.top + canvas.parentElement.scrollTop;

                    this.addPieceToMap(itemType, itemId, x, y);
                }
            });

            // Drag pieces on map
            canvas.addEventListener('mousedown', (e) => {
                if (e.target.closest('.cbm-piece')) {
                    draggedPiece = e.target.closest('.cbm-piece');
                    const rect = draggedPiece.getBoundingClientRect();
                    dragOffset.x = e.clientX - rect.left;
                    dragOffset.y = e.clientY - rect.top;
                    draggedPiece.classList.add('dragging');
                    e.preventDefault();
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (draggedPiece) {
                    const canvasRect = canvas.getBoundingClientRect();
                    const x = e.clientX - canvasRect.left - dragOffset.x + canvas.parentElement.scrollLeft;
                    const y = e.clientY - canvasRect.top - dragOffset.y + canvas.parentElement.scrollTop;

                    draggedPiece.style.left = x + 'px';
                    draggedPiece.style.top = y + 'px';
                }
            });

            document.addEventListener('mouseup', () => {
                if (draggedPiece) {
                    draggedPiece.classList.remove('dragging');
                    const pieceId = draggedPiece.dataset.pieceId;
                    const piece = pieces.find(p => p.id === pieceId);
                    if (piece) {
                        piece.x = parseInt(draggedPiece.style.left);
                        piece.y = parseInt(draggedPiece.style.top);
                        this.saveState();
                    }
                    draggedPiece = null;
                }
            });

            // Double-click to remove piece
            canvas.addEventListener('dblclick', (e) => {
                if (e.target.closest('.cbm-piece')) {
                    const pieceEl = e.target.closest('.cbm-piece');
                    const pieceId = pieceEl.dataset.pieceId;
                    if (confirm('Remove this piece from the map?')) {
                        pieces = pieces.filter(p => p.id !== pieceId);
                        this.saveState();
                        this.render();
                    }
                }
            });
        },

        /**
         * Add a piece to the map
         * @param {string} type - Type of piece (crew, truck, equipment)
         * @param {string} itemId - ID of the item
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         */
        addPieceToMap: function(type, itemId, x, y) {
            const piece = {
                id: 'piece_' + Date.now() + '_' + Math.random(),
                type: type,
                itemId: itemId,
                x: Math.round(x),
                y: Math.round(y)
            };
            pieces.push(piece);
            this.saveState();
            this.render();
        },

        /**
         * Open modal to add a new item
         * @param {string} type - Type of item (crew, truck, equipment)
         */
        openAddModal: function(type) {
            editingItemId = null;
            const modal = document.getElementById('itemModal');
            const title = document.getElementById('modalTitle');
            const typeInput = document.getElementById('itemType');
            const idInput = document.getElementById('itemId');
            const nameInput = document.getElementById('itemName');
            const detailsInput = document.getElementById('itemDetails');

            if (!modal || !title || !typeInput || !nameInput) return;

            title.textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            typeInput.value = type;
            idInput.value = '';
            nameInput.value = '';
            detailsInput.value = '';
            modal.classList.add('active');
            nameInput.focus();
        },

        /**
         * Edit an existing item
         * @param {string} type - Type of item
         * @param {string} id - ID of the item
         */
        editItem: function(type, id) {
            const item = items[type].find(i => i.id === id);
            if (!item) return;

            editingItemId = id;
            const modal = document.getElementById('itemModal');
            const title = document.getElementById('modalTitle');
            const typeInput = document.getElementById('itemType');
            const idInput = document.getElementById('itemId');
            const nameInput = document.getElementById('itemName');
            const detailsInput = document.getElementById('itemDetails');

            if (!modal || !title || !typeInput || !nameInput) return;

            title.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            typeInput.value = type;
            idInput.value = id;
            nameInput.value = item.name;
            detailsInput.value = item.details || '';
            modal.classList.add('active');
            nameInput.focus();
        },

        /**
         * Delete an item
         * @param {string} type - Type of item
         * @param {string} id - ID of the item
         */
        deleteItem: function(type, id) {
            if (!confirm('Delete this item? It will also be removed from the map.')) return;

            items[type] = items[type].filter(i => i.id !== id);
            pieces = pieces.filter(p => !(p.type === type && p.itemId === id));
            this.saveState();
            this.render();
        },

        /**
         * Close the modal
         */
        closeModal: function() {
            const modal = document.getElementById('itemModal');
            const form = document.getElementById('itemForm');

            if (modal) modal.classList.remove('active');
            if (form) form.reset();
        },

        /**
         * Handle form submission
         * @param {Event} e - Submit event
         */
        handleFormSubmit: function(e) {
            e.preventDefault();

            const type = document.getElementById('itemType').value;
            const id = document.getElementById('itemId').value || 'item_' + Date.now() + '_' + Math.random();
            const name = document.getElementById('itemName').value.trim();
            const details = document.getElementById('itemDetails').value.trim();

            if (!name) {
                alert('Name is required');
                return;
            }

            if (editingItemId) {
                // Update existing
                const item = items[type].find(i => i.id === id);
                if (item) {
                    item.name = name;
                    item.details = details;
                }
            } else {
                // Add new
                items[type].push({
                    id: id,
                    name: name,
                    details: details
                });
            }

            this.saveState();
            this.render();
            this.closeModal();
        },

        /**
         * Handle map image upload
         * @param {Event} e - File input change event
         */
        handleMapUpload: function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                mapImage = event.target.result;
                this.saveState();
                this.render();
            };
            reader.readAsDataURL(file);
        },

        /**
         * Clear the map image
         */
        clearMap: function() {
            if (!confirm('Clear the map image? Pieces will remain.')) return;
            mapImage = null;
            localStorage.removeItem(MAP_IMAGE_KEY);
            this.render();
        },

        /**
         * Export all data to JSON file
         */
        exportData: function() {
            const data = {
                items: items,
                pieces: pieces,
                mapImage: mapImage,
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `crew-battle-map-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },

        /**
         * Import data from JSON file
         */
        importData: function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);

                        if (confirm('This will replace all current data. Continue?')) {
                            items = data.items || items;
                            pieces = data.pieces || [];
                            mapImage = data.mapImage || null;
                            this.saveState();
                            this.render();
                            alert('Data imported successfully!');
                        }
                    } catch (e) {
                        alert('Error importing data: ' + e.message);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        },

        /**
         * Clear all data
         */
        clearAll: function() {
            if (!confirm('Clear ALL data including items and map? This cannot be undone!')) return;

            items = { crew: [], truck: [], equipment: [] };
            pieces = [];
            mapImage = null;
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(MAP_IMAGE_KEY);
            this.render();
        },

        /**
         * Update statistics display
         */
        updateStats: function() {
            const counts = { crew: 0, truck: 0, equipment: 0 };
            pieces.forEach(p => counts[p.type]++);

            const crewCount = document.getElementById('crewMapCount');
            const truckCount = document.getElementById('truckMapCount');
            const equipmentCount = document.getElementById('equipmentMapCount');

            if (crewCount) crewCount.textContent = counts.crew;
            if (truckCount) truckCount.textContent = counts.truck;
            if (equipmentCount) equipmentCount.textContent = counts.equipment;
        },

        /**
         * Escape HTML to prevent XSS
         * @param {string} text - Text to escape
         * @returns {string} Escaped HTML
         */
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        /**
         * Get current data (for external integrations)
         * @returns {Object} Current application data
         */
        getData: function() {
            return {
                items: JSON.parse(JSON.stringify(items)),
                pieces: JSON.parse(JSON.stringify(pieces)),
                mapImage: mapImage
            };
        },

        /**
         * Set data (for external integrations)
         * @param {Object} data - Data to load
         */
        setData: function(data) {
            if (data.items) items = data.items;
            if (data.pieces) pieces = data.pieces;
            if (data.mapImage) mapImage = data.mapImage;
            this.saveState();
            this.render();
        }
    };

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CrewBattleMap.init());
    } else {
        CrewBattleMap.init();
    }

    // Expose to global scope
    window.CrewBattleMap = CrewBattleMap;

})(window);
