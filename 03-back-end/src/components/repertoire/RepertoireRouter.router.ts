import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import RepertoireController from "./RepertoireController.controller";
import * as express from "express";

class RepertoireRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const repertoireController: RepertoireController = new RepertoireController(resources.services);

        application.get("/api/repertoire",                     repertoireController.getAll.bind(repertoireController));
        application.get("/api/repertoire/:id",                 repertoireController.getById.bind(repertoireController));
        application.post("/api/repertoire",                    repertoireController.add.bind(repertoireController));
        application.put("/api/repertoire/:cid",                repertoireController.edit.bind(repertoireController));
        application.post("/api/repertoire/:cid/movie",         repertoireController.addMovie.bind(repertoireController));
        application.put("/api/repertoire/:cid/movie/:iid",     repertoireController.editMovie.bind(repertoireController));
        application.delete("/api/repertoire/:cid/movie/:iid",  repertoireController.deleteMovie.bind(repertoireController));
        application.post("/api/repertoire/:cid/movie/:iid/projectionTime",         repertoireController.addProjectionTime.bind(repertoireController));

    }
}

export default RepertoireRouter;