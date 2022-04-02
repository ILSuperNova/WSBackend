import { Application, Request, Response } from "express";
import AuthRouter from "./authRouter";
import PostRouter from "./postRouter";
import { AuthMiddleware } from "./middleware/authMiddleware";
import CommunityRouter from "./communityRouter";

export class Routes {
  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!",
      });
    });
    app.use("/api/v1/auth", new AuthRouter().router);
    app.use("/api/v1/post", AuthMiddleware, new PostRouter().router);
    app.use("/api/v1/community", AuthMiddleware, new CommunityRouter().router);
  }
}
