'use strict';

var dhis_directory = '/Users/markadm/Projects/dhis/DHIS2_HOME/apps/approvals/';
var build_directory = 'build';

var files = [
    //Test libraries
    'src/vendor/rxjs/dist/rx.all.js',
    'src/vendor/lodash/dist/lodash.compat.js',
    'src/vendor/jquery/dist/jquery.js',
    'src/vendor/angular/angular.js',
    'src/vendor/angular-mocks/angular-mocks.js',
    'src/vendor/d2js/dist/js/d2.js',
    'src/vendor/restangular/dist/restangular.js',
    'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    'src/vendor/angular-ui-select/dist/select.js',
    'src/vendor/rx-angular/dist/rx.angular.js',

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
var sass = require('gulp-sass');
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
    return gulp.src(files).pipe(run_karma());
});

//Run a watch on karma to rerun tests when the files change
gulp.task('watch', function() {
    return gulp.src(files).pipe(run_karma(true));
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
        //.pipe(uglify())
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

    return gulp.src('src/main/**/*.html')
        .pipe(minifyHTML({ empty: true, quotes: true }))
        .pipe(gulp.dest(build_directory));
});

gulp.task('i18n', function () {
    return gulp.src('./src/main/common/i18n/**/*.json', { base: './src/main/' }).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('images', function () {
    return gulp.src('./src/main/img/icons/**/*', { base: './src/main/' }).pipe(gulp.dest(
        build_directory
    ));
});

gulp.task('manifest', function () {
    return gulp.src('./src/main/*.webapp', { base: './src/main/' }).pipe(gulp.dest(
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
        if (dependency === 'lodash') {
            let p = [ 'src/vendor', 'lodash','dist', 'lodash.js' ].join('/');
            depFiles.push(p);
            return;
        }
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
        .pipe(uglify())
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
    return gulp.src([
        'src/vendor/d2js/dist/**/' +
        '*'
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

            'src/vendor/restangular/**/restangular.js',
            'src/vendor/rxjs/dist/rx.all.js'
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

gulp.task('font-awesome', function () {
    return gulp.src([
        'src/vendor/font-awesome/fonts/**'
    ])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('do-rev-on-build', function () {
    function doFileCheck(file) {
        if (/\.html$/.test(file.path) || /\.js$/.test(file.path) || /\.css$/.test(file.path)) {
            return true;
        }
        return false;
    }

    var rev = require('gulp-rev');
    var revReplace = require('gulp-rev-replace');
    var gulpif = require('gulp-if');

    return gulp.src(['build/**/*.*'])
        .pipe(gulpif('!**/index.html', gulpif('!**/vendor/**', gulpif(doFileCheck, rev()))))
        .pipe(revReplace())
        .pipe(gulp.dest('build-with-rev/'));
});

gulp.task('clean-rev', function(cb){
    rimraf('./build-with-rev', cb);
});

gulp.task('build', function (cb) {
    runSequence('clean', 'js', 'header-bar-dependency', 'sass', 'html', 'dependencies', 'font-awesome', 'i18n', 'images', 'manifest', cb);
});

gulp.task('build-prod', function (cb) {
    runSequence('clean-rev', 'build', 'do-rev-on-build', 'package', cb);
});


gulp.task('header-bar-dependency', function () {
    return gulp.src([
            'node_modules/d2-ui/dist/header-bar.js',
            'src/header-bar/**/*.js',
        ])
        .pipe(gulp.dest('build'));
});

gulp.task('deploy', function () {
    return gulp.src(['build-with-rev/**/*'])
        .pipe(gulp.dest(dhis_directory));
});

gulp.task('default', function (cb) {
    rimraf(dhis_directory, cb);
    runSequence('build', 'deploy', cb);
});

gulp.task('git:pre-commit', function (cb) {
    gulp.on('err', function(e){
        console.log('Pre-commit validate failed');
        process.exit(1);
    });

    runSequence('test', 'lint', 'jscs', cb);
});

gulp.task('copy-fake-api', function () {
    return gulp.src([
        'fake-api/**/*'
    ]).pipe(gulp.dest(dhis_directory + 'fake-api/'));
});

gulp.task('package', function () {
    return gulp.src('build-with-rev/**/*', { base: './build-with-rev/' })
        .pipe(zip('approvals.zip', { compress: false }))
        .pipe(gulp.dest('.'));
});
