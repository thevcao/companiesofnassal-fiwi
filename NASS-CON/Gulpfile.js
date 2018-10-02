'use strict';

// Node/Gulp plugins
const gulp    = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const merge   = require('merge-stream');
const plugins = require('gulp-load-plugins')({ camelize: true });
const through = require('through2');
const browserSync = require('browser-sync').create();
const favicons = require("gulp-favicons");
const sassGlob = require('gulp-sass-glob');
const open = require('gulp-open');
const hash = require('gulp-hash');
const fs = require('fs');

const nodemodules = [
  'node_modules',
];

gulp.task("favicons", function () {
    return gulp.src("src/img/favicons/favicon.png").pipe(favicons({
    }))
    .pipe(gulp.dest("./dist/img/favicons/"));
});


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
//    './src/scss/*/*.scss',
//    './src/scss/*/*/*.scss',
//    './src/scss/*.scss',
//    './src/js/*.js',
    '*.php',
    './partials/*.php',
    './partials/*/*.php',
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "http://companiesofnassal.local/",
    notify: true
    });
});

// CSS task
gulp.task('styles', () => {
  return gulp.src('src/scss/main.scss')
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber({}))
    .pipe(plugins.sass({
    outputStyle: 'compressed',
    includePaths: nodemodules
  }))
    .on('error', plugins.sass.logError)
    .pipe(plugins.postcss([
      require('autoprefixer')({ browsers: ['last 2 versions', 'last 2 iOS versions', 'ie >= 9'] }),
      require('postcss-focus'),
      require('postcss-flexbugs-fixes'),
      require('postcss-object-fit-images'),
      require('postcss-initial')({
        reset: 'inherited' // reset only inherited rules
      })
    ]))
    .pipe(plugins.rename('styles.min.css'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    .pipe(hash())
    .pipe(gulp.dest('dist/css'))
    .pipe(hash.manifest('dist/assets.json', { // Generate the manifest file
      deleteOld: true,
      sourceDir: __dirname + '/dist/css'
    }))
    .pipe(gulp.dest('.'))
    .pipe(plugins.size({ title: 'styles' }))
    .on('end', function(){
      gulp.start('dev-build-message');
    });
});


gulp.task('styles-prod', () => {
  return gulp.src('src/scss/main.scss')
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber({}))
    .pipe(plugins.sass({
    outputStyle: 'compressed',
    includePaths: nodemodules
  }))
    .on('error', plugins.sass.logError)
    .pipe(plugins.postcss([
      require('autoprefixer')({ browsers: ['last 2 versions', 'last 2 iOS versions', 'ie >= 9'] }),
      require('postcss-focus'),
      require('postcss-flexbugs-fixes'),
      require('postcss-sorting')({
        'order': [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules'
      ],
        'properties-order': 'alphabetical' }),
      require('postcss-object-fit-images'),
      require('postcss-initial')({
        reset: 'inherited' // reset only inherited rules
      }),
      require('postcss-uncss')({
      html: [], //Include JSON of site map to crawl css against html
      ignore: []
      })

    ]))
    .pipe(plugins.rename('styles.min.css'))
//    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(hash())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    .pipe(hash.manifest('dist/assets.json', { // Generate the manifest file
      deleteOld: true,
      sourceDir: __dirname + '/dist/css'
    }))
    .pipe(gulp.dest('.'))
    .pipe(plugins.size({ title: 'styles' }));
});


// Admin CSS task
gulp.task('admin-styles', () => {
  return gulp.src('admin/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      outputStyle: 'compressed',
      includePaths: nodemodules
  }))
    .pipe(plugins.postcss([
      require('autoprefixer')({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }),
      require('postcss-flexbugs-fixes'),
      require('postcss-sorting')({
        'order': [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules'
      ],
        'properties-order': 'alphabetical' }),
      require('postcss-pxtorem')({
            replace: true,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'padding',
            ],
        }),
    ]
    ))
    .pipe(plugins.rename('styles.min.css'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('admin/css'))
    .pipe(browserSync.stream())
    .pipe(plugins.size({ title: 'admin-styles' }));
});

