import { Request, Response } from "express";
import { DefaultRepertoireAdapterOptions } from "./RepertoireService.service";
import { AddRepertoireValidator } from "./dto/IAddRepertoire.dto";
import IAddRepertoire from './dto/IAddRepertoire.dto';
import { AddMovieValidator, IAddMovieDto } from "../movie/dto/IAddMovie.dto";
import { EditRepertoireValidator, IEditRepertoireDto } from "./dto/IEditRepertoire.dto";
import IEditMovieDto, { EditMovieValidator } from "../movie/dto/IEditMovie.dto";
import BaseController from "../../common/BaseController";
import IAddProjectionTimeDto, { AddProjectionTimeValidator } from "../projection/dto/IAddProjectionTime.dto";

class RepertoireController extends BaseController {

    async getAll(req: Request, res: Response) {
        this.services.repertoire.getAll(DefaultRepertoireAdapterOptions)
         .then(result => {
             res.send(result);
            })
         .catch(error => {
             res.status(500).send(error?.message);
            });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.repertoire.getById(id, {
            loadMovies: true
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddRepertoire;

        if (!AddRepertoireValidator(data)) {
            return res.status(400).send(AddRepertoireValidator.errors);
        }

        this.services.repertoire.add(data)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.cid;
        const data = req.body as IEditRepertoireDto;

        if (!EditRepertoireValidator(data)) {
            return res.status(400).send(EditRepertoireValidator.errors);
        }

        this.services.repertoire.getById(id, { loadMovies: false })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.repertoire.editById(
                    id,
                    {
                    name: data.name
                    },
                    {
                        loadMovies: true,
                    }
                    )
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    res.status(400).send(error?.message);
                })
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async addMovie(req: Request, res: Response) {
        const repertoireId: number = +req.params?.cid;
        const data = req.body as IAddMovieDto;

        if (!AddMovieValidator(data)) {
            return res.status(400).send(AddMovieValidator.errors);
        }

        this.services.repertoire.getById(repertoireId, {
            loadMovies: false
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.movie.add({
                    name: data.name,
                    description: data.description,    
                    repertoire_id: repertoireId
                })
                .then(result => {
                    res.send(result);
                })

            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    // PUT {{API_URL}}/api/repertoire/:cid/movie/:iid
    async editMovie(req: Request, res: Response) {
        const repertoireId: number = +req.params?.cid;
        const movieId: number = +req.params?.iid;
        const data: IEditMovieDto = req.body as IEditMovieDto;

        
        if (!EditMovieValidator(data)) {
            return res.status(400).send(EditMovieValidator.errors);
        }

        this.services.repertoire.getById(repertoireId, {
            loadMovies: false
        })
            .then(result => {
                if (result === null) {
                    return res.status(404).send('Repertoire not found!');
                }

                this.services.movie.getById(movieId, {})
                .then(result => {
                    if (result === null) {
                        return res.status(404).send('Movie not found!');
                    }

                    if (result.repertoireId !== repertoireId) {
                        return res.status(404).send('This movie does not belong to this repertoire!');
                    }

                    this.services.movie.editById(movieId, data)
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(500).send(error?.message);
                    });
                });

            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async deleteMovie(req: Request, res: Response) {
        const repertoireId: number = +req.params?.cid;
        const movieId: number = +req.params?.iid;

        this.services.repertoire.getById(repertoireId, { loadMovies: false })
            .then(result => {
                if (result === null) {
                    return res.status(404).send('Repertoire not found!');
                }

                this.services.movie.getById(movieId, {})
                .then(result => {
                    if (result === null) {
                        return res.status(404).send('Movie not found!');
                    }

                    if (result.repertoireId !== repertoireId) {
                        return res.status(400).send('This movie does not belong to this repertoire!');
                    }

                    this.services.movie.deleteById(movieId)
                    .then(result => {
                        res.send('This movie has been deleted!');
                    })
                    .catch(error => {
                        res.status(406).send('Could not delete this movie due to an integrity constraint check.');
                    })
                })
                .catch(error => {
                    res.status(500).send(error?.message);
                });

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


export default RepertoireController;