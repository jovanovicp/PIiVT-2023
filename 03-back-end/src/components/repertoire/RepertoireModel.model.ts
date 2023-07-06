import IModel from "../../common/IModel.interface";
import MovieModel from "../movie/MovieModel.model";

export default class RepertoireModel implements IModel {
    repertoireId: number;
    name: string;

    movies?: MovieModel[]; 
}