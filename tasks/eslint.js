const gulp = require('gulp');
const cached = require('gulp-cached');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');

const sources = [
    config.srcDir + '/components/**/*.js',
    '!' + config.srcDir + '/components/**/vendor/**/*.js'
];

const eslintTask = (strict) => {
    const stream = gulp.src(sources)
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
    watch(sources, config.watch, function () {
        runSequence(
            'eslint:dev'
        );
    });
});