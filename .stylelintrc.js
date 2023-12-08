module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-css-modules',
        'stylelint-config-rational-order',
    ],
    plugins: [
        'stylelint-order',
    ],
    rules: {
        'selector-class-pattern': null,
        'declaration-empty-line-before': null,
        'order/properties-order': [],
        "plugin/rational-order": [true, {
            'empty-line-between-groups': true,
        }],
    },
};

