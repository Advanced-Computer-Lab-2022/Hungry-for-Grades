const { mergeConfig } = require('vite');

module.exports = {
    "typescript": {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        }
    },
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        'storybook-dark-mode'
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },
    "features": {
        "storyStoreV7": true
    },
    async viteFinal(config) {
        // Merge custom configuration into the default config
        return mergeConfig(config, {
            // Use the same "resolve" configuration as your app
            optimizeDeps: {
                include: ['storybook-dark-mode'],
            },
        });
    }
}