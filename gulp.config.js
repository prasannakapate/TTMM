module.exports = function() {
    var root = './www/';
    var rootApp = root + 'app/';
    var server = './server.js';
    var temp = root + 'temp/';
    var report = './report/';

    var config = {
        sass: ['./scss/**/*.scss'],
        scripts: [rootApp + '**/*module.js',
            rootApp + '**/*services.js',
            rootApp + '**/**/*ctrl.js',
            rootApp + '**/*ctrl.js'
        ],
        htmltemplates: rootApp + '**/**/*.html',
        images: root + 'img/**/*.*',
        build: root + 'build/',
        root: root,
        index: root + 'index.html',
        server: server,
        temp: temp,
        report: report,
        /**
         * template cache
         */
        templateCache: {
            file: 'template.js',
            options: {
                module: 'ttmmApp.core',
                standAlone: false,
                root: 'app/'
            }
        },
        /**
         * bower configuration options for html inject
         */
        bower: {
            json: require('./bower.json'),
            directory: root + 'lib/',
            ignorePath: '../..'
        },

        /**
         * karma and testing settings
         */
        serverIntegrationSpecs: [root + 'tests/server-integration/**/*.spec.js'],
        /**
         * Node Settings
         */
        defaultPort: 5000,
        nodeServer: './server.js'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ///////////////////////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                //bowerFiles,
                config.specHelpers,
                rootApp + '**/*.module.js',
                rootApp + '**/*.js',
                rootApp + '**/*spec.js',
                root + 'lib/angular-mocks.js',
                //build + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dit: report + 'coverage',
                reporters: [{
                    type: 'html',
                    subdir: 'report-html'
                }, {
                    type: 'lcov',
                    subdir: 'report-lcov'
                }, {
                    type: 'text-summary'
                }]
            },
            preprocessors: {}
        };
        options.preprocessors[rootApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
