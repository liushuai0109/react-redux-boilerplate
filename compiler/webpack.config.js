const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const projectConfig = require(process.cwd() + '/config');

const projectName = `/${path.basename(process.cwd())}/`;
const defaultConfig = {
    devtool: 'cheap-module-eval-source-map',
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
    },
    devServer: {
        compress: true,
        port: 9000,
        hot: true
    }
};

const htmlWebpackPluginConfig = {
    template: path.join(process.cwd(), 'index.html'),
    filename: path.join(__dirname, `build/public/${projectName}/index.html`),
    inject: 'body'
}

/**
 *
 * @param env   webpack环境变量，命令行参数--env值
 * @param argv  webpack命令行参数
 * @param conf  项目自定义配置
 * @returns {{devtool: string, entry: [string,string,string], output: {path: (*|string), filename: string, publicPath: string}, plugins: [*,*,*,*], module: {rules: [*,*,*,*,*]}, resolve: {modules: [*,string]}}}
 */
module.exports = function (env, argv) {
    var entry = [
        'eventsource-polyfill', // necessary for hot reloading with IE
        //'webpack-hot-middleware/client'
    ], plugins = [
        /**
         * This is a webpack plugin that simplifies creation of HTML files to serve your
         * webpack bundles. This is especially useful for webpack bundles that
         * include a hash in the filename which changes every compilation.
         */
        new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    ], projectWebpackConfig =  projectConfig[env || 'dev'] || projectConfig;

console.log(projectWebpackConfig);
    switch (env) {
        case 'prod':
            plugins = plugins.concat([
                /**
                 * This plugin assigns the module and chunk ids by occurence count. What this
                 * means is that frequently used IDs will get lower/shorter IDs - so they become
                 * more predictable.
                 */
                new webpack.optimize.OccurenceOrderPlugin(),
                /**
                 * See description in 'webpack.config.dev' for more info.
                 */
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('production')
                }),
                /**
                 * Some of you might recognize this! It minimizes all your JS output of chunks.
                 * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
                 * your production code through this!
                 */
                new webpack.optimize.UglifyJsPlugin({
                    compressor: {
                        warnings: false
                    }
                })
            ]);
            break;
        case 'dev':
        default:
            plugins = plugins.concat([
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
                 * DefinePlugin allows us to define free variables, in any webpack build, you can
                 * use it to create separate builds with debug logging or adding global constants!
                 * Here, we use it to specify a development build.
                 */
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development')
                })
            ]);
            break;
    }
    return webpackMerge({}, defaultConfig, {
        devtool: env === 'prod' ? 'source-map' : 'cheap-module-eval-source-map',
        entry: env === 'prod' ? []: entry,
        output: {
            path: path.join(__dirname, `build/public/${projectName}`),
            filename: '[name]-[hash].js',
            publicPath: projectName
        },
        plugins: plugins,
        resolve: {
            modules: [
                path.resolve(__dirname, '../src'),
                path.resolve(process.cwd(), 'node_modules'),
                '../node_modules'
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, `build/public`)
        }
    }, projectWebpackConfig)
}


module.exports.htmlWebpackPluginConfig = htmlWebpackPluginConfig;
