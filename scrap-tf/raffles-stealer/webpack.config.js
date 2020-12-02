const path = require('path');
const WebpackUserscript = require('webpack-userscript');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let includeOnSites = [
    /^https?:\/\/scrap\.tf\/raffles*/
];
includeOnSites = includeOnSites.map((x) => x.toString());

module.exports = {
    mode: 'production',
    entry: {
        'rafflesStealer': path.join(__dirname, 'src', 'raffles-stealer.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'raffles-stealer.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new WebpackUserscript({
            headers: {
                name: '[name]',
                version: '[version]',
                author: '[author]',
                description: '[description]',
                homepage: '[homepage]',
                namespace: '[homepage]',
                icon: 'https://scrap.tf/favicon-32x32.png?v=4',
                'run-at': 'document-idle',
                grant: 'none',
                noframes: true,
                include: includeOnSites,
                supportURL: 'https://github.com/Giglium/tf2-UserScript/issues'
            },
            pretty: false,
            updateBaseUrl: 'https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/raffles-stealer/dist/raffles-stealer.meta.js',
            downloadBaseUrl: 'https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/raffles-stealer/dist/raffles-stealer.user.js'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            node_modules: path.join(__dirname, 'node_modules')
        }
    }
};
