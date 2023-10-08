const { news, sequelize, comments } = require("../models");
const { QueryTypes } = require("sequelize");

class NewsService {
  constructor() {
    this.newsModel = news;
  }

  async getNews(id) {
    let data;
    if (id) {
      console.log(id);
      data = await this.newsModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: comments,
          },
        ],
      });
    } else {
      data = await this.newsModel.findAll();
    }

    return data;
  }

  async getNewsWithRawQuery() {
    const data = await sequelize.query("SELECT * FROM news", {
      type: QueryTypes.SELECT,
    });
    return data;
  }

  async store(payload) {
    const date = new Date();
    const { title, cover, content, author, isPublic } = payload;

    const news = this.newsModel.create({
      title,
      cover,
      content,
      author,
      createdAt: date,
      updatedAt: date,
      isPublic,
    });

    return news;
  }

  async updateNews(newsId, updatedData) {
    // Assuming `newsModel` is your Sequelize model for news articles
    const existingNews = await this.newsModel.findByPk(newsId);

    if (!existingNews) {
      throw new Error("News article not found");
    }

    // Update the existing news article with the new data
    await existingNews.update(updatedData);

    return existingNews;
  }
}

module.exports = NewsService;
