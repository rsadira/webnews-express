const NewsService = require("../services/news.service");

const newsService = new NewsService();
class HomeController {
  async indexHome(req, res) {
    try {
      const newsData = await newsService.getNews(null);
      res.render("home", {
        pageTitle: "HOME | Berita Terkini",
        layout: "layouts/layouts",
        news: newsData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async newsDetail(req, res) {
    try {
      const id = req.params.id;
      const newsData = await newsService.getNews(id);
      res.render("home", {
        news: newsData,
        pageTitle: newsData.title,
        layout: "layouts/layouts",
      });
    } catch (error) {
      console.log(error);
    }
  }

  indexFeedback(req, res) {
    res.render("feedback", {
      pageTitle: "About",
      layout: "layouts/layouts",
    });
  }

  async getNews(req, res) {
    const data = await newsService.getNewsWithRawQuery();
    res.status(200).json(data);
  }

  async getNewsById(req, res) {
    const id = req.params.id;
    const data = await newsService.getNews(id);
    res.status(200).json(data);
  }

  async storeNews(req, res) {
    const payload = req.body;

    console.log(payload);

    const store = await newsService.store(payload);

    res.status(201).json(store);
  }

  async updateNews(req, res) {
    try {
      const id = req.params.id;
      const updateData = req.body; // Updated news data

      // Call the service method to update the news by ID
      const updatedNews = await newsService.updateNews(id, updateData);

      res.redirect("/"); // Redirect to the homepage or another appropriate page
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = HomeController;
