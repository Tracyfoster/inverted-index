const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const reload = browserSync.reload;

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: './app/'
  });
});

gulp.task('sync', ['browser-sync'], () => {
  gulp.watch('./app/index.html').on('change', reload);
  gulp.watch('./app/css/*.css').on('change', reload);
  gulp.watch('./app/js/*.js').on('change', reload);
});

gulp.task('browserify', () =>
    browserify('./tests/invertedIndex.spec.js')
        .bundle()
        .pipe(source('app-test.js'))
        .pipe(gulp.dest('./tests'))
);


gulp.task('default', ['browserify', 'sync']);