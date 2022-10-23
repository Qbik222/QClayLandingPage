import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    //ищем файлы шрифтов .otf
    return global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
        }))
        )
    //конвертируем в .ttf
    .pipe(fonter({
        formats: ["ttf"] }))
    //выгружаем в исходную папку
        .pipe(global.app.gulp.dest(`${global.app.path.srcFolder}/fonts/`));
};


export const ttfToWoff = () => {
    return global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(fonter({
        formats: ["woff"] }))
    .pipe(global.app.gulp.dest(`${global.app.path.build.fonts}`))
    .pipe(global.app.gulp.src(`${global.app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(global.app.gulp.dest(`${global.app.path.build.fonts}`));
};

export const fontStyle = () => {
    //Файл стилей подключения шрифтов
    let fontsFile = `${global.app.path.srcFolder}/scss/fonts.scss`;
    //Проверяем, существуют ли файлы шрифтов
    fs.readdir(`${global.app.path.build.fonts}`, function(err, fontsFiles){
        if(fontsFiles) {
            //Проверяем, существует ли файл стилей для подключения шрифтов
            if(!fs.existsSync(fontsFile)) {
                //Если файла нет, создаём его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                //Если файл есть, выводим сообщение
                console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
            }
        }
    });
    return global.app.gulp.src(`${global.app.path.srcFolder}`);
    function cb() { }

};

