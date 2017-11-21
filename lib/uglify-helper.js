const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const merge = require('merge-stream');
const size = require('gulp-size');
const uglify = require('gulp-uglify');

const componentHelper = require('../lib/component-helper');
const config = require('./../config');

module.exports = {
    uglifyTask: () => {
        const mergedStream = merge();
        const componentNames = componentHelper.collectAllComponentNamesAsArray();
        const componentVariations = componentHelper.collectAllComponentVariations();

        const ignorePaths = [];
        config.uglify.ignoreList.forEach(function (ignorePath) {
            ignorePaths.push('!' + ignorePath);
            gutil.log(gutil.colors.cyan('uglified ') + gutil.colors.yellow('ignore file: ' + ignorePath));
        });

        componentNames.forEach((componentName) => {
            const sources = [
                path.join(config.distDir, '**/*.js'),
                ...ignorePaths
            ];

            console.log(sources);

            const stream = gulp.src(sources)
                .pipe(uglify()).on('error', gutil.log)
                .pipe(size({
                    title: 'uglified',
                    showFiles: true
                }))
                .pipe(gulp.dest(config.distDir));

            mergedStream.add(stream);
        });

        return mergedStream;
    }
};