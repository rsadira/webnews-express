const CommentService = require("../services/comment.service");

const commentService = new CommentService();

class CommentController {
  async storeComment(req, res) {
    try {
      const comment = await commentService.store(req.body);
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal menyimpan komentar." });
    }
  }
  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;

      // Use your CommentService to delete the comment by ID
      const deletedComment = await commentService.deleteComment(commentId);

      res.status(200).json(deletedComment);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CommentController;
