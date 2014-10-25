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
    'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    'src/vendor/angular-ui-select/dist/select.js',

    //Test files
    'src/test/utils/*.js',
    'src/test/matchers/*.js',
    'src/test/fixtures/*.js',
    'src/test/mocks/*.js',

    //App files
    'src/main/**/*.js',
    'src/main/**/*.html',

    //App mocks
    'src/test/mocks/pepfar/*.js',

    'src/test/specs/**/*.js'
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
    var uglify = require('gulp-uglify');

    return gulp.src('src/main/**/*.js')
        .pipe(ngAnnotate({
            add: true,
            remove: true,
            single_quotes: true,
            stats: true
        }))
        .pipe(concat('app.js'))
//        .pipe(uglify())
        .pipe(gulp.dest(
            [build_directory, 'js'].join('/')
        ));
});

gulp.task('sass', function () {
    var minifyCSS = require('gulp-minify-css');

    return gulp.src('src/main/app.sass')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest(
            [build_directory, 'css'].join('/')
        ));
});

gulp.task('html', function () {
    var minifyHTML = require('gulp-minify-html');

    gulp.src('src/main/**/*.html').pipe(minifyHTML({ empty: true, quotes: true })).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('i18n', function () {
    gulp.src('**/i18n/**/*.json', { base: './src/main/' }).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('images', function () {
    gulp.src('**/icons/**/*', { base: './src/main/' }).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('manifest', function () {
    gulp.src('**/*.webapp', { base: './src/main/' }).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('dependencies', function () {
    var path = require('canonical-path');
    var _ = require('lodash');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

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

    var depFiles = []
    _.forEach(dependencies, function (version, dependency) {
        if (dependency === 'd2js') return;
        depFiles = depFiles.concat(get_main_script(dependency));
    });

    var jsFiles = _.filter(depFiles, function (fileName) {
       var regex = /^.+\.js$/;

       return regex.test(fileName);
    });

    var nonjsFiles = _.filter(depFiles, function (fileName) {
        var regex = /^.+\.js$/;

        return !regex.test(fileName);
    });

    gulp.src(jsFiles)
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest([
            build_directory,
            'vendor'
        ].join('/')));

    gulp.src(nonjsFiles).pipe(gulp.dest([
        build_directory,
        'vendor'
    ].join('/')));

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

gulp.task('vendor', function (cb) {
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    var stuff = gulp.src([
            'src/vendor/jquery/**/jquery.js',
            'src/vendor/lodash/**/lodash.compat.js',

            'src/vendor/angular/angular.js',
            'src/vendor/angular*/**/ui-bootstrap-tpls.js',
            'src/vendor/angular*/**/select.js',
            'src/vendor/angular*/**/angular-translate.js',

            'src/vendor/restangular/**/restangular.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(
            [build_directory, 'vendor'].join('/')
    ));

    gulp.src([
        'src/vendor/toastr/**/toastr.js',
        'src/vendor/d2js/js/**/*'
    ])
    .pipe(uglify())
    .pipe(gulp.dest(
        [build_directory, 'vendor'].join('/')
    ));

    gulp.src([
            'src/vendor/toastr/**/toastr.css',
            'src/vendor/d2js/**/d2.css',
            'src/vendor/d2js/**/*.html'
        ])
        .pipe(gulp.dest(
            [build_directory, 'vendor'].join('/')
        ));

    return stuff;
});

gulp.task('build', function () {
    runSequence('clean', 'js', 'sass', 'html', 'dependencies', 'i18n', 'images', 'manifest');
});

gulp.task('build-prod', function () {
    runSequence('clean', 'js', 'sass', 'html', 'vendor', 'i18n', 'images', 'manifest', 'package');
});

gulp.task('deploy', function () {
    gulp.src([
        'build/**/*'
    ]).pipe(gulp.dest('/usr/local/apache-tomcat-8.0.5/webapps/dhis/apps/approvals'));
});

gulp.task('default', function () {
    rimraf(dhis_directory, function () {});
    runSequence('build', 'deploy');
});

gulp.task('copy-fake-api', function () {
    gulp.src([
        'fake-api/**/*'
    ]).pipe(gulp.dest(dhis_directory + 'fake-api/'));
});

gulp.task('package', function () {
    gulp.src('build/**/*', { base: './build/' })
        .pipe(zip('approvals.zip', { compress: false }))
        .pipe(gulp.dest('.'));
});
