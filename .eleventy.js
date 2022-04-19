const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const htmlMinifier = require('html-minifier');

module.exports = (config) => {
    config.addPassthroughCopy('./CNAME');
    config.addPassthroughCopy('./src/assets/css');
    config.addPassthroughCopy('./src/assets/img');
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

    config.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};