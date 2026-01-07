/**
 * JSON to MySQL Migration Script
 * 
 * This script converts the structured JSON file to MySQL INSERT statements
 * Usage: node json-to-mysql-migration.js > migration-data.sql
 */

const fs = require('fs');
const path = require('path');

// Read the structured JSON file
const jsonPath = path.join(__dirname, 'Frontend', 'src', 'data', 'partnersData.structured.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Escape SQL strings
function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

// Generate INSERT statements
function generateInserts(tableName, records, getValuesFn) {
  if (!records || records.length === 0) return '';
  
  const values = records.map(getValuesFn).join(',\n  ');
  return `-- Insert ${records.length} records into ${tableName}\nINSERT INTO \`${tableName}\` VALUES\n  ${values};\n\n`;
}

// Sections
console.log('-- ============================================');
console.log('-- Migration Data from JSON');
console.log('-- ============================================\n');

if (data.sections) {
  const sectionsSQL = data.sections.map(s => 
    `(${s.id}, ${escapeSQL(s.header)}, ${s.count}, ${s.sort_order}, ${s.is_active ? 1 : 0}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`sections\` (\`id\`, \`header\`, \`count\`, \`sort_order\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n  ${sectionsSQL};\n\n`);
}

// Section Items
if (data.section_items) {
  const itemsSQL = data.section_items.map(item => 
    `(${item.id}, ${item.section_id}, ${escapeSQL(item.slug)}, ${escapeSQL(item.label)}, ${escapeSQL(item.intro)}, ${escapeSQL(item.image || null)}, ${escapeSQL(item.item_type)}, ${escapeSQL(item.api_url || null)}, ${item.sort_order}, ${item.is_active !== false ? 1 : 0}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`section_items\` (\`id\`, \`section_id\`, \`slug\`, \`label\`, \`intro\`, \`image\`, \`item_type\`, \`api_url\`, \`sort_order\`, \`is_active\`, \`created_at\`, \`updated_at\`) VALUES\n  ${itemsSQL};\n\n`);
}

// Item Sections
if (data.item_sections) {
  const sectionsSQL = data.item_sections.map(s => 
    `(${s.id}, ${s.section_item_id}, ${escapeSQL(s.heading)}, ${s.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`item_sections\` (\`id\`, \`section_item_id\`, \`heading\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${sectionsSQL};\n\n`);
}

// Categories
if (data.categories) {
  const categoriesSQL = data.categories.map(cat => 
    `(${cat.id}, ${cat.item_section_id}, ${escapeSQL(cat.slug)}, ${escapeSQL(cat.label)}, ${escapeSQL(cat.image || null)}, ${escapeSQL(cat.description || null)}, ${cat.has_learn_more ? 1 : 0}, ${cat.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`categories\` (\`id\`, \`item_section_id\`, \`slug\`, \`label\`, \`image\`, \`description\`, \`has_learn_more\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${categoriesSQL};\n\n`);
}

// Item Details
if (data.item_details) {
  const detailsSQL = data.item_details.map(det => 
    `(${det.id}, ${det.section_item_id}, ${escapeSQL(det.heading)}, ${escapeSQL(det.image || null)}, ${det.has_feature_content ? 1 : 0}, ${det.has_contact ? 1 : 0}, ${det.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`item_details\` (\`id\`, \`section_item_id\`, \`heading\`, \`image\`, \`has_feature_content\`, \`has_contact\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${detailsSQL};\n\n`);
}

// Detail Descriptions
if (data.detail_descriptions) {
  const descsSQL = data.detail_descriptions.map(desc => 
    `(${desc.id}, ${desc.item_detail_id}, ${escapeSQL(desc.content)}, ${escapeSQL(desc.description_type)}, ${desc.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`detail_descriptions\` (\`id\`, \`item_detail_id\`, \`content\`, \`description_type\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${descsSQL};\n\n`);
}

// Feature Contents
if (data.feature_contents) {
  const featuresSQL = data.feature_contents.map(feat => 
    `(${feat.id}, ${feat.item_detail_id}, ${escapeSQL(feat.content)}, ${escapeSQL(feat.image || null)}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`feature_contents\` (\`id\`, \`item_detail_id\`, \`content\`, \`image\`, \`created_at\`, \`updated_at\`) VALUES\n  ${featuresSQL};\n\n`);
}

// Tables
if (data.tables) {
  const tablesSQL = data.tables.map(t => 
    `(${t.id}, ${t.section_item_id}, ${escapeSQL(t.heading)}, ${t.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`tables\` (\`id\`, \`section_item_id\`, \`heading\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${tablesSQL};\n\n`);
}

// Table Items
if (data.table_items && data.table_items.length > 0) {
  // Note: This is a sample. You'll need to populate from the original JSON
  const tableItemsSQL = data.table_items.map(ti => 
    `(${ti.id}, ${ti.table_id}, ${escapeSQL(ti.name)}, ${ti.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`table_items\` (\`id\`, \`table_id\`, \`name\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${tableItemsSQL};\n\n`);
  console.log('-- Note: You need to populate table_items from the original JSON file');
  console.log('-- Original file contains many device and software names in the tables array\n\n');
}

// App Store Links
if (data.app_store_links) {
  const linksSQL = data.app_store_links.map(link => 
    `(${link.id}, ${link.section_item_id}, ${escapeSQL(link.image_url)}, ${escapeSQL(link.link_url)}, ${escapeSQL(link.platform)}, ${link.sort_order}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`app_store_links\` (\`id\`, \`section_item_id\`, \`image_url\`, \`link_url\`, \`platform\`, \`sort_order\`, \`created_at\`, \`updated_at\`) VALUES\n  ${linksSQL};\n\n`);
}

// Buttons
if (data.buttons) {
  const buttonsSQL = data.buttons.map(btn => 
    `(${btn.id}, ${btn.section_item_id}, ${escapeSQL(btn.text)}, ${btn.is_visible ? 1 : 0}, ${escapeSQL(btn.action_type)}, NOW(), NOW())`
  ).join(',\n  ');
  console.log(`INSERT INTO \`buttons\` (\`id\`, \`section_item_id\`, \`text\`, \`is_visible\`, \`action_type\`, \`created_at\`, \`updated_at\`) VALUES\n  ${buttonsSQL};\n\n`);
}

console.log('-- ============================================');
console.log('-- End of Migration Data');
console.log('-- ============================================');

