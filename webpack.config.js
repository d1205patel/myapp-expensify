const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

require('dotenv').config({path:'.env'});

module.exports = (env) => {

    const isProduction = env === 'production';
    const extractSCSS = new ExtractTextPlugin('styles.css');
    const extractCSS = new MiniCssExtractPlugin({filename:'styles.min.css'});


    return {
        mode: isProduction ? "production":"development",
        entry: ["@babel/polyfill","./src/app.js"],
        output : {
            path: path.resolve(__dirname, "public"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.scss$/,
                    use: isProduction ? extractSCSS.extract( ['css-loader','sass-loader'] ) : ['style-loader','css-loader','sass-loader']

                },
                {
                    test: /\.css$/,
                    use: isProduction ? [MiniCssExtractPlugin.loader,'css-loader']: ['style-loader','css-loader']
                }]
        },
        plugins: [
            extractSCSS,
            extractCSS,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
            })
        ],
        devtool: isProduction ? 'source-map':'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true
        }
    }
}