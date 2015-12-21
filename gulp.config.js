module.exports = function() {
    var root = './www/';
    var rootApp = root + 'app/';
    server = './server.js';

    var config = {
        //scss files
        sass: ['./scss/**/*.scss'],
        //sequene wise script load
        scripts: [rootApp + '**/*module.js',
            rootApp + '**/*services.js',
            rootApp + '**/**/*ctrl.js',
            rootApp + '**/*ctrl.js'
        ],
        //images scource
        images: root + 'img/**/*.*',
        //build folder
        build: root + 'build/',
        //root dir ./www
        root: root,
        //index html
        index: root + 'index.html',
        //bower configuration options for html inject
        bower: {
            json: require('./bower.json'),
            directory: root + 'lib/',
            ignorePath: '../..',
            exclude: 'www/lib/angular/angular.js'
        },
        //node express server
        server: server,
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
