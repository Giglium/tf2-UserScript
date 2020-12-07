const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let includeOnSites = [
    /^https?:\/\/.*\.?scrap\.tf\/(auctions|weapons|hats|items|unusuals|skins|killstreaks|stranges|partswap|raffles).*/
];
includeOnSites = includeOnSites.map((x) => x.toString());

module.exports = {
    mode: "production",
    entry: {
        "openOnBackpack": path.join(__dirname, "src", "open-on-backpack.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "open-on-backpack.js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
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
                name: "[name]",
                version: "[version]",
                author: "[author]",
                description: "[description]",
                homepage: "[homepage]",
                namespace: "[homepage]",
                icon: "https://scrap.tf/favicon-32x32.png?v=4",
                "run-at": "document-end",
                grant: "none",
                noframes: true,
                include: includeOnSites,
                supportURL: "https://github.com/Giglium/tf2-UserScript/issues"
            },
            pretty: false,
            updateBaseUrl: "https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/open-on-backpack/dist/open-on-backpack.meta.js",
            downloadBaseUrl: "https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/open-on-backpack/dist/open-on-backpack.user.js"
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            node_modules: path.join(__dirname, "node_modules")
        }
    }
};
