const db = require('../config/db');

async function getFullContent() {
    const result = [];

    // =======================
    // 1. Technology Section
    // =======================
    const [technologySections] = await db.query(
        'SELECT * FROM iot_content WHERE header = "Technology"'
    );

    if (technologySections.length > 0) {
        const techSection = technologySections[0];

        const sectionObj = {
            header: techSection.header,
            count: techSection.count,
            items: []
        };

        // Fetch items linked to this section
        const [items] = await db.query('SELECT * FROM items WHERE section_id = ?', [techSection.id]);

        for (const item of items) {
            const itemObj = {
                id: item.item_json_id,
                label: item.label,
                intro: item.intro,
                api_url: item.api_url,
                details: [],
                section: []
            };

            // Fetch details for this item
            const [details] = await db.query('SELECT * FROM item_details WHERE item_id = ?', [item.item_id]);

            for (const detail of details) {
                const detailObj = {
                    heading: detail.heading,
                    description: JSON.parse(detail.description || '[]'),
                    bottomDescription: JSON.parse(detail.bottom_description || '[]'),
                    featureContent: detail.feature_content ? JSON.parse(detail.feature_content) : false,
                    contact: !!detail.contact,
                    categories: []
                };

                // Fetch categories for this detail
                const [categories] = await db.query('SELECT * FROM categories WHERE detail_id = ?', [detail.detail_id]);
                if (categories.length > 0) {
                    detailObj.categories = categories.map(c => ({
                        id: c.category_json_id,
                        label: c.label,
                        image: c.image,
                        description: c.description,
                        learnmore: !!c.learn_more
                    }));
                }

                itemObj.details.push(detailObj);
            }

            // Fetch nested categories for the item (section array)
            const [nestedCategories] = await db.query('SELECT * FROM categories WHERE item_id = ? AND detail_id IS NULL', [item.item_id]);
            if (nestedCategories.length > 0) {
                itemObj.section = nestedCategories.map(c => ({
                    id: c.category_json_id,
                    label: c.label,
                    image: c.image,
                    description: c.description,
                    learnmore: !!c.learn_more
                }));
            }

            sectionObj.items.push(itemObj);
        }

        result.push(sectionObj);
    }

    // =======================
    // 2. Partners Section
    // =======================
    const [partners] = await db.query('SELECT * FROM partners');
    if (partners.length > 0) {
        const partnersSection = {
            header: 'Partners',
            count: partners.length,
            items: []
        };

        for (const partner of partners) {
            const partnerObj = {
                id: partner.partner_json_id || partner.partner_id,
                label: partner.label,
                intro: partner.intro,
                image: partner.image,
                tables: []
            };

            const [tables] = await db.query('SELECT * FROM partner_tables WHERE partner_id = ?', [partner.partner_id]);
            for (const table of tables) {
                const tableObj = {
                    heading: table.heading,
                    items: []
                };

                const [tableItems] = await db.query('SELECT * FROM partner_table_items WHERE table_id = ?', [table.table_id]);
                tableObj.items = tableItems.map(i => i.item_name);

                partnerObj.tables.push(tableObj);
            }

            if (partner.button_text) {
                partnerObj.button = {
                    text: partner.button_text,
                    visible: !!partner.button_visible
                };
            }

            partnersSection.items.push(partnerObj);
        }

        result.push(partnersSection);
    }

    // =======================
    // 3. Accolades Section
    // =======================
    try {
        const [accolades] = await db.query('SELECT * FROM accolades');
        if (accolades.length > 0) {
            const accoladesSection = {
                header: 'Accolades',
                count: accolades.length,
                items: accolades.map(a => ({
                    id: a.accolade_json_id || a.accolade_id,
                    label: a.label,
                    intro: a.intro
                }))
            };
            result.push(accoladesSection);
        }
    } catch (err) {
        console.warn('Accolades table missing, skipping section');
    }

    return result;
}

module.exports = { getFullContent };
