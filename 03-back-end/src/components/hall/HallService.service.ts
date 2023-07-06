import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import HallModel from "./HallModel.model";

class HallAdapterOptions implements IAdapterOptions {

}

export default class HallService extends BaseService<HallModel, HallAdapterOptions> {
    tableName() {
        return "hall";
    }

    protected async adaptToModel(data: any, options: HallAdapterOptions = {}): Promise<HallModel> {
        const hall = new HallModel();

        hall.hallId = +data?.hall_id;
        hall.name = data?.name;
        hall.projectionTimeId = data?.projectionTimeId;
        hall.movieId = data?.movieId;

        return hall;
    }
}