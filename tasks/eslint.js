const gulp = require('gulp');
const cached = require('gulp-cached');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');

const eslintTask = (strict) => {
    const stream = gulp.src(config.srcDir + '/components/**/*.js')
        .pipe(cached('eslint'))
        .pipe(eslint(config.eslint))
        .pipe(eslint.format());

    if(strict) {
        stream.pipe(eslint.failAfterError());
    }

    return stream;
};

gulp.task('eslint:dev', function () {
    return eslintTask(false);
});

gulp.task('eslint:dist', function () {
    return eslintTask(true);
});

gulp.task('watch:eslint', function () {
    watch(config.srcDir + '/components/**/*.js', config.watch, function () {
        runSequence(
            'eslint'
        );
    });
});