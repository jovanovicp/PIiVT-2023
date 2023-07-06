import BaseController from "../../common/BaseController";
import IAddProjectionTime from "./dto/IAddProjectionTime.dto";
import IAddProjectionTimeDto, { AddProjectionTimeValidator } from "./dto/IAddProjectionTime.dto";
import { Request, Response } from "express";

class ProjectionTimeController extends BaseController {

    async add(req: Request, res: Response) {
        const data = req.body as IAddProjectionTime;

        if (!AddProjectionTimeValidator(data)) {
            return res.status(400).send(AddProjectionTimeValidator.errors);
        }

        this.services.projectionTime.add(data)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }


    async addProjectionTime(req: Request, res: Response) {
        const movieId: number = +req.params?.cid;
        const data = req.body as IAddProjectionTimeDto;

        if (!AddProjectionTimeValidator(data)) {
            return res.status(400).send(AddProjectionTimeValidator.errors);
        }

        this.services.repertoire.getById(movieId, {
            loadMovies: false
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.projectionTime.add({
                    date: data.date,   
                    movie_id: movieId
                })
                .then(result => {
                    res.send(result);
                })

            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

}

export default ProjectionTimeController;