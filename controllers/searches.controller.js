const SearchService = require('../services/searches.service');
const InvalidParamsError = require('../exceptions/index.exception');

class SearchController {
  searchService = new SearchService();

  postSearch = async (req, res, next) => {
    try {
      let { keyword } = req.query;
      const { groupId } = req.params;
      const searchKeyword = keyword.split('');
      //*작성자로 게시글 검색
      if (searchKeyword[0] == '@') {
        keyword = searchKeyword[1];
        const userPostSearch = await this.searchService.userPostSearch({
          keyword,
        });
        return res.status(200).json({ ok: true, data: userPostSearch });
      }
      //*키워드로 게시글 검색
      const postSearch = await this.searchService.postSearch({
        keyword,
        groupId,
      });
      res.status(200).json({ ok: true, data: postSearch });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = SearchController;
