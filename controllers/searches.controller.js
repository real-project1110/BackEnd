const SearchService = require('../services/searches.service');
const InvalidParamsError = require('../exceptions/index.exception');

class SearchController {
  searchService = new SearchService();
}
module.exports = SearchController;
