/**
 * Transform normalized partners data structure to component-compatible format
 * Converts the structured JSON (database-like) to the nested format expected by components
 */

export function transformPartnersData(normalizedData) {
  // Handle cases where normalizedData might be undefined or missing properties
  if (!normalizedData) {
    return { sections: [] };
  }

  const { sections, section_items, item_sections, categories, item_details, 
          detail_descriptions, feature_contents, tables, table_items, 
          app_store_links, buttons } = normalizedData;

  // Create lookup maps for efficient data access
  const sectionsMap = new Map(sections.map(s => [s.id, s]));
  const itemSectionsMap = new Map();
  const categoriesMap = new Map();
  const detailsMap = new Map();
  const descriptionsMap = new Map();
  const featuresMap = new Map();
  const tablesMap = new Map();
  const tableItemsMap = new Map();
  const appLinksMap = new Map();
  const buttonsMap = new Map();

  // Group item_sections by section_item_id
  if (item_sections) {
    item_sections.forEach(is => {
      if (!itemSectionsMap.has(is.section_item_id)) {
        itemSectionsMap.set(is.section_item_id, []);
      }
      itemSectionsMap.get(is.section_item_id).push(is);
    });
    // Sort by sort_order
    itemSectionsMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group categories by item_section_id
  if (categories) {
    categories.forEach(cat => {
      if (!categoriesMap.has(cat.item_section_id)) {
        categoriesMap.set(cat.item_section_id, []);
      }
      categoriesMap.get(cat.item_section_id).push(cat);
    });
    // Sort by sort_order
    categoriesMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group item_details by section_item_id
  if (item_details) {
    item_details.forEach(det => {
      if (!detailsMap.has(det.section_item_id)) {
        detailsMap.set(det.section_item_id, []);
      }
      detailsMap.get(det.section_item_id).push(det);
    });
    // Sort by sort_order
    detailsMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group descriptions by item_detail_id
  if (detail_descriptions) {
    detail_descriptions.forEach(desc => {
      if (!descriptionsMap.has(desc.item_detail_id)) {
        descriptionsMap.set(desc.item_detail_id, { main: [], bottom: [] });
      }
      if (desc.description_type === 'main') {
        descriptionsMap.get(desc.item_detail_id).main.push(desc);
      } else {
        descriptionsMap.get(desc.item_detail_id).bottom.push(desc);
      }
    });
    // Sort by sort_order
    descriptionsMap.forEach((obj) => {
      obj.main.sort((a, b) => a.sort_order - b.sort_order);
      obj.bottom.sort((a, b) => a.sort_order - b.sort_order);
    });
  }

  // Group feature_contents by item_detail_id (should be one per detail)
  if (feature_contents) {
    feature_contents.forEach(feat => {
      featuresMap.set(feat.item_detail_id, feat);
    });
  }

  // Group tables by section_item_id
  if (tables) {
    tables.forEach(t => {
      if (!tablesMap.has(t.section_item_id)) {
        tablesMap.set(t.section_item_id, []);
      }
      tablesMap.get(t.section_item_id).push(t);
    });
    // Sort by sort_order
    tablesMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group table_items by table_id
  if (table_items) {
    table_items.forEach(ti => {
      if (!tableItemsMap.has(ti.table_id)) {
        tableItemsMap.set(ti.table_id, []);
      }
      tableItemsMap.get(ti.table_id).push(ti);
    });
    // Sort by sort_order
    tableItemsMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group app_store_links by section_item_id
  if (app_store_links) {
    app_store_links.forEach(link => {
      if (!appLinksMap.has(link.section_item_id)) {
        appLinksMap.set(link.section_item_id, []);
      }
      appLinksMap.get(link.section_item_id).push(link);
    });
    // Sort by sort_order
    appLinksMap.forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));
  }

  // Group buttons by section_item_id
  if (buttons) {
    buttons.forEach(btn => {
      if (!buttonsMap.has(btn.section_item_id)) {
        buttonsMap.set(btn.section_item_id, btn);
      }
    });
  }

  // Transform section_items to items format
  const transformItem = (item) => {
    const itemSections = itemSectionsMap.get(item.id) || [];
    const itemDetails = detailsMap.get(item.id) || [];
    const itemTables = tablesMap.get(item.id) || [];
    const itemAppLinks = appLinksMap.get(item.id) || [];
    const itemButton = buttonsMap.get(item.id);

    // Transform item_sections to section format
    const sectionArray = itemSections.map(is => {
      const sectionCategories = categoriesMap.get(is.id) || [];
      return {
        heading: is.heading,
        categories: sectionCategories.map(cat => ({
          id: cat.slug,
          label: cat.label,
          image: cat.image,
          description: cat.description,
          learnmore: cat.has_learn_more
        }))
      };
    });

    // Transform item_details to details format
    const detailsArray = itemDetails.map(det => {
      const descs = descriptionsMap.get(det.id) || { main: [], bottom: [] };
      const feature = featuresMap.get(det.id);

      const detail = {
        heading: det.heading,
        description: descs.main.map(d => d.content),
        bottomDescription: descs.bottom.map(d => d.content),
        featureContent: det.has_feature_content && feature ? {
          content: feature.content,
          image: feature.image
        } : false,
        contact: det.has_contact
      };

      if (det.image) {
        detail.image = det.image;
      }

      return detail;
    });

    // Transform tables to tables format
    const tablesArray = itemTables.map(t => {
      const items = tableItemsMap.get(t.id) || [];
      return {
        heading: t.heading,
        items: items.map(ti => ti.name)
      };
    });

    // Transform app_store_links to moreImage format
    const moreImageArray = itemAppLinks.map(link => ({
      image: link.image_url,
      link: link.link_url
    }));

    // Build the transformed item
    const transformedItem = {
      id: item.slug, // Use slug as id for compatibility
      label: item.label,
      intro: item.intro || '',
      image: item.image || undefined,
      api_url: item.api_url || undefined
    };

    // Add optional fields
    if (sectionArray.length > 0) {
      transformedItem.section = sectionArray;
    }
    if (detailsArray.length > 0) {
      transformedItem.details = detailsArray;
    }
    if (tablesArray.length > 0) {
      transformedItem.tables = tablesArray;
    }
    if (moreImageArray.length > 0) {
      transformedItem.moreImage = moreImageArray;
    }
    if (itemButton && itemButton.is_visible) {
      transformedItem.button = itemButton;
    }

    return transformedItem;
  };

  // Transform sections to include items
  const transformedSections = (sections || [])
    .filter(s => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(section => {
      const sectionItems = (section_items || [])
        .filter(item => item.section_id === section.id && item.is_active !== false)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(transformItem);

      return {
        header: section.header,
        count: section.count || sectionItems.length,
        items: sectionItems
      };
    });

  return {
    sections: transformedSections
  };
}

