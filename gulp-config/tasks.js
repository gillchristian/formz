// tasks names

var TASKS = {
    dev: {
        style: 'css',
        jade: 'jade'
    },
    watch: {
        all: 'watch',
        style: 'watch:css',
        jade: 'watch:jade',
        production: {
            all: 'watch:build',
        },
    },
    production: {
        ready: 'build',  
        style: 'build:css',
        js: 'build:js'
    },
    default: 'default'
};
    
module.exports = TASKS;