const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
});

gulp.task('sync', ['browser-sync'], () => {
  gulp.watch('./app/index.html', browserSync.reload);
  gulp.watch('./app/css/*.css', browserSync.reload);
  gulp.watch('./app/js/*.js', browserSync.reload);
});

gulp.task('browserify', () =>
    browserify('./tests/classtest.js')
        .bundle()
        .pipe(source('classtest.js'))
        .pipe(gulp.dest('./tests'))
);


gulp.task('default', ['browserify', 'sync']);