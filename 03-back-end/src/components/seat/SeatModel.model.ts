import IModel from "../../common/IModel.interface";

export default class SeatModel implements IModel{
    seatId: number;
    available: boolean;

    hallId: number;
}