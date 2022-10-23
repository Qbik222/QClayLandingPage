import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";




const sass = gulpSass(dartSass);


export const scss = () => {
    return global.app.gulp.src(global.app.path.src.scss, { sourcemaps: global.app.isDev })
        .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        }))
        )
        // .pipe(global.app.plugins.replace(/img\//g,'../img/'))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            groupCssMediaQueries()))
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            webpcss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        )))
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            autoprefixer(
            {
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true,
            }
        )))
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(global.app.plugins.if(
            global.app.isBuild,
            cleanCss()))
        .pipe(
            rename({
            extname: ".min.css"
        }))
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(global.app.plugins.browserSync.stream());
};