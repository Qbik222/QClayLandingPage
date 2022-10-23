import webp from "gulp-webp";
import imagemin from "gulp-imagemin";



export const images = () =>{
    return global.app.gulp.src(global.app.path.src.images, {sourcemaps: true})
        .pipe(global.app.plugins.plumber(
            global.app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(global.app.plugins.newer(global.app.path.build.images))
        .pipe(global.app.plugins.if(
                global.app.isBuild,
                 webp()))
        .pipe(global.app.plugins.if(
                 global.app.isBuild,
                  global.app.gulp.dest(global.app.path.build.images)))
        .pipe(global.app.plugins.if(
                 global.app.isBuild,
                 global.app.gulp.src(global.app.path.src.images)))
        .pipe(global.app.plugins.if(
                global.app.isBuild,
                global.app.plugins.newer(global.app.path.build.images)))
        .pipe(global.app.plugins.if(
          global.app.isBuild,
          imagemin(
          {
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, //0 to 7
          }  
        )))
        .pipe(global.app.gulp.dest(global.app.path.build.images))
        .pipe(global.app.gulp.src(global.app.path.src.svg))
        .pipe(global.app.gulp.dest(global.app.path.build.images))
        .pipe(global.app.plugins.browserSync.stream());
};