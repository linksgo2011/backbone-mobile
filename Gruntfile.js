/**
 * grunt 打包文件
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    optimize: "uglify",
                    mainConfigFile: "./js/main.js",
                    out: "./js/all.js"
                }
            }
        },
        uglify: [{
            src: 'js/lib/modernizr/modernizr-2.6.2.js',
            dest: 'js/lib/modernizr/modernizr-2.6.2.min.js'
        }],
        // css 合并
        css_import: [{
            src: ['css/app.css'],
            dest: 'css/app.min.css'
        }],
        // css压缩
        cssmin: [{
            src: 'css/app.min.css',
            dest: 'css/app.min.css'
        }],

        // erro check
        jshint: {
            all: [
                'js/controller/*.js',
                'js/model/*.js',
                'js/view/*.js',
                'js/app-router.js',
                'js/app.js',
                'js/main.js',
                'js/router.js',
                'js/transitions.js',
                'js/utils.js'
            ],
            options: {
                browser: true, // browser environment
                devel: true 
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-css-import');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['css_import', 'cssmin', 'uglify', 'requirejs','jshint']);
}