const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const {
  IMAGEMIN_SRC_DIR, IMAGEMIN_SRC_GLOB, IMAGEMIN_FILE_EXTENSIONS, IMAGEMIN_DEST_DIR,
} = process.env;

/**
 * @type {{srcDir: string, glob: string, fileExtensions: string, destDir: string, plugins: object}}
 */
module.exports = {
  srcDir: IMAGEMIN_SRC_DIR || './src/images',
  glob: IMAGEMIN_SRC_GLOB || '**',
  fileExtensions: IMAGEMIN_FILE_EXTENSIONS || '{gif,jpg,png,svg}',
  destDir: IMAGEMIN_DEST_DIR || './web/images',
  plugins: {
    gifscale: {
      options: {
        // @see https://github.com/imagemin/imagemin-gifsicle#api
        interlaced: true,
        optimizationLevel: 2,
      },
    },
    jpegtran: {
      options: {
        // @see https://github.com/imagemin/imagemin-jpegtran#api
        progressive: true,
      },
    },
    svgo: {
      options: {
        // @see https://github.com/imagemin/imagemin-svgo#api
        plugins: [
          {
            cleanupAttrs: true,
            sortAttrs: true,
          },
        ],
      },
    },
    pngquant: {
      // @see https://github.com/imagemin/imagemin-pngquant#api
      options: {},
    },
  },
};
