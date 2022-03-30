const htmlMinifier = require('html-minifier');

module.exports = (config) => {
    config.addPassthroughCopy('./src/assets/css');
    config.addWatchTarget('./src/assets/css/');

    config.setBrowserSyncConfig({
        open: 'local',
    });

    config.addTransform('htmlMinifier', function (content) {
        if (this.outputPath && this.outputPath.endsWith('.html')) {
            return htmlMinifier.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }

        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
