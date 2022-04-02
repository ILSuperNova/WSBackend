import { Router } from "express";
import { CommunityController } from "../controllers/CommunityController";

/**
 * @class AuthRouter
 */
export default class CommunityRouter {
  public router: Router;
  private postController: CommunityController = new CommunityController();
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post("/", this.postController.createCommunity);
  }
}
