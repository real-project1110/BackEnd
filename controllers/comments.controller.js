const CommentService = require('../services/comments.service');
const InvalidParamsError = require('../exceptions/index.exception');

class CommentController {
  commentService = new CommentService();
}
module.exports = CommentController;
