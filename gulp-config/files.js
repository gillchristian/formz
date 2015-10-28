var FILES = {
    css: {
        source: 'toCompile/style/style.css',
        all: 'toCompile/style/**/*.css',
        dest: 'example/app/style/'
    },
    jade: {
        index: 'toCompile/jade/index.jade',
        angularViews: 'toCompile/jade/views/**/*.jade' ,
        all: 'toCompile/jade/**/*.jade',
        dest: {
            index: 'example/',
            angularViews: 'example/app/views/'
        }
    },
    js: {
        source: ['example/app/js/**/*.js', '!example/app/js/**/*.min.js'],
        dest: 'example/app/js/'
    }   
};

module.exports = FILES;