import IConfig from "./common/IConfig.interface";
import AdministratorRouter from "./components/administrator/AdministratorRouter.router";
import RepertoireRouter from "./components/repertoire/RepertoireRouter.router";

const DevConfig: IConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24,
            path: "./static",
            route: "/assets"
        },
    },
    logging: {
        path: "./logs",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\res[content-length] bytes\t:response-time ms",
        filename: "access.log",
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "aplikacija",
        password: "aplikacija",
        database: "piivt_app",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: true,
    },
    routers: [
        new RepertoireRouter(),
        new AdministratorRouter(),
    ]
};

export { DevConfig };