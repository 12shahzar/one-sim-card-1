-- ============================================
-- MySQL Database Schema for Partners Data
-- ============================================
-- This schema is designed based on the normalized JSON structure
-- Created: 2024-01-01
-- Description: Professional database structure for OneSimCard partners and technology content

-- ============================================
-- Table: sections
-- ============================================
-- Main sections like Technology, Partners, Accolades
CREATE TABLE IF NOT EXISTS `sections` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `header` VARCHAR(255) NOT NULL COMMENT 'Section header/title',
  `count` INT(11) DEFAULT 0 COMMENT 'Number of items in section',
  `sort_order` INT(11) DEFAULT 0 COMMENT 'Display order',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT 'Active status flag',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Main content sections';

-- ============================================
-- Table: section_items
-- ============================================
-- Items within each section (technology topics, partners, etc.)
CREATE TABLE IF NOT EXISTS `section_items` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to sections',
  `slug` VARCHAR(255) NOT NULL COMMENT 'URL-friendly identifier',
  `label` VARCHAR(500) NOT NULL COMMENT 'Display label',
  `intro` TEXT COMMENT 'Introduction text',
  `image` VARCHAR(500) COMMENT 'Image path/URL',
  `item_type` ENUM('overview', 'detail', 'partner', 'compatibility_list', 'api_content', 'accolade') NOT NULL DEFAULT 'detail',
  `api_url` VARCHAR(500) COMMENT 'API endpoint for dynamic content',
  `sort_order` INT(11) DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  KEY `idx_section_id` (`section_id`),
  KEY `idx_item_type` (`item_type`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_section_items_section` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Items within sections';

-- ============================================
-- Table: item_sections
-- ============================================
-- Sub-sections within section items (e.g., Coverage, Security, Pricing)
CREATE TABLE IF NOT EXISTS `item_sections` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_item_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to section_items',
  `heading` VARCHAR(255) NOT NULL COMMENT 'Section heading',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_item_id` (`section_item_id`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_item_sections_item` FOREIGN KEY (`section_item_id`) REFERENCES `section_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Sub-sections within section items';

-- ============================================
-- Table: categories
-- ============================================
-- Categories within item sections (e.g., Network Coverage, VPN, etc.)
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_section_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to item_sections',
  `slug` VARCHAR(255) NOT NULL COMMENT 'URL-friendly identifier',
  `label` VARCHAR(500) NOT NULL COMMENT 'Category label',
  `image` VARCHAR(500) COMMENT 'Image path/URL',
  `description` TEXT COMMENT 'Category description',
  `has_learn_more` TINYINT(1) DEFAULT 0 COMMENT 'Whether learn more link is available',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  KEY `idx_item_section_id` (`item_section_id`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_categories_item_section` FOREIGN KEY (`item_section_id`) REFERENCES `item_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Categories within item sections';

-- ============================================
-- Table: item_details
-- ============================================
-- Detailed content for section items
CREATE TABLE IF NOT EXISTS `item_details` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_item_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to section_items',
  `heading` VARCHAR(500) NOT NULL COMMENT 'Detail heading',
  `image` VARCHAR(500) COMMENT 'Image path/URL',
  `has_feature_content` TINYINT(1) DEFAULT 0 COMMENT 'Whether feature content exists',
  `has_contact` TINYINT(1) DEFAULT 0 COMMENT 'Whether contact button should be shown',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_item_id` (`section_item_id`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_item_details_item` FOREIGN KEY (`section_item_id`) REFERENCES `section_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detailed content for section items';

-- ============================================
-- Table: detail_descriptions
-- ============================================
-- Description content for item details (main and bottom descriptions)
CREATE TABLE IF NOT EXISTS `detail_descriptions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_detail_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to item_details',
  `content` TEXT NOT NULL COMMENT 'Description content',
  `description_type` ENUM('main', 'bottom') NOT NULL DEFAULT 'main',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_item_detail_id` (`item_detail_id`),
  KEY `idx_description_type` (`description_type`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_detail_descriptions_detail` FOREIGN KEY (`item_detail_id`) REFERENCES `item_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Description content for item details';

-- ============================================
-- Table: feature_contents
-- ============================================
-- Feature content blocks for item details
CREATE TABLE IF NOT EXISTS `feature_contents` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_detail_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to item_details',
  `content` TEXT NOT NULL COMMENT 'Feature content',
  `image` VARCHAR(500) COMMENT 'Feature image path/URL',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_item_detail_id` (`item_detail_id`),
  CONSTRAINT `fk_feature_contents_detail` FOREIGN KEY (`item_detail_id`) REFERENCES `item_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Feature content blocks';

-- ============================================
-- Table: tables
-- ============================================
-- Data tables (e.g., Compatible Devices, Compatible Software)
CREATE TABLE IF NOT EXISTS `tables` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_item_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to section_items',
  `heading` VARCHAR(255) NOT NULL COMMENT 'Table heading',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_item_id` (`section_item_id`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_tables_item` FOREIGN KEY (`section_item_id`) REFERENCES `section_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Data tables for compatibility lists';

-- ============================================
-- Table: table_items
-- ============================================
-- Individual items within tables (device names, software names, etc.)
CREATE TABLE IF NOT EXISTS `table_items` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `table_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to tables',
  `name` VARCHAR(500) NOT NULL COMMENT 'Item name',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_table_id` (`table_id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_name` (`name`(255)),
  CONSTRAINT `fk_table_items_table` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Items within tables';

-- ============================================
-- Table: app_store_links
-- ============================================
-- App store links (iOS, Android)
CREATE TABLE IF NOT EXISTS `app_store_links` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_item_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to section_items',
  `image_url` VARCHAR(500) NOT NULL COMMENT 'App store badge image URL',
  `link_url` VARCHAR(500) NOT NULL COMMENT 'App store link URL',
  `platform` ENUM('ios', 'android', 'other') NOT NULL DEFAULT 'other',
  `sort_order` INT(11) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_item_id` (`section_item_id`),
  KEY `idx_platform` (`platform`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_app_store_links_item` FOREIGN KEY (`section_item_id`) REFERENCES `section_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='App store links';

-- ============================================
-- Table: buttons
-- ============================================
-- Buttons associated with section items
CREATE TABLE IF NOT EXISTS `buttons` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_item_id` INT(11) UNSIGNED NOT NULL COMMENT 'Foreign key to section_items',
  `text` VARCHAR(255) NOT NULL COMMENT 'Button text',
  `is_visible` TINYINT(1) DEFAULT 1 COMMENT 'Visibility flag',
  `action_type` VARCHAR(50) DEFAULT 'expand' COMMENT 'Button action type',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_item_id` (`section_item_id`),
  CONSTRAINT `fk_buttons_item` FOREIGN KEY (`section_item_id`) REFERENCES `section_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Buttons for section items';

-- ============================================
-- Indexes for Performance
-- ============================================
-- Additional composite indexes for common query patterns

-- For queries that fetch sections with their items
CREATE INDEX `idx_sections_active_sort` ON `sections` (`is_active`, `sort_order`);

-- For queries that fetch section items by section and type
CREATE INDEX `idx_items_section_type_sort` ON `section_items` (`section_id`, `item_type`, `sort_order`);

-- For queries that fetch categories by section item
CREATE INDEX `idx_categories_section_sort` ON `categories` (`item_section_id`, `sort_order`);

-- For queries that fetch table items by table
CREATE INDEX `idx_table_items_table_sort` ON `table_items` (`table_id`, `sort_order`);

-- ============================================
-- Views for Common Queries
-- ============================================

-- View: Get all sections with item counts
CREATE OR REPLACE VIEW `vw_sections_with_counts` AS
SELECT 
  s.*,
  COUNT(si.id) as actual_item_count
FROM sections s
LEFT JOIN section_items si ON s.id = si.section_id AND si.is_active = 1
WHERE s.is_active = 1
GROUP BY s.id;

-- View: Get section items with full details
CREATE OR REPLACE VIEW `vw_section_items_full` AS
SELECT 
  si.*,
  s.header as section_header,
  COUNT(DISTINCT isec.id) as item_section_count,
  COUNT(DISTINCT cat.id) as category_count,
  COUNT(DISTINCT det.id) as detail_count,
  COUNT(DISTINCT t.id) as table_count
FROM section_items si
JOIN sections s ON si.section_id = s.id
LEFT JOIN item_sections isec ON si.id = isec.section_item_id
LEFT JOIN categories cat ON isec.id = cat.item_section_id
LEFT JOIN item_details det ON si.id = det.section_item_id
LEFT JOIN tables t ON si.id = t.section_item_id
WHERE si.is_active = 1 AND s.is_active = 1
GROUP BY si.id;

-- ============================================
-- Sample Data Insert Scripts
-- ============================================
-- Note: Run these after creating the tables

-- Insert sections
/*
INSERT INTO `sections` (`id`, `header`, `count`, `sort_order`, `is_active`) VALUES
(1, 'Technology', 13, 1, 1),
(2, 'Partners', 3, 2, 1),
(3, 'Accolades', 1, 3, 1);
*/

-- ============================================
-- Stored Procedures (Optional)
-- ============================================

-- Procedure: Get section with all items and nested data
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS `sp_get_section_with_items`(IN section_id INT)
BEGIN
  SELECT 
    s.*,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', si.id,
        'slug', si.slug,
        'label', si.label,
        'intro', si.intro,
        'image', si.image,
        'item_type', si.item_type,
        'api_url', si.api_url,
        'sort_order', si.sort_order
      ) ORDER BY si.sort_order
    ) as items
  FROM sections s
  LEFT JOIN section_items si ON s.id = si.section_id AND si.is_active = 1
  WHERE s.id = section_id AND s.is_active = 1
  GROUP BY s.id;
END //

DELIMITER ;

-- ============================================
-- END OF SCHEMA
-- ============================================

