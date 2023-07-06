import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./configs";
import * as fs from "fs";
import * as morgan from "morgan";
import IApplicationResources from "./common/IApplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import RepertoireService from "./components/repertoire/RepertoireService.service";
import MovieService from "./components/movie/MovieService.service";
import AdministratorService from "./components/administrator/AdministratorService.service";
import ProjectionTimeService from "./components/projection/ProjectionTimeService.service";

async function main() {
    const config: IConfig = DevConfig;

fs.mkdirSync(config.logging.path, {
    mode: 0o755,
    recursive: true,
});

const db = await mysql2.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    charset: config.database.charset,
    timezone: config.database.timezone,
    supportBigNumbers: config.database.supportBigNumbers,
})

const applicationResources: IApplicationResources = {
    databaseConnection: db,
    services: {
        repertoire: new RepertoireService(db),
        movie: new MovieService(db),
        administrator: new AdministratorService(db),
        projectionTime: new ProjectionTimeService(db)
    }
};

const application: express.Application = express();

application.use(morgan(config.logging.format, {
    stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, { flags: 'a' }),
}));

application.use(cors());
application.use(express.json());

application.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
}));

for (const router of config.routers) {
    router.setupRoutes(application, applicationResources);
}

application.use( (req, res) => {
    res.sendStatus(404);
});

application.listen(config.server.port);


}

process.on('uncaughtException', error => {
    console.error('ERROR:', error);
});

main();