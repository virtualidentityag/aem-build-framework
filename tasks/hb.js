const config = require('./../config');
const gulp = require('gulp');
const hb = require('gulp-hb');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const packageData = require(config.cwd + '/package.json');
const hbHelper = require('../lib/handlebars-helper');
const componentHelper = require('../lib/component-helper');

gulp.task('hb', function () {
    return hbHelper.hbTask(config.devDir, false);
});

gulp.task('hb:dist', function () {
    return hbHelper.hbTask(config.distDir, true);
});

gulp.task('watch:hb', function () {
    watch([config.srcDir + '/**/*.hbs'], config.watch, function () {
        runSequence(
            ['hb']
        );
    });
});

gulp.task('indexr', function () {

    const componentVariations = componentHelper.collectAllComponentVariations();
    const handlebarsData = {
        package: packageData,
        components: []
    };

    for (let componentName in componentVariations) {
        handlebarsData.components.push({
            name: componentName,
            variations: componentVariations[componentName]
        });
    }

    const hbStream = hb({debug: false})
        .data(handlebarsData);

    return gulp.src(config.srcDir + '/index.hbs')
            .pipe(hbStream)
            .pipe(rename({extname: ".html"}))
            .pipe(gulp.dest(config.devDir));

});

gulp.task('watch:indexr', function () {
	watch(config.srcDir + '/components/*/variations/*/index.hbs', config.watch, function () {
		runSequence(
			['indexr']
		);
	});
});
