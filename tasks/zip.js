const gulp = require('gulp');
const path = require('path');
const zip = require('gulp-zip');
const componentHelper = require('../lib/component-helper');
const config = require('./../config');

gulp.task('zip', function (cb) {

    const componentVariations = componentHelper.collectAllComponentVariations();
    for (let componentName in componentVariations) {

        const variations = componentVariations[componentName];
        if(variations && variations.length) {

            variations.forEach((variation) => {
                const zipName = `${componentName.trim()}-${variation}.zip`;

                gulp.src(path.join(config.distDir, componentName, variation, '*'))
                    .pipe(zip(zipName))
                    .pipe(gulp.dest(path.join(config.distDir, componentName)));
            });
        }
    }

    cb();
});
