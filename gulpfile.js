var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    config = require('./gulp.config')(),
    karma = require('karma').server,
    $ = require('gulp-load-plugins')({
        lazy: true
    });

//code check for quality
gulp.task('vet', function() {
    return gulp
        .src(config.scripts)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

//concat and minify js files
gulp.task('scripts', function() {
    gulp.src(config.scripts)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./www/build'));
});

//what out your scrits and sass file changes
gulp.task('watch', function() {
    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.scripts, ['scripts']);
});

//Test task, run test once and exit
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/spec/my.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

//wiredep task for bower and scripts to inject on index page
gulp.task('wiredep', function() {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.scripts)))
        .pipe(gulp.dest(config.root))
});

//////////////////////

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('default', ['sass', 'scripts']);
