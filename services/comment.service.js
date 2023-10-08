const { comments } = require("../models");

class CommentService {
  constructor() {
    this.commentModel = comments;
  }

  async store(payloady) {
    const { name, comment, news_id } = payloady;
    const date = new Date();

    const commentNew = this.commentModel.create({
      name,
      comment,
      news_id,
      createdAt: date,
      updatedAt: date,
    });

    return commentNew;
  }

  async deleteComment(commentId) {
    // Assuming `commentModel` is your Sequelize model for comments
    const commentToDelete = await this.commentModel.findByPk(commentId);

    if (!commentToDelete) {
      throw new Error("Comment not found");
    }

    // Delete the comment
    await commentToDelete.destroy();

    return commentToDelete;
  }
}
module.exports = CommentService;
