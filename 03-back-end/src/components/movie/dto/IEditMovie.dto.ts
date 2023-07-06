import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditMovieDto {
    name: string;
    description: string;
}

export default interface IEditMovie extends IServiceData {
    description: string;
    name: string;
    repertoire_id: number;
}


const EditMovieValidator = ajv.compile ({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 128,
        },
        description: {
            type: "string",
        },
    },
    required: [
        "name", "description",
    ],
    additionalProperties: false,
});

export { EditMovieValidator };