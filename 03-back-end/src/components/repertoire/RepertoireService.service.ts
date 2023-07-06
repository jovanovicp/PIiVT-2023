import IAdapterOptions from "../../common/IAdapterOptions.interface";
import MovieService from "../movie/MovieService.service";
import RepertoireModel from "./RepertoireModel.model";
import IAddRepertoire from "./dto/IAddRepertoire.dto";
import BaseService from "../../common/BaseService";
import IEditRepertoire from "./dto/IEditRepertoire.dto";

interface IRepertoireAdapterOptions extends IAdapterOptions {
    loadMovies: boolean;
}

const DefaultRepertoireAdapterOptions: IRepertoireAdapterOptions = {
    loadMovies: false,
}

class RepertoireService extends BaseService<RepertoireModel, IRepertoireAdapterOptions> {
    tableName() {
        return "repertoire";
    }

    protected async adaptToModel(data: any, options: IRepertoireAdapterOptions = DefaultRepertoireAdapterOptions): Promise<RepertoireModel> {
        const repertoire: RepertoireModel = new RepertoireModel();

        repertoire.repertoireId = +data?.repertoire_id;
        repertoire.name = data?.name;

        if (options.loadMovies) {
            const movieService: MovieService = new MovieService(this.db);

            repertoire.movies = await movieService.getAllByRepertoireId(repertoire.repertoireId, {});
        }

        return repertoire;
    }
    
    public async add(data: IAddRepertoire): Promise<RepertoireModel> {
        return this.baseAdd(data, DefaultRepertoireAdapterOptions);
    }

    public async editById(repertoireId: number, data: IEditRepertoire, options: IRepertoireAdapterOptions = DefaultRepertoireAdapterOptions): Promise<RepertoireModel> {
        return this.baseEditById(repertoireId, data, options);
    }
}

export default RepertoireService;
export { DefaultRepertoireAdapterOptions };