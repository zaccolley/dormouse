module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['app/js/*.js'],
                dest: 'dist/js/script.js'
            }
        },

        uglify: {
            build: {
                src:  'dist/js/script.js',
                dest: 'dist/js/script.min.js',
                options: {
                    sourceMap: 'dist/js/script.map.js',
                    sourceMapPrefix: 2,
                    sourceMappingURL: 'script.map.js',
                    banner: '/*! <%= pkg.name %> ~ UP665219 ~ <%= grunt.template.today("yyyy-mm-dd") %> */'
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'app/js/**/*.js']
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: true
                },
                files: {
                    'dist/css/style.css': 'app/css/all.scss'
                }
            } 
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version'],
                map: true
            },
            dist: {
                files: {
                    'dist/css/style.css': 'dist/css/style.css'
                }
            }
        },

        csso: {
            dist: {
                files: {
                    'dist/css/style.min.css': 'dist/css/style.css'
                }
            }
        },

        htmllint: {
            all: ["app/**/*.html"]
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }   
        },

        copy: {
            main: {
            // index, font awesome fonts, data
            files: 
                [{
                    expand: true,
                    cwd: 'app/',
                    src: ['.htaccess', 'index.php', 'css/font-awesome/fonts/*', 'data/*', 'data/.htaccess'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },

        watch: {

            options: {
                livereload: true
            },

            scripts: {
                files: ['app/js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },

            css: {
                files: ['app/css/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'csso'],
                options: {
                    spawn: false
                }
            },

            html: {
                files: ['app/**/*.html', 'app/**/*.php'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            },

            data: {
                files: ['app/data/.htaccess', 'app/data/*.json'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            },

            images: {
                files: ['app/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false
                }
            }
        },

    });

    // js stuff
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // css stuff
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-csso');

    // linters
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // image compression
    grunt.loadNpmTasks('grunt-contrib-imagemin');

     // copy files
    grunt.loadNpmTasks('grunt-contrib-copy');

    // watch for changes in files
    grunt.loadNpmTasks('grunt-contrib-watch');

    // command line usage
    grunt.registerTask('build', ['concat', 'uglify', 'sass', 'autoprefixer', 'csso', 'imagemin', 'copy']); // 'grunt build'
    grunt.registerTask('image-compress', ['imagemin']); // 'grunt image-compress'
    grunt.registerTask('lint', ['jshint', 'htmllint']); // 'grunt lint'
    grunt.registerTask('default', ['build', 'watch']); // 'grunt'

};