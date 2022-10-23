import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer from "gulp-newer";
import ifPugins from "gulp-if";

//експортируем объекты
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPugins,
};