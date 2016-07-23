const path = require('path');
const webpack = require('webpack');
const WebpackStripLoader = require('strip-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, 'src/'),
    public: path.join(__dirname, 'public'),
    img: path.join(__dirname, 'src/img'),
    dist: path.join(__dirname, 'dist'),
    template: path.join(__dirname, 'index.html'),
    paintingsSrc: path.join(__dirname, 'public/paintings'),
    paintingsDest: path.join(__dirname, 'dist/paintings'),
    paintingsJson: path.join(__dirname, 'public/paintings.json')
};

config = {
    entry: {
        app: PATHS.src + '/index.js'
    },
    output: {
        path: PATHS.public,
        filename: 'bundle.js',
        publicPath: 'http://localhost:3333/',
    },
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        port: 3333,
        contentBase: PATHS.public
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: PATHS.src,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                include: PATHS.img
            }
        ]
    },
    plugins: []
}

if (process.env.NODE_ENV === 'prod') {
    config.output.path = PATHS.dist;
    config.output.publicPath = '/';
    config.module.loaders.push({
        test: /\.scss$/,
        exclude: [
            path.join(__dirname, './node_modules/')
        ],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    });
    config.module.loaders.push(stripLoader = {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: WebpackStripLoader.loader('console.log')
    });
    config.plugins.push(new CleanWebpackPlugin([PATHS.dist], {
        root: __dirname,
        verbose: true,
        dry: false
    }));
    config.plugins.push(
        new CopyWebpackPlugin([{
            from: PATHS.paintingsSrc,
            to: PATHS.paintingsDest
        }])
    );
    config.plugins.push(
        new CopyWebpackPlugin([{
            from: PATHS.paintingsJson
        }])
    );
    config.plugins.push(new ExtractTextPlugin("./bundle.css"));
    config.plugins.push(new HtmlWebpackPlugin({
        hash: false,
        title: 'Painting Gallery',
        filename: 'index.html',
        template: PATHS.template,
    }));
}

else {
    config.module.loaders.push(
        {
            test: /\.scss$/,
            loaders: ['style', 'css?sourceMap', 'sass'],
            include: PATHS.style
        }
    );
    config.plugins.push(new HtmlWebpackPlugin({
        hash: true,
        title: 'Painting Gallery',
        filename: 'index.html',
        template: PATHS.template,
    }));
}

module.exports = config;
