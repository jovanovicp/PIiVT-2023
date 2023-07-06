import * as mysql2 from "mysql2/promise";
import RepertoireService from "../components/repertoire/RepertoireService.service";
import MovieService from "../components/movie/MovieService.service";
import AdministratorService from "../components/administrator/AdministratorService.service";
import ProjectionTimeService from "../components/projection/ProjectionTimeService.service";

export interface IServices {
    repertoire: RepertoireService;
    movie: MovieService;
    administrator: AdministratorService;
    projectionTime: ProjectionTimeService;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}