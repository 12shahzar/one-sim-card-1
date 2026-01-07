# Database Structure Guide

## Overview

This guide explains the professional, normalized database structure designed for converting the `partnersData.json` file into a MySQL database.

## Database Schema Architecture

### Entity Relationship Diagram

```
sections (1) ──< (N) section_items
                    ├──< (N) item_sections
                    │       └──< (N) categories
                    ├──< (N) item_details
                    │       ├──< (N) detail_descriptions
                    │       └──< (N) feature_contents
                    ├──< (N) tables
                    │       └──< (N) table_items
                    ├──< (N) app_store_links
                    └──< (N) buttons
```

### Table Descriptions

#### 1. `sections`

Main top-level sections (Technology, Partners, Accolades).

- **Primary Key**: `id`
- **Fields**: `header`, `count`, `sort_order`, `is_active`
- **Relationships**: One-to-Many with `section_items`

#### 2. `section_items`

Items within each section (technology topics, partners, etc.).

- **Primary Key**: `id`
- **Foreign Key**: `section_id` → `sections.id`
- **Fields**: `slug`, `label`, `intro`, `image`, `item_type`, `api_url`, `sort_order`
- **Item Types**: `overview`, `detail`, `partner`, `compatibility_list`, `api_content`, `accolade`
- **Relationships**:
  - Many-to-One with `sections`
  - One-to-Many with `item_sections`, `item_details`, `tables`, `app_store_links`, `buttons`

#### 3. `item_sections`

Sub-sections within section items (e.g., Coverage, Security, Pricing).

- **Primary Key**: `id`
- **Foreign Key**: `section_item_id` → `section_items.id`
- **Fields**: `heading`, `sort_order`
- **Relationships**: One-to-Many with `categories`

#### 4. `categories`

Categories within item sections (e.g., Network Coverage, VPN).

- **Primary Key**: `id`
- **Foreign Key**: `item_section_id` → `item_sections.id`
- **Fields**: `slug`, `label`, `image`, `description`, `has_learn_more`, `sort_order`

#### 5. `item_details`

Detailed content blocks for section items.

- **Primary Key**: `id`
- **Foreign Key**: `section_item_id` → `section_items.id`
- **Fields**: `heading`, `image`, `has_feature_content`, `has_contact`, `sort_order`
- **Relationships**: One-to-Many with `detail_descriptions`, `feature_contents`

#### 6. `detail_descriptions`

Description content for item details (main and bottom descriptions).

- **Primary Key**: `id`
- **Foreign Key**: `item_detail_id` → `item_details.id`
- **Fields**: `content`, `description_type`, `sort_order`
- **Description Types**: `main`, `bottom`

#### 7. `feature_contents`

Feature content blocks with images.

- **Primary Key**: `id`
- **Foreign Key**: `item_detail_id` → `item_details.id`
- **Fields**: `content`, `image`

#### 8. `tables`

Data tables for compatibility lists.

- **Primary Key**: `id`
- **Foreign Key**: `section_item_id` → `section_items.id`
- **Fields**: `heading`, `sort_order`
- **Relationships**: One-to-Many with `table_items`

#### 9. `table_items`

Individual items within tables (device names, software names).

- **Primary Key**: `id`
- **Foreign Key**: `table_id` → `tables.id`
- **Fields**: `name`, `sort_order`

#### 10. `app_store_links`

App store links (iOS, Android).

- **Primary Key**: `id`
- **Foreign Key**: `section_item_id` → `section_items.id`
- **Fields**: `image_url`, `link_url`, `platform`, `sort_order`
- **Platforms**: `ios`, `android`, `other`

#### 11. `buttons`

Buttons associated with section items.

- **Primary Key**: `id`
- **Foreign Key**: `section_item_id` → `section_items.id`
- **Fields**: `text`, `is_visible`, `action_type`

## Normalization Benefits

### 1. **Data Integrity**

- Foreign key constraints ensure referential integrity
- Cascade deletes maintain data consistency
- Unique constraints prevent duplicate entries

### 2. **Scalability**

- Easy to add new sections, items, or categories
- Efficient queries with proper indexing
- Supports large datasets

### 3. **Maintainability**

- Single source of truth for each entity
- Easy to update individual records
- Clear relationships between entities

### 4. **Flexibility**

- Supports multiple languages (via content tables)
- Easy to add new item types or fields
- Extensible structure for future requirements

## Key Design Decisions

### 1. **Slug Fields**

