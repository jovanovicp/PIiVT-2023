import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddProjectionTimeDto {
    date_time: string;
}

export default interface IAddProjectionTime extends IServiceData {
    date: string;
    movie_id: number;
}


const AddProjectionTimeValidator = ajv.compile ({
    type: "object",
    properties: {
        date: {
            type: "string",
        },
    },
    required: [
        "date",
    ],
    additionalProperties: false,
});

export { AddProjectionTimeValidator };