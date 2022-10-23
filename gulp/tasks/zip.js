import {deleteAsync} from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
    deleteAsync(`./${global.app.path.rootFolder}.zip`);
    return global.app.gulp.src(`${global.app.path.buildFolder}/**/*.*`, {})
    .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "ZIP",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(zipPlugin(`${global.app.path.rootFolder}.zip`))
    .pipe(global.app.gulp.dest("./"));

};