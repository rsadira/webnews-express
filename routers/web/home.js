const express = require("express");
const HomeController = require("../../controllers/home.controller");
const NewsController = require("../../controllers/news.controller");
const homeRouter = express.Router();

const homeController = new HomeController();
const newsController = new NewsController();

homeRouter.get("/", homeController.indexHome);
homeRouter.get("/news/:id", homeController.newsDetail);
homeRouter.get("/feedback", homeController.indexFeedback);

// Page News Create
homeRouter.get("/news-create", newsController.pageCreateNews);
homeRouter.get("/news/:id/edit", newsController.renderUpdateNewsForm);

// homeRouter.post("/update-news/:id", newsController.updateNews);

module.exports = homeRouter;
