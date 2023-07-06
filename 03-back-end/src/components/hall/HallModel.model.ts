import IModel from "../../common/IModel.interface";
import SeatModel from "../seat/SeatModel.model";

export default class HallModel implements IModel {
    hallId: number;
    name: string;

    //FK
    projectionTimeId: number;
    movieId: number;

    seat: SeatModel[];
}