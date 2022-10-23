import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(global.app.plugins.plumber(
            global.app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
            )
        .pipe(fileInclude())
        // .pipe(global.app.plugins.replace(/img\//g,'../img/'))
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            webpHtmlNosvg(),
                )
            )
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            versionNumber({
                "value": "%DT%",
                "append": {
                    "key": "_v",
                    "cover": 0,
                    "to": [
                        "css",
                        "js",
                    ]
                },
                "output":{
                    "file": "gulp/version.json"
                }
            }))
            )
        .pipe(global.app.gulp.dest(global.app.path.build.html))
        .pipe(global.app.plugins.browserSync.stream());
};