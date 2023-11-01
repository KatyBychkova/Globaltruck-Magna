module.exports = {
    js2svg: {
        pretty: true,
    },
    plugins: [
        'removeDimensions',
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                },
            },
        },
    ],
};
