const contentService = require('../services/contentService');

async function getContent(req, res) {
    try {
        const data = await contentService.getFullContent();
        res.json({ sections: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getContent
};
