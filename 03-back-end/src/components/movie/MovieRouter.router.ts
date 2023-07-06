import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import MovieController from "./MovieController.controller";
import * as express from "express";

class MovieRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const administratorController: MovieController = new MovieController(resources.services);
        application.post("/api/repertoire/:cid/movie/projectiontime",        movieController.addProjectionTime.bind(movieController));
    }
}

export default MovieRouter;