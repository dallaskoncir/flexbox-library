var gulp = require('gulp');

// Loads plugins that are specific to gulp automatically
var p = require('gulp-load-plugins')();

// Load plugins not specific to gulp manually
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src('./styles/scss/styles.scss')
    .pipe(p.sourcemaps.init())
    .pipe(p.sass())
    .pipe(p.autoprefixer())
    .pipe(p.cleanCss())
    .pipe(p.sourcemaps.write('./'))
    .pipe(gulp.dest('./styles/'))
    .pipe(reload({ stream:true }))
});

gulp.task('watch', function() {
  gulp.watch('./styles/scss/*.scss', ['styles']);
});

// Start the server
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "flexbox-library.local"
  });
});

// Default gulp task
gulp.task('default', ['styles', 'watch', 'browser-sync']);