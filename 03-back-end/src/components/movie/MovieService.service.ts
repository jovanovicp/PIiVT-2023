import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import MovieModel from "./MovieModel.model";
import IAddMovie from "./dto/IAddMovie.dto";
import IEditMovie from "./dto/IEditMovie.dto";

class MovieAdapterOptions implements IAdapterOptions {

}

class MovieService extends BaseService<MovieModel, MovieAdapterOptions> {
    tableName() {
        return "movie";
    }

    protected async adaptToModel(data: any): Promise<MovieModel> {
        const movie: MovieModel = new MovieModel();

        movie.movieId = +data?.movie_id;
        movie.name = data?.name;
        movie.description = data?.description;
        movie.repertoireId = data?.repertoireId;

        return movie;
    }

    
    public async getAllByRepertoireId(repertoireId: number, options: MovieAdapterOptions): Promise<MovieModel[]> {
        return this.getAllByFieldNameAnValue('repertoire_id', repertoireId, options);
     }

     public async add(data: IAddMovie): Promise<MovieModel> {
        return this.baseAdd(data, {});
    }

    public async editById(movieId: number, data:IEditMovie): Promise<MovieModel> {
        return this.baseEditById(movieId, data, {});
    }

    public async deleteById(movieId: number): Promise<true> {
        return this.baseDeleteById(movieId);
    }
}

export default MovieService;