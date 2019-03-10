import webpack from 'webpack';
import path from 'path';
import ReactLoadableSSRAddon from 'react-loadable-ssr-addon';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BUILD_DIR = path.resolve( __dirname, "public" );


let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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
]

if(process.env.NODE_ENV == 'analyze'){
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    context: path.resolve( __dirname, "src" ),
    mode: 'development',
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
    devtool: 'inline-source-map',
    output: {
        path: BUILD_DIR+'/dist',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath:'/dist/'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '/src'),
        ],
        extensions: ['.js', '.jsx', '.json']
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
                        modules: false,
                        importLoaders: 2,
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
        nodeEnv: 'development',
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 2,
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
                /*styles: {
                    test: /\.s?css$/,
                    name: 'styles',
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                }*/
            },
        }
    },
    plugins
};