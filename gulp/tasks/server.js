export const server = (done) =>{
    global.app.plugins.browserSync.init({
        server: {
            baseDir: `${global.app.path.build.html}`
        },
        notify: false,
        port: 3000,
    });
};