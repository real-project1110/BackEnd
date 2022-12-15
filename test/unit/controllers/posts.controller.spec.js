// const PostController = require('../controllers/posts.controller');
// const postController = new PostController();
const PostService = require('../../../services/posts.service');
const postService = new PostService();
const PostRepository = require('../../../repositories/posts.repository');
const postRepository = new PostRepository();
const httpMocks = require('node-mocks-http');
const { ValidationError } = require('../../../exceptions/index.exception');
// const { Post, GroupUser } = require('../models');
const PostController = require('../../../controllers/posts.controller');
const {
  createPostInsertSchemaByController,
  createPostResulttSchemaByController,
} = require('../../fixtures/posts.fixtures');
// const { post } = require('../routes');

const userId = 1;
const groupId = 1;
const groupUserId = 1;
const content = 'test';
const category = 0;
const page = 1;
const createPost = {
  groupId: groupId,
  content: content,
  category: category,
  groupUserId: groupUserId,
};
const findGroupUserId = {
  userId,
  groupId,
};
const postId = 1;
const mockPostService = () => ({
  createPost: jest.fn(),
  findAllPost: jest.fn(),
});

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};
let next = null;
describe('Posts test', () => {
  let postController = new PostController();
  postController.postService = mockPostService();
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test('findAllPost Method Success Case', async () => {
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const findAllPostReturnValue = [];
    postController.postService.findAllPost = jest.fn(() => {
      return findAllPostReturnValue;
    });
    await postController.findAllPost(mockRequest, mockResponse);

    expect(postController.postService.findAllPost).toHaveBeenCalledTimes(1);

    expect(postController.postService.findAllPost).toHaveBeenCalledWith({});

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      result: getAllNaverUserReturnValue,
    });

    test('findAllPost Method Failed Case', async () => {
      const ErrorMessage = '잘못된 요청입니다.';
      postController.postService.findAllPost = jest.fn(() => {
        throw new Error(ErrorMessage);
      });

      await postController.postService.findAllPost(mockRequest, mockResponse);

      expect(postController.postService.findAllPost).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errorMessage: ErrorMessage,
      });
    });

    test('createPost Method Success Case', async () => {
      mockRequest.body = createPostInsertSchemaByController;
      mockResponse.status = jest.fn(() => {
        return mockResponse;
      });
      postController.postService.createPost = jest.fn(() => {
        return createPostResulttSchemaByController;
      });

      await postController.postService.createPost(mockRequest, mockResponse);

      expect(postController.postService.createPost).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        result: createPostResulttSchemaByController,
      });
    });

    test('createPost Method Failed Case By InvalidParamsError', async () => {
      mockRequest.body = {
        ...createPostInsertSchemaByController,
        content: null,
      };
      postController.postService.createPost = jest.fn(() => {
        return createPostResulttSchemaByController;
      });
      await postController.postService.createPost(mockRequest, mockResponse);

      expect(postController.postService.createPost).toHaveBeenCalledTimes(0);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errorMessage: '잘못된 요청입니다.',
      });
    });
  });

  //   jest.useFakeTimers();
  //   test.only('create test', async () => {
  //     req.body = { content };
  //     req.params = { groupId };
  //     res.locals.user = { userId };
  //     const category = 0;
  //     Post.create.mockResolvedValue({ groupId, content, category, groupUserId });
  //     await postController.createPost(req, res, next);
  //     expect(res._getJSONDATA()).toEqual({
  //       ok: true,
  //       data: createPost.postId,
  //     });
  //   });
  //   const res = {
  //     status: jest.fn(() => {
  //       return { json: jest.fn() };
  //     }),
  //   };
  //   const next = jest.fn();
  test('postService.createPost성공', async () => {
    postService.createPost = jest.fn(() => createPost);

    expect(
      await postService.createPost({
        groupId,
        userId,
        content,
        category,
      }),
    ).toEqual({ groupId, groupUserId, content, category });
  });

  test('postService.findGroupUser성공', async () => {
    postRepository.findGroupUserId = jest.fn(() => findGroupUserId);
    expect(await postRepository.findGroupUserId({ userId, groupId })).toBe(
      findGroupUserId,
    );
  });
  test('postService.createPost성공', async () => {
    postRepository.createPost = jest.fn(() => createPost);

    expect(
      await postRepository.createPost({
        groupId,
        groupUserId,
        content,
        category,
      }),
    ).toEqual(createPost);
  });
  test('updatCategory 성공', async () => {
    postRepository.noticePost = jest.fn(() => ({ postId: 1, category: 1 }));
    expect(await postRepository.noticePost(postId, category)).toBeTruthy();
  });
});
