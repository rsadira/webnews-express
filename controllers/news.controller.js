const NewsService = require("../services/news.service");
const newsService = new NewsService();

class NewsController {
  async pageCreateNews(req, res) {
    res.render("news/news-create", {
      pageTitle: "Crete NEws",
      layout: "layouts/layouts",
    });
  }

  // async updateNews(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const updateData = req.body; // Updated news data

  //     // Call the service method to update the news by ID
  //     const updatedNews = await newsService.updateNews(id, updateData);

  //     res.redirect("/"); // Redirect to the homepage or another appropriate page
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  async renderUpdateNewsForm(req, res) {
    try {
      const id = req.params.id;

      const existingNews = await newsService.getNews(id);

      res.render("news/news-update", {
        pageTitle: "Update News",
        existingNews,
        layout: "layouts/layouts",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = NewsController;
