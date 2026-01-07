const fs = require('fs');
const path = require('path');

// Read both JSON files
const originalPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.json');
const structuredPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.structured.json');

const original = JSON.parse(fs.readFileSync(originalPath, 'utf8'));
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// Find the "Understanding M2M SIM Cards" item
const understandingItem = original.sections
  .flatMap(s => s.items || [])
  .find(item => item.id === 'UnderstandingM2MSIMCards');

if (!understandingItem) {
  console.log('Understanding M2M SIM Cards item not found');
  process.exit(1);
}

// Get the section_item_id for UnderstandingM2MSIMCards (should be 12)
const understandingSectionItemId = structured.section_items.find(
  item => item.slug === 'UnderstandingM2MSIMCards'
)?.id;

if (!understandingSectionItemId) {
  console.log('Understanding M2M SIM Cards section_item not found');
  process.exit(1);
}

// Create a map of item_sections by heading
const itemSectionsMap = new Map();
structured.item_sections
  .filter(is => is.section_item_id === understandingSectionItemId)
  .forEach(is => {
    itemSectionsMap.set(is.heading, is.id);
  });

// Get existing categories
const existingCategories = structured.categories || [];
let maxCategoryId = Math.max(...existingCategories.map(c => c.id), 0);

// Extract categories from original JSON
const newCategories = [];

understandingItem.section?.forEach(section => {
  const itemSectionId = itemSectionsMap.get(section.heading);
  if (!itemSectionId) {
    console.log(`Item section not found for heading: ${section.heading}`);
    return;
  }

  section.categories?.forEach((cat, idx) => {
    // Check if category already exists
    const exists = existingCategories.some(
      ec => ec.item_section_id === itemSectionId && ec.slug === cat.id
    );

    if (!exists) {
      maxCategoryId++;
      newCategories.push({
        id: maxCategoryId,
        item_section_id: itemSectionId,
        slug: cat.id,
        label: cat.label,
        image: cat.image || null,
        description: cat.description || '',
        has_learn_more: cat.learnmore || false,
        sort_order: idx + 1
      });
    }
  });
});

// Add new categories to structured JSON
if (newCategories.length > 0) {
  structured.categories = [...existingCategories, ...newCategories];
  
  // Write back to file
  fs.writeFileSync(structuredPath, JSON.stringify(structured, null, 2));
  
  console.log(`✅ Successfully added ${newCategories.length} categories for Understanding M2M SIM Cards`);
  console.log(`   Total categories: ${structured.categories.length}`);
} else {
  console.log('All categories already exist');
}

