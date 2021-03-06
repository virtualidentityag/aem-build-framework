const config = require('./../config');
const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const hb = require('gulp-hb');

module.exports = {
    hbTask: (targetDirectory, isProduction) => {
        const hbStream = hb({ debug: false })
            .partials(path.join(config.cwd, 'src/layouts/*.hbs'))
            .partials(path.join(config.cwd, 'src/components/*/partials/**/*.hbs'));

        if(isProduction) {
            hbStream.data({ isProduction: true });
        }

        const stream = gulp
            .src(config.srcDir + '/components/*/variations/**/index.hbs')
            .pipe(hbStream)
            .on('error', notify.onError(function (error) {
                return {
                    title: 'hb',
                    message: error.message
                };
            }))
            .pipe(rename({extname: ".html"}))
            .pipe(rename((currentPath) => {
                currentPath.dirname = currentPath.dirname.replace(path.sep + 'variations', '');
            }));

            if(isProduction) {
                stream.pipe(replace('"./', '"./application_root/../')).pipe(replace('[./', '[./application_root/../'));
                stream.pipe(replace('\'./', '\'./application_root/../')).pipe(replace('[./', '[./application_root/../'));
            }

        return stream.pipe(gulp.dest(targetDirectory));
    }
};
