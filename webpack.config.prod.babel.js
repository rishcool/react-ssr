import webpack from 'webpack';
import path from 'path';
import ReactLoadableSSRAddon from 'react-loadable-ssr-addon';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BUILD_DIR = path.resolve( __dirname, "public" );

module.exports = {
    context: path.resolve( __dirname, "src" ),
    mode: 'production',
    entry: {
        app: ['./client/index.js'],
        styles: './scss/styles.scss',
        vendor: [
            '@babel/polyfill',
            'react-loadable',
            'regenerator-runtime',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'react-router-dom',
            'react-helmet'
        ]
    },
    devtool: 'source-map',
    output: {
        path: BUILD_DIR+'/dist',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath:'/dist/'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '/src'),
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components|public\/)/,
            use: {
                loader: 'babel-loader'
            },
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=fonts/[name].[ext]&limit=1024',
        }, {
            test: /\.(jpg|jpeg|gif|png|svg)$/i,
            exclude: /node_modules/,
            loader: 'file-loader?name=image/[name].[ext]&limit=1024',
        }],
    },
    optimization: {
        nodeEnv: 'production',
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 2,
                },
                default: false,
                styles: {
                    test: /\.s?css$/,
                    name: 'styles',
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                }
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({}),
            new TerserPlugin()
        ],
        runtimeChunk: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new ReactLoadableSSRAddon({
            filename: 'assets-manifest.json',
            integrity: true,
            integrityAlgorithms: ['sha256', 'sha384', 'sha512'],
            integrityPropertyName: 'integrity',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin( { minimize: true, debug: false } ),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        //new BundleAnalyzerPlugin()
    ]
};