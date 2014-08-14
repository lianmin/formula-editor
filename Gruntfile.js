'use strict';

module.exports = function (grunt) {
    var fs = require('fs'),
        path = require('path'),
    // exec = require('child_process').exec,
        combo = require('connect-combo');

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var livereloadPort = Math.floor(Math.random() * 10000) + 10000;
    var os = require('os'),
        isWin = /window/i.test(os.type()),
        localIp = '127.0.0.1',
        serverPort = isWin ? 80 : 9876,
        ifaces = os.networkInterfaces();
    // 获取本地IP地址,起服务器时使用ip地址
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (details.family === 'IPv4' && details.internal === false) {
                localIp = details.address;
                return;
            }
        });
    }
    var pkg = grunt.file.readJSON('package.json');

    // grunt 配置
    grunt.initConfig({
        pkg: pkg,
        // 配置默认分支
        currentBranch: 'master',
        watch: {
            options: {
                livereload: livereloadPort
            },
            assets: {
                files: ['src/**/*.{png,jpg,jpeg,gif,webp,html}', '!src/**/*.xtpl.html'],
                tasks: ['copy:debug']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['copy:debug', 'kmc', 'uglify:build']
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['copy:debug', 'cssmin:minify']
            },
            compass: {
                files: ['src/**/*.{scss,sass}'],
                tasks: ['compass:debug', 'cssmin:minify']
            },
            jade: {
                files: ['src/**/*.{jade,html}', '!src/**/*.xtpl.html'],
                tasks: ['jade:debug']
            },
            coffee: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee:debug', 'kmc']
            },
            xtpl: {
                files: ['src/**/*.xtpl.html'],
                tasks: ['shell:xtpl']
            }
        },
        jade: {
            options: {
                data: {
                    debug: true
                },
                pretty: true
            },
            debug: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.jade'],
                        dest: 'build/',
                        ext: '.html'
                    }
                ]
            }
        },
        coffee: {
            debug: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**/*.coffee',
                        dest: 'build',
                        ext: '.js'
                    }
                ]
            }
        },
        compass: {
            debug: {
                options: {
                    cssDir: 'build',
                    sassDir: 'src',
                    imagesDir: 'src/images',
                    generatedImagesDir: 'build/images',
                    relativeAssets: false,
                    httpImagesPath: 'http://g.assets.daily.taobao.net/alitx/<%= pkg.name%>/<%= pkg.version%>/images',
                    httpGeneratedImagesPath: 'http://g.assets.daily.taobao.net/alitx/<%= pkg.name%>/<%= pkg.version%>/images'
                }
            },
            build: {
                options: {
                    cssDir: 'build',
                    sassDir: 'src',
                    imagesDir: 'src/images',
                    generatedImagesDir: 'build/images',
                    relativeAssets: false,
                    httpImagesPath: 'http://g.tbcdn.cn/alitx/<%= pkg.name%>/<%= pkg.version%>/images',
                    httpGeneratedImagesPath: 'http://g.tbcdn.cn/alitx/<%= pkg.name%>/<%= pkg.version%>/images'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name%> - v<%= pkg.version%> */\n',
                beautify: {
                    ascii_only: true
                }
            },
            build: {
                options: {
                    compress: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['{js,tpl}/**/*.js', '!{js,tpl}/**/*-min.js'],
                        dest: 'build/',
                        ext: '-min.js'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name%> - v<%= pkg.version%> */\n'
            },
            minify: {
                expand: true,
                cwd: 'build/',
                src: ['css/**/*.css', '!css/**/*-min.css'],
                dest: 'build/',
                ext: '-min.css'
            }
        },
        imagemin: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'build'
                    }
                ]
            }
        },
        copy: {
            options: {
                noProcess: '**/*.{css,png,jpg,jpeg,gif,html,svg,eot,ttf,woff}',
                process: function (content, srcpath) {
                    if (/-xtpl\.js$/i.test(srcpath)) {
                        fs.unlink(srcpath);
                        return content.replace(/\\r\\n/gmi, '\\n');
                    }
                    return content;
                }
            },
            debug: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{css,js,png,gif,jpg,jpeg,html,svg,eot,ttf,woff}', '!src/**/*.xtpl.html'],
                        dest: 'build'
                    }
                ]
            }
        },
        clean: {
            all: 'build/'
        },
        connect: {
            debug: {
                options: {
                    port: serverPort,
                    hostname: '*',
                    base: '../',
                    middleware: function (connect, options) {
                        var middlewares = [];

                        // Combo support
                        middlewares.push(combo({
                            directory: function (req) {
                                var url = req.url;

                                //去掉版本号
                                url = url.replace(/\/[\d\.]*?\//gi, '/');
                                //修正??前面不带/
                                url = url.replace(/([^\/])\?\?/gmi, '$1/??');

                                //connect-combo不支持单文件合并,通过rewrite支持
                                if (/\?\?/gmi.test(url) && !/,/gmi.test(url)) {
                                    url = url.replace(/\?\?/gi, '');
                                }

                                //支持alitx/??规则目录映射
                                if (/\/alitx\/\?\?/gmi.test(url)) {
                                    url = url.replace(/(\/alitx\/\?\?|,)(.*?\/)/gi, '$1$2build/');
                                }

                                //支持alitx/dpl/??规则目录映射
                                url = url.replace(/(\/|,|\?\?)alitx\/(.*?\/)/gi, '$1$2build/');
                                url = url.replace(/(build\/)+/gi, 'build/'); //build目录修正

                                req.url = url;

                                return path.resolve(__dirname, '../');
                            },
                            proxy: 'g.assets.daily.taobao.net',
                            cache: true,
                            log: false,
                            static: false
                        }));

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function (base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    },
                    livereload: livereloadPort,
                    open: 'http://' + localIp + ':' + serverPort + '/alitx/<%= pkg.name%>/',
                    keepalive: false,
                    useAvailablePort: true
                }
            }
        },
        shell: {
            precommit: {
                command: 'cp git-hooks/pre-commit .git/hooks/'
            },
            xtpl: {
                command: 'node node_modules/kissy/bin/kissy-xtemplate.js -p src/tpl',
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            grunt.log.errorlns(err);
                            grunt.fail.fatal('xtpl编译出错了！');
                        }
                        cb();
                    }
                }
            },
            checkBranch: {
                command: 'git symbolic-ref --short HEAD',
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        var branchName = stdout.replace('daily/', '').trim();
                        if (branchName !== pkg.version) {
                            // grunt.fail.fatal('package.json中版本号与当前分支不一致，请修改后再运行grunt');
                        }
                        cb();
                    }
                }
            }
        },
        kmc: {
            options: {
                comboOnly: true,
                fixModuleName: true,
                comboMap: false,
                packages: [
                    {
                        name: '<%= pkg.name %>',
                        path: './build/',
                        charset: 'utf-8',
                        ignorePackageNameInUri: true
                    }
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: '**/*.js',
                        dest: 'build/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('dev', [
        'shell:checkBranch',
        'clean',
        'jade',
        'compass:debug',
        'coffee:debug',
        'shell:xtpl',
        'copy:debug',
        'kmc',
        'uglify:build',
        'cssmin:minify',
        'connect:debug',
        'watch'
    ]);

    grunt.registerTask('build', [
        'shell:checkBranch',
        'clean',
        'compass:build',
        'coffee:debug',
        'shell:xtpl',
        'copy:debug',
        'kmc',
        'uglify:build',
        'cssmin:minify',
        'imagemin:build'
    ]);

    grunt.registerTask('setup', ['shell:precommit']);
    grunt.registerTask('default', [
        'dev'
    ]);


    var projectList = ['home', 'ucenter', 'activity', 'support', 'h5'];

    grunt.registerTask('sync', '同步本地项目的package.json', function () {
        grunt.log.writeln('同步package.json中的devDependencies...');
        // 同步本地项目的package.json
        projectList.forEach(function (i) {
            var packagePath = '../' + i + '/package.json';
            if (grunt.file.exists(packagePath)) {
                var devDependencies = grunt.file.readJSON('../dpl/package.json').devDependencies;
                var pkg = grunt.file.readJSON(packagePath);
                pkg.devDependencies = devDependencies;
                grunt.file.write(packagePath, JSON.stringify(pkg, null, 4));
                grunt.log.oklns(packagePath + '同步成功');
            }
        });
        // TODO:同步 npm_modules
        //grunt.file.copy('../dpl/node_modules','/home/');
    });
};