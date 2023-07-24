const ArticlesService = require('../services/article.service');
const CustomError = require('../middlewares/errorMiddleware');
const { articleSchema } = require('../middlewares/validationMiddleware');

class ArticlesController {
  articlesService = new ArticlesService();

  createArticle = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, coverImage, residence, area, budget, content, tags } =
        req.body;

      const createArticle = await this.articlesService.createArticle(
        userId,
        title,
        coverImage,
        residence,
        area,
        budget,
        content,
        tags
      );

      res
        .status(201)
        .json({ success: true, message: 'Article 작성에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  findArticle = async (req, res, next) => {
    try {
      const { articleId } = req.params;
      const findArticle = await this.articlesService.findArticle(articleId);
      res.status(200).json({ findArticle });
    } catch (error) {
      next(error);
    }
  };

  findAllArticle = async (req, res, next) => {
    try {
      const queryObject = req.query;
      console.log(queryObject);
      const allArticle = await this.articlesService.findAllArticle(queryObject);

      res.status(200).json({ articleList: allArticle });
    } catch (error) {
      next(error);
    }
  };

  // item 검색
  findArticleItem = async (req, res, next) => {
    try {
      const itemName = req.body;
      const articleItem = await this.itemsService.findArticleItem(itemName);
      res.status(200).json({ list: articleItem });
    } catch (error) {
      next(error);
    }
  };

  updateArticle = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { articleId } = req.params;
      const { title, coverImage, residence, area, budget, content, tags } =
        req.body;

      const { error } = articleSchema.validate({ title, coverImage, content });
      if (error) throw new CustomError(error.details[0].message, 412);

      const updateArticle = await this.articlesService.updateArticle(
        articleId,
        userId,
        title,
        coverImage,
        residence,
        area,
        budget,
        content,
        tags
      );

      res
        .status(201)
        .json({ success: true, message: 'Article 수정에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  deleteArticle = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { articleId } = req.params;

      const deleteArticle = await this.articlesService.deleteArticle(
        articleId,
        userId
      );
      res
        .status(201)
        .json({ success: true, message: 'Article 삭제에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  createContentImage = async (req, res, next) => {
    try {
      const url = req.file.location;

      res.status(200).json({ url });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ArticlesController;
