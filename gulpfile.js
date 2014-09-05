'use strict';

var dhis_directory = '/usr/local/apache-tomcat-8.0.5/webapps/dhis/dhis-web-pepfar-approvals/';
var build_directory = 'build';

var files = [
    //Test libraries
    'src/vendor/lodash/dist/lodash.compat.js',
    'src/vendor/jquery/dist/jquery.js',
    'src/vendor/angular/angular.js',
    'src/vendor/angular-mocks/angular-mocks.js',
    'src/vendor/d2js/dist/js/d2.js',
    'src/vendor/restangular/dist/restangular.js',
    'src/vendor/angular-ui-select/dist/select.js',

    //Test files
    'src/test/utils/*.js',
    'src/test/matchers/*.js',
    'src/test/fixtures/*.js',
    'src/test/mocks/*.js',
    'src/test/specs/**/*.js',

    //App files
    'src/main/**/*.js',
    'src/main/**/*.html'
];

//General requires
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');

//Test
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

//Build
var sass = require('gulp-ruby-sass');
var zip = require('gulp-zip');
var ngAnnotate = require('gulp-ng-annotate');

function run_karma(watch) {
    var config = {
        configFile: 'src/test/karma.conf.js'
    };

    if (watch === true) {
        config.action = 'watch';
    }

    return karma(config);
}

gulp.task('clean', function(cb){
    rimraf('./build', cb);
});

//Run the tests in the test directory
gulp.task('test', function () {
    gulp.src(files).pipe(run_karma());
});

//Run a watch on karma to rerun tests when the files change
gulp.task('watch', function() {
    gulp.src(files).pipe(run_karma(true));
});

//Run jshint on the code in src/main
gulp.task('lint', function () {
    return gulp.src('./src/main/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

//Run jscs on the code in src/main
gulp.task('jscs', function () {
    return gulp.src('src/main/**/*.js').pipe(jscs('./.jscsrc'));
});

gulp.task('js', /*['lint', 'jscs'],*/ function () {
    var concat = require('gulp-concat');

    return gulp.src('src/main/**/*.js')
        .pipe(ngAnnotate({
            add: true,
            remove: true,
            single_quotes: true,
            stats: true
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(
            [build_directory, 'js'].join('/')
        ));
});

gulp.task('sass', function () {
    return gulp.src('src/main/app.sass')
        .pipe(sass())
        .pipe(gulp.dest(
            [build_directory, 'css'].join('/')
        ));
});

gulp.task('html', function () {
    gulp.src('src/main/**/*.html').pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('dependencies', function () {
    var path = require('canonical-path');
    var _ = require('lodash');
    var concat = require('gulp-concat');

    function get_main_script(dependency) {
        var bower_directory = 'src/vendor';
        var main_scripts;
        try {
            main_scripts = require(path.resolve([
                bower_directory,
                dependency,
                'bower.json'
            ].join('/'))).main;
        } catch (e) {
            main_scripts = require(path.resolve([
                bower_directory,
                dependency,
                '.bower.json'
            ].join('/'))).main;
        }

        var replace_leading_dot = function (script) {
            if (/^\.\/.*/.test(script)) {
                return script.replace(/^\.\//, '');
            }
            return script;
        }

        if (_.isArray(main_scripts)) {
            main_scripts = _.map(main_scripts, function (script) {
                return [ bower_directory, dependency, replace_leading_dot(script) ].join('/');
            });
        }
        if (_.isString(main_scripts)) {
            main_scripts = [ bower_directory, dependency, replace_leading_dot(main_scripts) ].join('/')
        }
        return main_scripts;
    }

    var dependencies = require(path.resolve('bower.json')).dependencies;

    _.map(dependencies, function (version, dependency) {
        var dependencies = get_main_script(dependency);
        if (dependency === 'd2js') return;

        gulp.src(dependencies).pipe(gulp.dest([
            build_directory,
            'vendor',
            dependency
        ].join('/')));
    });

    //TODO: fix this
    // Redo d2js seperately
    gulp.src([
        'src/vendor/d2js/dist/**/*'
    ]).pipe(gulp.dest([
        build_directory,
        'vendor',
        'd2js'
    ].join('/')));
});

gulp.task('build', function () {
    runSequence('clean', 'js', 'sass', 'html', 'dependencies');
});

gulp.task('deploy', function () {
    gulp.src([
        'build/**/*'
    ]).pipe(gulp.dest(dhis_directory));
})

gulp.task('default', function () {
    rimraf(dhis_directory, function () {});
    runSequence('build', 'deploy');
});
