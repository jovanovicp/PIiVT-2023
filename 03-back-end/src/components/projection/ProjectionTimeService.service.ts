import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import ProjectionTimeModel from "./ProjectionTimeModel.model";
import IAddProjectionTime from "./dto/IAddProjectionTime.dto";

class ProjectionTimeAdapterOptions implements IAdapterOptions {

}

export default class ProjectionTimeService extends BaseService<ProjectionTimeModel, ProjectionTimeAdapterOptions> {
    tableName() {
        return "projectionTime";
    }

    protected async adaptToModel(data: any, options: ProjectionTimeAdapterOptions = {}): Promise<ProjectionTimeModel> {
        const projectionTime = new ProjectionTimeModel();

        projectionTime.projectionTimeId = +data?.projectionTime_id;
        projectionTime.dateTime = data?.dateTime;
        projectionTime.movieId = data?.movieId;

        return projectionTime;
    }

    
    public async getAllByMovieId(movieId: number, options: ProjectionTimeAdapterOptions): Promise<ProjectionTimeModel[]> {
        return this.getAllByFieldNameAnValue('movie_id', movieId, options);
     }

     public async add(data: IAddProjectionTime): Promise<ProjectionTimeModel> {
        return this.baseAdd(data, {});
    }
}