gulp.task('modernizr', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(plugins.modernizr())
    .pipe(plugins.concat('modernizr.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest("dist/js/vendor/"))
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src([
      'src/fonts/**/*',
      nodemodules + '/font-awesome/fonts/*',
//      'node_modules/slick-carousel/slick/fonts/*',
    ])
  .pipe(gulp.dest('dist/fonts'))
})

// Scripts task
gulp.task('scripts', () => {
  return gulp.src([
      nodemodules + '/jquery/dist/jquery.js',
      nodemodules + '/dragscroll/dragscroll.js',
      nodemodules + '/outdated-browser/outdatedbrowser/outdatedbrowser.js',
      nodemodules + '/swiper/dist/js/swiper.js',
      nodemodules + '/magnific-popup/dist/jquery.magnific-popup.js',
      nodemodules + '/hc-sticky/dist/hc-sticky.js',
      nodemodules + '/video.js/dist/video.js',
      nodemodules + '/videojs-youtube/dist/Youtube.js',
      nodemodules + '/clipboard/dist/clipboard.js',
      nodemodules + '/js-cookie/src/js.cookie.js',
    //      nodemodules + '/videojs-vimeo-v2/src/Vimeo.js',
      'src/js/**/*.js',
      '!src/js/vendor/*.js'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
    .pipe(hash())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
    .pipe(hash.manifest('dist/assets.json', { // Generate the manifest file
      deleteOld: true,
      sourceDir: __dirname + '/dist/js'
    }))
    .pipe(gulp.dest('.'))
    .pipe(plugins.size({ title: 'scripts' }));
})


// Vendor JS
gulp.task('vendor', () => {
  return gulp.src('src/js/vendor/*')
  .pipe(gulp.dest('dist/js/vendor'))
})


// Sets a flag for php to detect dev build
gulp.task('dev-env', () => {
  fs.writeFile('dist/development.txt', 'true');
});

// Sets a flag for php to detect dev build
gulp.task('dev-build-message', () => {
  console.log("\x1b[41m", "\x1b[30m", 'RUN prod TASK AFTER DEVELOPMENT BUILD, FOR THE SAKE OF THE USER :)',"\x1b[0m"); // resets coolors at the end
});

// Optimizes images
gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(plugins.plumber())
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [require('imagemin-pngquant')()]
    }))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/img'))
    .pipe(plugins.size({ title: 'images' }));
});


//gulp.task('revRewrite', () => {
//    .pipe(revRewrite({ manifest }))
//    .pipe(gulp.dest('dist'));
//});

// Build task
gulp.task('build-dev', ['dev-env', 'admin-styles', 'styles', 'admin-styles', 'scripts', 'modernizr', 'images', 'fonts', 'favicons']);
gulp.task('build', ['styles', 'admin-styles', 'scripts', 'modernizr', 'images', 'fonts', 'favicons']);
gulp.task('build-prod', ['styles-prod', 'admin-styles', 'scripts', 'modernizr', 'images', 'fonts', 'favicons']);

// Watch task
gulp.task('watch', () => {
  gulp.watch(['src/img/**/*'], ['images', 'favicons']);
  gulp.watch(['src/fonts/**/*'], ['fonts']);
  gulp.watch(['src/scss/**/*.scss'], ['styles', 'modernizr']);
  gulp.watch(['admin/scss/*.scss'], ['admin-styles', 'modernizr']);
  gulp.watch(['src/js/**/*.js'], ['scripts', 'modernizr', 'vendor']);
});


//var uncss = require('gulp-uncss');
//var rename = require('gulp-rename');

//gulp.task('uncss', function () {
//
//    gulp.src('dist/css/styles.min.css')
//        .pipe(uncss({
//    	ignore: [],
//        html: []
//        })).pipe(rename({
//            suffix: '.clean'
//        }))
//
//    .pipe(gulp.dest('dist/css/'));
//
//});

// Default task w UNCSS

// Default task
// Default task
gulp.task('dev', ['build-dev', 'watch', 'browser-sync'], function(){
  gulp.start('dev-build-message');
});
gulp.task('default', ['build']);
gulp.task('prod', ['build-prod']);
