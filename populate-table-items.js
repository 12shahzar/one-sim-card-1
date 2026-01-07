const fs = require('fs');
const path = require('path');

// Read both JSON files
const originalPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.json');
const structuredPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.structured.json');

const original = JSON.parse(fs.readFileSync(originalPath, 'utf8'));
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// Create a map of table headings to table IDs
const tableMap = new Map();
structured.tables.forEach(table => {
  tableMap.set(table.heading, table.id);
});

// Extract all table items from original JSON
const tableItems = [];
let itemId = 1;

// Process each section in original JSON
original.sections.forEach(section => {
  section.items?.forEach(item => {
    item.tables?.forEach(table => {
      const tableId = tableMap.get(table.heading);
      
      if (tableId && table.items && Array.isArray(table.items)) {
        // Add all items from this table
        table.items.forEach((name, idx) => {
          // Check if this item already exists (avoid duplicates)
          const exists = tableItems.some(
            ti => ti.table_id === tableId && ti.name === name
          );
          
          if (!exists) {
            tableItems.push({
              id: itemId++,
              table_id: tableId,
              name: name,
              sort_order: tableItems.filter(ti => ti.table_id === tableId).length + 1
            });
          }
        });
      }
    });
  });
});

// Sort table items by table_id and sort_order
tableItems.sort((a, b) => {
  if (a.table_id !== b.table_id) {
    return a.table_id - b.table_id;
  }
  return a.sort_order - b.sort_order;
});

// Update the structured JSON
structured.table_items = tableItems;

// Write back to file
fs.writeFileSync(structuredPath, JSON.stringify(structured, null, 2));

console.log(`✅ Successfully populated ${tableItems.length} table items`);
console.log(`   Tables updated:`, Array.from(new Set(tableItems.map(ti => ti.table_id))).length);

