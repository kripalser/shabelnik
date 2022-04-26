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

    config.addFilter('typography', (value) => {
        const noBreakSpace = '\u00A0';
        const thinSpace = '\u2009';
        const narrowNoBreakSpace = '\u202F';

        return value
            .replace(/([А-ЯЁ])\.\s/g, `$1.${narrowNoBreakSpace}`) // Initials
            .replace(/№\s/g, `№${narrowNoBreakSpace}`) // Numero sign
            .replace(/\s—\s/g, `${noBreakSpace}— `) // Em dash
            .replace(/(?<![,№])(\s)(\d+)\s?$/g, `${noBreakSpace}$2`) // Number at the end if not preceded by comma or numero sign
            .replace(/\s([a-zа-яё])\s/gi, ` $1${noBreakSpace}`) // One-letter words
            ;
    });

    config.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
