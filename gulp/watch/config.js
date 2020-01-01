const copy = require('../copy/config');
const html = require('../html/config');
const imagemin = require('../imagemin/config');
const js = require('../js/config');
const sass = require('../sass/config');

module.exports = {
  targets: [
    {
      ...copy,
      task: 'copy',
    },
    {
      ...html,
      glob: '**',
      task: 'html',
    },
    {
      ...imagemin,
      glob: '**',
      task: 'imagemin',
    },
    {
      ...js,
      glob: '**',
      task: 'js',
    },
    {
      ...sass,
      glob: '**',
      task: 'sass',
    },
  ],
};
