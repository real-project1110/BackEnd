const PostService = require('../../../services/posts.service');
const { ValidationError } = require('../../../exceptions/index.exception');
const {
  createPostInsertSchema,
  createPostResulttSchema,
} = require('../../fixtures/posts.fixtures');
const jestConfig = require('../../../jest.config');
const { testPathIgnorePatterns } = require('../../../jest.config');

const mockPostRepository = {
  findGroupUserId: jest.fn(),
  createPost: jest.fn(),
  findAllPost: jest.fn(),
  getPostOne: jest.fn(),
};
describe('Post Service Layer Test', function () {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createPost Method Success Case', async () => {
    //*새로운 서비스 할당
    let postService = new PostService();
    //*Repository를 Mocking
    postService.postRepository = Object.assign({}, mockPostRepository);
    //*Repository의 createPost Method의 Mock된 결과값을 수정
    postService.postRepository.createPost = jest.fn(
      () => createPostInsertSchema,
    );
    //*Service의 findGroupUserId를 Mocking
    postService.findGroupUserId = jest.fn();
    const createPost = await postService.createPost(createPostResultSchema);

    //*createPost 메소드를 호출할 때, findGroupUserId를 호출했는지 검증
    expect(postService.findGroupUserId).toHaveBeenCalledWith({
      userId: createPostInsertSchema.userId,
      groupId: createPostInsertSchema.groupId,
    });
    //* createPost 메소드를 호출할 때, 어떤 값이었는지 검증
    expect(postService.postRepository.createPost).toHaveBeenCalledWith({
      ...createPostInsertSchema,
      category: 0,
      groupUserId: 1,
    });
    //* createPost 메소드가 몇번 호출되었는지 확인
    expect(postService.postRepository.createPost).toHaveBeenCalledTimes(1);
    //* postRepository.createPost에서 호출되는 결과값과 Service의 return값이 일치한다. 가공X
    expect(createPost).tobe(createPostResulttSchema);
  });

  tset('creatPost Method Fail Case By groupUserId', async () => {
    const validationErrorByDuplicatedIdSchema = {
      groupId: createPostInsertSchema.groupId,
      groupUserId: createPostInsertSchema.groupUserId,
    };
    let postService = new PostService();

    postService.postRepository = Object.assign({}, mockPostRepository);

    postService.postRepository.createPost = jest.fn(
      () => createPostResulttSchema,
    );

    try {
      postService.findGroupUserId = jest.fn(
        () => validationErrorByDuplicatedIdSchema,
      );
      await postService.createPost(createPostInsertSchema);
    } catch (error) {
      expect(postService.findGroupUserId).toHaveBeenCalledWith({});

      expect(error).toBeInstanceOf(validationError);
      expect(error.message).toEqual('잘못된 요청입니다.');
    }
  });
});
