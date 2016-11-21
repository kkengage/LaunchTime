module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-tsd");

    grunt.initConfig({

        exec: {
            // tsd: 'tsd install jquery'
        },

        injector: {
            options: {
                min: true,
                addRootSlash: false,
                ignorePath: 'www/',
            },
            local_dependencies: {
                options: {
                    sort: function (a, b) {
                        if (a == "app/appMain/app.js") return -1;
                        if (b == "app/appMain/app.js") return 1;
                        return a > b ? 1 : -1;
                    }
                },
                files: {
                    'www/index.html': ['www/app/**/*.js'],
                }
            },
            local_css: {
                files: {
                    'www/index.html': ['www/app/**/*.css']
                }
            },
            bower_dependencies: {
                options: {
                    starttag: '<!-- injector:bower_dependencies -->'
                },
                files: {
                    'www/index.html': ['bower.json']
                }
            },
        },

        typescript: {
            base: {
                src: ['www/app/**/*.ts'],
                //dest: 'wwwroot/app/**', // or wwwwroot/app/app.js to concatinate all ts files into one js
                options: {
                    module: 'commonjs', //or amd 
                    target: 'es5', //or es3                   
                    sourceMap: true,
                    declaration: false,
                    references: ["typings/tsd.d.ts"]
                },
            }
        },

        sass: {
            dist: {
                options: {
                    sourceMap: true
                    //style: 'compressed'
                },
                files: [
                  {
                      expand: true,
                      cwd: "www/app",
                      src: ["**/*.scss"],
                      //dest: "www/app/styles",
                      ext: ".css"
                  }
                ]
                //files: {                         // Dictionary of files
                //    "wwwroot/app/styles/main.css": "wwwroot/app/**/*.scss",
                //}
            }
        },

        autoprefixer: {
            files: { "www/app/styles/*.css": "*.css" }
        },

        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',
                    //optional: always get from HEAD
                    latest: true,
                    // specify config file
                    config: 'tsd.json',
                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        },

        watch: {
            sass: {
                files: ["www/app/**/*.scss"],
                tasks: ["sass", "autoprefixer"],
                options: {
                    livereload: true
                }
            },
            typescript: {
                files: ["www/app/**/*.ts"],
                tasks: ["typescript"],
                options: { livereload: true }
            },
            injector: {
                files: ["www/app/**/*.css", "app/**/*.js"],
                tasks: ["injector"],
                options: { livereload: true }
            }
        }
    });

    grunt.registerTask('default', ['typescript', 'sass', 'autoprefixer', 'injector']);
};