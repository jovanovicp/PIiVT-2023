import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IEditRepertoire extends IServiceData{
    name: string;
}

interface IEditRepertoireDto {
    name: string;
}

const EditRepertoireValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 32,
        },
    },
    required: [
        "name",
    ],
    additionalProperties: false,
});


export { EditRepertoireValidator, IEditRepertoireDto };

