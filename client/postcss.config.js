import postcss from 'postcss';
import cssnano from 'cssnano';
import litePreset from 'cssnano-preset-lite';
import autoprefixer from 'autoprefixer';
const preset = litePreset({ discardComments: false });

postcss([cssnano({ preset, plugins: [autoprefixer] })]);
