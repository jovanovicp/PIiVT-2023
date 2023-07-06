import IModel from "../../common/IModel.interface";
import HallModel from "../hall/HallModel.model";
import ProjectionTimeModel from "../projection/ProjectionTimeModel.model";

export default class MovieModel implements IModel {
    movieId: number;
    name: string;
    description: string;

    //FK
    repertoireId: number;

    hall: HallModel[];
    projectionTime: ProjectionTimeModel[];
}