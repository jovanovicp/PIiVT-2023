import BaseController from "../../common/BaseController";
import IAddProjectionTime, { AddProjectionTimeValidator, IAddProjectionTimeDto } from "../projection/dto/IAddProjectionTime.dto";
import { Request, Response } from "express";

class MovieController extends BaseController{


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
                    date: data.date_time,   
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

export default MovieController;