const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const htmlMinifier = require('html-minifier');

module.exports = (config) => {
    config.addPassthroughCopy('./CNAME');
    config.addPassthroughCopy('./src/assets/css');
    config.addPassthroughCopy('./src/assets/img');
    config.addWatchTarget('./src/assets/css/');

    config.setBrowserSyncConfig({
        open: 'local',
    });

    config.addCollection('items', function (collectionApi) {
        const tags = ['books', 'filmstrips', 'magazines'];

        // Copied getFilteredByTags, just changed `every` to `some`
        return collectionApi.getAllSorted().filter((item) =>
            tags.some((requiredTag) => {
                const itemTags = item.data.tags;
                if (Array.isArray(itemTags)) {
                    return itemTags.includes(requiredTag);
                } else {
                    return itemTags === requiredTag;
                }
            })
        );
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
