var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('./gulp.config')(),
    karma = require('karma').server,
    browserSync = require('browser-sync'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

var port = process.env.PORT || config.defaultPort;


//lists all tasks which are defined
gulp.task('help', $.taskListing);

//concat and minify js files
gulp.task('scripts', function() {
    log("Scripts concat and then minify to build folder");
    gulp.src(config.scripts)
        .pipe($.concat('all.min.js'))
        .pipe($.uglify({mangle: false}, {compress: false}))
        .pipe(gulp.dest(config.build + 'js/'));
});


//html templatecache
gulp.task('templatecache', function() {
    log('creating angularjs $templateCache');
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({
            empty: true
        }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options))
        .pipe(gulp.dest(config.build + 'js/'));
});

//copy and compress the images
gulp.task('images', function() {
    log('Copying  and compressing images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest(config.build + 'img/'));
});


//serving my dev environment
gulp.task('serve-build', ['scripts', 'templatecache', 'images'], function() {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port
        },
        watch: [config.server]
    };
    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('**** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({
                    stream: false
                });
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('**** nodemon started');
            startBrowserSync();
        })
        .on('crash', function() {
            log('**** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('**** nodemon exited cleanly');
        });
});


//code check for quality
gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.scripts)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

//sass compilation
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


//what out your scrits and sass file changes
gulp.task('watch', function() {
    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.scripts, ['scripts']);
});

//Test task, run test once and exit
gulp.task('test', function(done) {
    log("Test executions starts");
    startTests(true /*singleRun*/ , done);
});

//wiredep task for bower and scripts to inject on index page
gulp.task('wiredep', function() {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.scripts)))
        .pipe(gulp.dest(config.root));
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


/////////////////////


function startTests(singleRun, run) {
    var karma = require('karma').server;
    var excludeFiles = [];
    var serverSpec = config.serverIntegrationSpecs; //todo

    excludeFiles = serverSpec;

    karma.start({
        config: __dirname + 'karma.config.js',
        exclude: excludeFiles,
        single: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
        log('karma completed !');
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }
    log('start browser-sync on port' + port);
    var options = {
        proxy: 'localhost:' + port,
        port: 4000,
        files: [config.root + '**/*.*'],
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);
}



/*gulp.task('optimize', ['wiredep'], function() {
    log('Optimizing the js, html, css');

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        //todo processing
        .pipe($.inject(gulp.src(templateCache, {
            read: false
        }), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(gulp.dest(config.build));
});*/
