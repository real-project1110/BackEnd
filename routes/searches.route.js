const express = require('express');
const SearchController = require('../controllers/searches.controller');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const SearchController = require('../controllers/searches.controller');
const searchController = new SearchController();

router.get('/groups/:groupId/search', auth, searchController.postSearch);

module.express = router;
