import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

/**
 * @class AuthRouter
 */
export default class AuthRouter {
  public router: Router;
  private authController: AuthController = new AuthController();
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post("/login", this.authController.login);
    this.router.post("/signup", this.authController.signUp);
  }
}
