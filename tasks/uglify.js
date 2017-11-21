const gulp = require('gulp');
const path = require('path');
const size = require('gulp-size');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const config = require('./../config');

gulp.task('uglify:resources:dist', function () {
    const ignorePaths = [];
    config.uglify.ignoreList.forEach(function (ignorePath) {
        ignorePaths.push('!' + path.join(config.distDir, ignorePath));
        gutil.log(gutil.colors.cyan('uglified ') + gutil.colors.yellow('ignore dist file: ' + ignorePath));
    });

    const sources = [
        path.join(config.distDir, '**/*.js'),
        ...ignorePaths
    ];

    return gulp.src(sources)
        .pipe(uglify()).on('error', gutil.log)
        .pipe(size({
            title: 'uglified',
            showFiles: true
        }))
        .pipe(gulp.dest(config.distDir));
});
