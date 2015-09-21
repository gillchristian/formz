var FILES = {
    css: {
        source: 'toCompile/style/style.css',
        all: 'toCompile/style/**/*.css',
        dest: 'app/style/'
    },
    jade: {
        index: 'toCompile/jade/index.jade',
        angularViews: 'toCompile/jade/views/**/*.jade' ,
        all: 'toCompile/jade/**/*.jade',
        dest: {
            index: '',
            angularViews: 'app/views/'
        }
    },
    js: {
        source: ['app/js/**/*.js', '!app/js/**/*.min.js'],
        dest: 'app/js/'
    }   
};

module.exports = FILES;