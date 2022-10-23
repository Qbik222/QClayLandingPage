export const copy = () => {
    return global.app.gulp.src(global.app.path.src.files)
    .pipe(global.app.gulp.dest(global.app.path.build.files));
};