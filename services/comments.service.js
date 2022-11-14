const CommentRepository = require('../repositories/comments.repository');
const ValidationError = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository();
}
module.exports = CommentService;
