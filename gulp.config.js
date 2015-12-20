module.exports = function() {
    var root = './www/';
    var rootApp = root + 'app/';

    var config = {
        //scss files
        sass: ['./scss/**/*.scss'],

        //sequene wise script load
        scripts: [rootApp + '**/*module.js',
            rootApp + '**/*services.js',
            rootApp + '**/**/*ctrl.js',
            rootApp + '**/*ctrl.js'
        ],
        //root dir ./www
        root: root,

        //index html
        index: './www/index.html',

        bower: {
            json: './bower.json',
            directory: root + 'lib',
            ignorePath: '../..'
        }
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
