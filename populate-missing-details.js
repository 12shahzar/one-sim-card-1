const fs = require('fs');
const path = require('path');

// Read both JSON files
const originalPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.json');
const structuredPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.structured.json');

const original = JSON.parse(fs.readFileSync(originalPath, 'utf8'));
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// Create a map of section_item_id to slug for matching
const itemMap = new Map();
structured.section_items.forEach(item => {
  itemMap.set(item.slug, item.id);
});

// Create a map of item_detail_id to section_item_id
const detailMap = new Map();
structured.item_details.forEach(detail => {
  detailMap.set(detail.section_item_id, detail.id);
});

// Extract missing detail descriptions from original JSON
const newDescriptions = [];
let descId = structured.detail_descriptions.length + 1;

// Process each section in original JSON
original.sections.forEach(section => {
  section.items?.forEach(item => {
    const sectionItemId = itemMap.get(item.id);
    if (!sectionItemId) return;

    item.details?.forEach((detail, detailIdx) => {
      const detailId = detailMap.get(sectionItemId);
      if (!detailId) return;

      // Check if descriptions already exist for this detail
      const existingDescriptions = structured.detail_descriptions.filter(
        d => d.item_detail_id === detailId
      );

      // Add main descriptions
      if (detail.description && Array.isArray(detail.description)) {
        detail.description.forEach((desc, idx) => {
          // Check if this description already exists
          const exists = existingDescriptions.some(
            ed => ed.description_type === 'main' && ed.content === desc && ed.sort_order === idx + 1
          );
          
          if (!exists && desc.trim() !== '') {
            newDescriptions.push({
              id: descId++,
              item_detail_id: detailId,
              content: desc,
              description_type: 'main',
              sort_order: idx + 1
            });
          }
        });
      }

      // Add bottom descriptions
      if (detail.bottomDescription && Array.isArray(detail.bottomDescription)) {
        detail.bottomDescription.forEach((desc, idx) => {
          // Check if this description already exists
          const exists = existingDescriptions.some(
            ed => ed.description_type === 'bottom' && ed.content === desc && ed.sort_order === idx + 1
          );
          
          if (!exists && desc.trim() !== '') {
            newDescriptions.push({
              id: descId++,
              item_detail_id: detailId,
              content: desc,
              description_type: 'bottom',
              sort_order: idx + 1
            });
          }
        });
      }
    });
  });
});

// Add new descriptions to structured JSON
structured.detail_descriptions = [...structured.detail_descriptions, ...newDescriptions];

// Update feature_contents if needed
const featureContentsMap = new Map();
structured.feature_contents.forEach(fc => {
  featureContentsMap.set(fc.item_detail_id, fc);
});

let featureId = structured.feature_contents.length + 1;

original.sections.forEach(section => {
  section.items?.forEach(item => {
    const sectionItemId = itemMap.get(item.id);
    if (!sectionItemId) return;

    item.details?.forEach(detail => {
      const detailId = detailMap.get(sectionItemId);
      if (!detailId || !detail.featureContent || detail.featureContent === false) return;

      // Check if feature content already exists
      if (!featureContentsMap.has(detailId) && detail.featureContent) {
        const featureContent = detail.featureContent;
        structured.feature_contents.push({
          id: featureId++,
          item_detail_id: detailId,
          content: featureContent.content || '',
          image: featureContent.image || null
        });
        featureContentsMap.set(detailId, true);
      }
    });
  });
});

// Write back to file
fs.writeFileSync(structuredPath, JSON.stringify(structured, null, 2));

console.log(`✅ Successfully added ${newDescriptions.length} new detail descriptions`);
console.log(`   Total descriptions: ${structured.detail_descriptions.length}`);

