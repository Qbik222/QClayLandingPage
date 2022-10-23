import svgSprite from "gulp-svg-sprite";


export const svgSprive = () => {
return global.app.gulp.src(global.app.path.src.svgic)
    .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>"
        }))
        )


    .pipe(svgSprite({
        mode: {
            stack:{
                sprite: `../icons/icons.svg`,
                //создавать страницу с перечнем иконок
                example: true,
            }
        },
    }))
    .pipe(global.app.gulp.dest(`${global.app.path.build.images}`));

};