- Used for URL-friendly identifiers
- Unique constraints prevent conflicts
- Enable SEO-friendly URLs

### 2. **Sort Order Fields**

- All entities have `sort_order` for manual positioning
- Enables drag-and-drop reordering in admin panels

### 3. **Active Flags**

- Soft delete capability
- Enable/disable content without deletion
- Maintain historical data

### 4. **Timestamps**

- `created_at` and `updated_at` on all tables
- Track data changes
- Audit trail support

### 5. **Item Types**

- Enum for `item_type` ensures data consistency
- Easy filtering and querying
- Type-specific handling in application code

## Indexing Strategy

### Primary Indexes

- All primary keys are automatically indexed
- Unique constraints create indexes

### Performance Indexes

- `sort_order` columns indexed for ORDER BY queries
- Foreign keys indexed for JOIN operations
- Composite indexes for common query patterns

### Query Optimization

- Indexes on frequently filtered columns (`is_active`, `item_type`)
- Composite indexes for multi-column queries
- Covering indexes for common SELECT patterns

## Usage Examples

### Get All Active Sections

```sql
SELECT * FROM sections WHERE is_active = 1 ORDER BY sort_order;
```

### Get Section with All Items

```sql
SELECT s.*, si.*
FROM sections s
LEFT JOIN section_items si ON s.id = si.section_id
WHERE s.id = 1 AND si.is_active = 1
ORDER BY si.sort_order;
```

### Get Full Item Details

```sql
SELECT
  si.*,
  s.header as section_name,
  GROUP_CONCAT(DISTINCT cat.label) as categories
FROM section_items si
JOIN sections s ON si.section_id = s.id
LEFT JOIN item_sections isec ON si.id = isec.section_item_id
LEFT JOIN categories cat ON isec.id = cat.item_section_id
WHERE si.slug = 'technology'
GROUP BY si.id;
```

### Get Compatible Devices

```sql
SELECT ti.name
FROM tables t
JOIN section_items si ON t.section_item_id = si.id
JOIN table_items ti ON t.id = ti.table_id
WHERE si.slug = 'premier' AND t.heading = 'Compatible Devices'
ORDER BY ti.sort_order;
```

## Migration from JSON

### Step 1: Create Database

```sql
CREATE DATABASE onesimcard_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE onesimcard_db;
```

### Step 2: Run Schema

```bash
mysql -u username -p onesimcard_db < database-schema.sql
```

### Step 3: Import Data

Use the provided migration scripts or import from the structured JSON file using a script.

### Step 4: Verify

```sql
SELECT COUNT(*) FROM sections;
SELECT COUNT(*) FROM section_items;
SELECT COUNT(*) FROM categories;
```

## API Integration

### JSON API Response Format

The structure can be easily converted back to JSON format for API responses:

```javascript
// Example: Get section with items
const section = {
  id: 1,
  header: "Technology",
  items: [
    {
      id: 1,
      slug: "technology",
      label: "Technology Overview",
      sections: [
        {
          heading: "Coverage",
          categories: [...]
        }
      ]
    }
  ]
};
```

### RESTful Endpoints

- `GET /api/sections` - Get all sections
- `GET /api/sections/:id` - Get section with items
- `GET /api/items/:slug` - Get item by slug
- `GET /api/items/:slug/categories` - Get item categories

## Best Practices

### 1. **Use Transactions**

Always wrap related inserts/updates in transactions:

```sql
START TRANSACTION;
INSERT INTO sections ...;
INSERT INTO section_items ...;
COMMIT;
```

### 2. **Use Prepared Statements**

Prevent SQL injection:

```sql
PREPARE stmt FROM 'SELECT * FROM sections WHERE id = ?';
EXECUTE stmt USING @section_id;
```

### 3. **Backup Regularly**

```bash
mysqldump -u username -p onesimcard_db > backup.sql
```

### 4. **Monitor Performance**

```sql
EXPLAIN SELECT * FROM section_items WHERE section_id = 1;
```

## Future Enhancements

### 1. **Multi-language Support**

Add `translations` table with language codes.

### 2. **Versioning**

Add version tracking for content changes.

### 3. **Audit Trail**

Extend timestamp fields with user tracking.

### 4. **Content Management**

Add approval workflow fields.

### 5. **Search Functionality**

Add full-text search indexes on content fields.

## Support

For questions or issues, refer to:

- MySQL Documentation: https://dev.mysql.com/doc/
- JSON Structure: `partnersData.structured.json`
- Schema File: `database-schema.sql`
