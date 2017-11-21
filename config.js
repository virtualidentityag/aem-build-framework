const src = './src';
const dev = './dev';
const dist = './dist';
const cwd = process.cwd();
const os = require('os');
const isWin = /^win/.test(os.platform());
const _ = require('lodash');
const projectConfig = require(cwd + '/projectConfig.js');

module.exports = {

    srcDir: src,
    devDir: dev,
    distDir: dist,
    cwd: cwd,

    autoprefixer: ['last 3 versions', 'ie 9'],

    connect: {
        port: 9001,
        globs: [
            dev + '/**'
        ]
    },

    eslint: {
        quiet: true
    },

    image: {
        verbose: true
    },

    livereload: {
        port: 35730
    },

    replaceStrings: [
        {
            subStr: '"./',
            newSubStr: '"./application_root/../'
        },
        {
            subStr: '[./',
            newSubStr: '[./application_root/../'
        }
    ],

    uglify: {
        ignoreList: [
            '/aem-module-reloaded/*/resources/js/uglify-ignore-me.js'
        ]
    },

    watch: {
        usePolling: isWin
    }
};

if (projectConfig) {
    _.merge(module.exports, projectConfig);
}
