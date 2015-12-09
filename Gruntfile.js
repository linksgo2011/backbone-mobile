/**
 * grunt 打包文件
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        requirejs : {
            compile: {
                options: {
                    name : "main",
                    optimize: "uglify",
                    mainConfigFile: "./js/main.js",
                    out: "./js/all.js"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default',['requirejs']);
}