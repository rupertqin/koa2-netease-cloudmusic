'use strict'
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ["./client/js/app.js"],
    },
    output: {
        path: __dirname + '/public/static/dist/',
        filename: "[name].bundle.js",
        publicPath: '/public/static/dist/',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ["web_modules", "node_modules"]
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader",'raw!autoprefixer?{browsers:["safari >= 7", "Firefox 15", "ie >= 8", "chrome >= 34"]}!sass') },
            // { test: /\.css$/, loader: 'style!raw' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "raw-loader") },
           // { test: /\.(png|gif|jpg)$/, loader: 'file?name=img/[name].[ext]&path=../../img/[name].[ext]' },
            { test: /\.png$/, loader: 'file?name=i/[hash].[ext]' },
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel'}
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};