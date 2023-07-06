import IModel from "../../common/IModel.interface";

export default class ProjectionTimeModel implements IModel {
    projectionTimeId: number;
    dateTime: string;

    //FK
    movieId: number;
}