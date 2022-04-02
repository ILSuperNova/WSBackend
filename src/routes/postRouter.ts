import { Router } from "express";
import { PostController } from "../controllers/PostController";

/**
 * @class AuthRouter
 */
export default class PostRouter {
  public router: Router;
  private postController: PostController = new PostController();
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post("/", this.postController.createPost);
    this.router.get("/feed", this.postController.getFeed);
  }
}
