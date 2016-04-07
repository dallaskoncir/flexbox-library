var gulp = require('gulp');

// Loads plugins that are specific to gulp automatically
var p = require('gulp-load-plugins')();

// Load plugins not specific to gulp manually
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src('./styles/scss/styles.scss')
    // Using a custom plumber task for error reporting
    .pipe(customPlumber('Error Running Sass'))
    .pipe(p.sourcemaps.init())
    .pipe(p.sass())
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write('./'))
    .pipe(gulp.dest('./styles/'))
    .pipe(reload({ stream:true }))
});

function customPlumber(errTitle) {
  return p.plumber({
    errorHandler: p.notify.onError({
      // Customizing error title
      title: errTitle || "Error Running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass"
    })
  });
}

gulp.task('watch', function() {
  gulp.watch('./styles/scss/*.scss', ['styles']);
});

// Start the server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Default gulp task
gulp.task('default', ['styles', 'watch', 'browser-sync']);