const SearchRepository = require('../repositories/searches.repository');
const ValidationError = require('../exceptions/index.exception');

class SearchService {
  searchRepository = new SearchRepository();
}
module.exports = SearchService;
