const SearchRepository = require('../repositories/searches.repository');
const ValidationError = require('../exceptions/index.exception');

class SearchService {
  searchRepository = new SearchRepository();

  //*작성자로 게시글 검색
  userPostSearch = async (keyword) => {
    const findUserNickname = await this.searchRepository.findUserNickname({
      keyword,
    });
    if (!findUserNickname) {
      throw new ValidationError(401, '검색결과가 없습니다');
    }
    const groupUserId = findUserNickname.groupUserId;
    const userPostSearch = await this.searchRepository.userPostSearch({
      groupUserId,
    });
    return userPostSearch;
  };
  //*키워드로 게시글 검색
  postSearch = async (keyword, groupId) => {
    const postSearch = await this.searchRepository.postSearch({
      keyword,
      groupId,
    });

    if (!postSearch) {
      throw new ValidationError(401, '검색결과가 없습니다.');
    }
    return postSearch;
  };
}
module.exports = SearchService;
