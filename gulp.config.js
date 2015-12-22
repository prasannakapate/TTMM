module.exports = function() {
    var root = './www/';
    var rootApp = root + 'app/';
    var server = './server.js';
    var temp = root + 'temp/';

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
    return config;
};
