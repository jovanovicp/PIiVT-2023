import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import SeatModel from "./SeatModel.model";

class SeatAdapterOptions implements IAdapterOptions {

}

export default class SeatService extends BaseService<SeatModel, SeatAdapterOptions> {
    tableName() {
        return "seat";
    }

    protected async adaptToModel(data: any, options: SeatAdapterOptions = {}): Promise<SeatModel> {
        const seat = new SeatModel();

        seat.seatId = +data?.seat_id;
        seat.available = +data?.available === 1;
        seat.hallId = data?.hallId;

        return seat;
    }
}