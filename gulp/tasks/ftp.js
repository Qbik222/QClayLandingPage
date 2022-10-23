import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import  util from "gulp-util";

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);
    return global.app.src(`${global.app.path.buildFolder}/**/*.*`, {})
    .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "FTP",
            message: "Error: <%= error.message %>"
        }))
        )
    .pipe(ftpConnect.dest(`/${global.app.path.ftp}/${global.app.path.rootFolder}`));
}