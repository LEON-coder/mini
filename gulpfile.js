'use strict';
const gulp = require('gulp');
const { src, dest, parallel } = require('gulp');
const browserSync = require('browser-sync').create(); // подключаем browser sync
const sass = require('gulp-sass');
const watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const fileinclude = require('gulp-file-include');
const concatCSS = require('gulp-concat-css');
const projectConfig = require('./projectConfig.json');
const path = projectConfig.path;
const cleanCSS = require('gulp-clean-css');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const del = require('del');
const imagemin = require('gulp-imagemin');


function clear() {
    return del("./app/html");
};


function html() {
    return gulp.src(['src/assets/includes/*.html'])
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileinclude())
        .pipe(dest("app/html"))
        .pipe(browserSync.stream());
};




function pug_convert() {
    return gulp.src('src/assets/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "PUG",
                message: error.message
            }))
        }))
        .pipe(dest('app/'))
        .pipe(browserSync.stream());
};


function img() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest('app/images'))
        .pipe(browserSync.stream());
};

function concat() {
    return src('./src/assets/*css')
        .pipe(concatCSS())
        .pipe(gulp.dest('app/css'));
};





function compiling() {
    return src('src/assets/sсss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(concatCSS())
        .pipe(autoprefixer('last 10 versions'))
        .pipe(sourcemaps.write('app/css/styles.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function liveServer() {
    browserSync.init({
        server: { baseDir: 'app/' }, // Указываем папку сервера
        notify: false // уведомления (false - отключение) 
    });
}

function watcher() {
    gulp.watch('src/assets/sсss/*scss', compiling);
    gulp.watch('src/assets/css/**/*.css', liveServer);
    gulp.watch('src/assets/**/*.pug', pug_convert);
    gulp.watch('app/*.html', html);
    gulp.watch('src/img/*', img);
}




exports.watcher = watcher;
exports.compiling = compiling;
exports.browserSync = liveServer;
exports.concatCSS = concat;
exports.html = html;
exports.clear = clear;
exports.pug_convert = pug_convert;
exports.img = img;



exports.default = gulp.series(clear, gulp.parallel(liveServer, watcher));