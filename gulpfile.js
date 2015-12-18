var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').server;

var paths = {
    sass: ['./scss/**/*.scss'],
    scripts: ['./www/app/**/*.js','./www/app/**/**/*.js']
};

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

gulp.task('scripts', function() {
    gulp.src('./www/app/**/*.js') // path to your files
        .pipe(concat('all.min.js')) // concat and name it "concat.js"
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
});

/**
 * Test task, run test once and exit
 */
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/spec/my.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

gulp.task('wiredep', function() {

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
