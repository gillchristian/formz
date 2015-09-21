'use strict';
   // this function is strict...

var gulp            = require('gulp'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify'),
    // jade plugins
    plumber         = require('gulp-plumber'),
    jade            = require('gulp-jade'),
    merge           = require('merge-stream'),
    // PostCSS plugins
    postcss         = require('gulp-postcss'),
    rucksack        = require('gulp-rucksack');

// import the variables for the tasks and files, etc

var TASKS           = require('./gulp-config/tasks'),
    FILES           = require('./gulp-config/files'),
    postcssPlugins  = require('./gulp-config/postcssPlugins');

// deveolpment style tasks
// --------------------------------------------------------
gulp.task(TASKS.dev.style, function () {

    return gulp.src(FILES.css.source)
        .pipe( sourcemaps.init() )
        .pipe( postcss(postcssPlugins.preRucksack) )
        .pipe( rucksack({autoprefixer: true, fallbacks: false }) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest(FILES.css.dest) );
});

gulp.task(TASKS.watch.style, function () {
    gulp.watch( FILES.css.all , [TASKS.dev.style]);
});


// jade task
// --------------------------------------------------------
gulp.task(TASKS.dev.jade, function () {

        // compile jade angularViews 
    var angularViews = gulp.src(FILES.jade.angularViews)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(FILES.jade.dest.angularViews));

        // compile jade index    
    var index = gulp.src(FILES.jade.index)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(FILES.jade.dest.index));

    return merge(angularViews, index);

});

gulp.task(TASKS.watch.jade, function () {
    gulp.watch( FILES.jade.all, [TASKS.dev.jade]);
});

// watch all
// --------------------------------------------------------

gulp.task(TASKS.watch.all, function () {
    gulp.watch( FILES.jade.all, [TASKS.dev.jade]);
    gulp.watch( FILES.css.all, [TASKS.dev.style]);
});


// production build
// --------------------------------------------------------
gulp.task(TASKS.production.js, function() {
    return gulp.src(FILES.js.source)
        .pipe( rename({suffix: '.min'}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(FILES.js.dest));
});

gulp.task(TASKS.production.style, function (){
    
    return gulp.src(FILES.css.source)
        .pipe( plumber() )
        .pipe( postcss(postcssPlugins.preRucksack) )
        .pipe( rucksack({autoprefixer: true, fallbacks: false}) )
        .pipe( gulp.dest(FILES.css.dest) )
        .pipe( rename({suffix: '.min'}))
        .pipe( postcss(postcssPlugins.postRucksack) )
        .pipe( plumber.stop() )
        .pipe( gulp.dest(FILES.css.dest) );     

});

gulp.task(TASKS.production.ready, [TASKS.dev.jade , TASKS.production.style, TASKS.production.js], function() {

});

gulp.task(TASKS.watch.production.all, function () {
    gulp.watch( FILES.jade.all, [TASKS.dev.jade]);
    gulp.watch( FILES.css.all, [TASKS.production.style]);
    gulp.watch( FILES.js.source, [TASKS.production.js]);
});

// default
// --------------------------------------------------------
gulp.task(TASKS.default, [TASKS.dev.style, TASKS.dev.jade , TASKS.watch.all], function() {

});