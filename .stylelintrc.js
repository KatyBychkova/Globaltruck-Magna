module.exports = {
    extends: [
        'stylelint-config-css-modules',
        'stylelint-config-rational-order',
    ],
    plugins: [
        'stylelint-order',
    ],
    rules: {
        'order/properties-order': [],
        "plugin/rational-order": [true, {
            'empty-line-between-groups': true,
        }],
    },
};

