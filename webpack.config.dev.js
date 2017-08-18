const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: '/'
    },
    plugins: [
        /**
         * This is where the magic happens! You need this to enable Hot Module Replacement!
         */
        new webpack.HotModuleReplacementPlugin(),
        /**
         * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
         * there are errors during compiling - essentially, assets that include errors
         * will not be emitted. If you want your webpack to 'fail', you need to check out
         * the bail option.
         */
        new webpack.NoEmitOnErrorsPlugin(),
        /**
         * This is a webpack plugin that simplifies creation of HTML files to serve your
         * webpack bundles. This is especially useful for webpack bundles that
         * include a hash in the filename which changes every compilation.
         */
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            title: 'Redux Redux Boilerplate',
            inject: 'body'
        }),
        /**
         * DefinePlugin allows us to define free variables, in any webpack build, you can
         * use it to create separate builds with debug logging or adding global constants!
         * Here, we use it to specify a development build.
         */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    }
};
