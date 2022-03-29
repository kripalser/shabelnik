module.exports = (config) => {
    config.addPassthroughCopy('./src/assets/css');
    config.addWatchTarget('./src/assets/css/');

    config.setBrowserSyncConfig({
        open: 'local',
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
