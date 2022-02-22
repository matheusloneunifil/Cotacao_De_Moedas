const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path'); // resolve path
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css to files

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    target: 'web',
    devServer: {
        // contentBase: path.join(__dirname, '../dist'),
        port: 4022,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].[hash].css'
        })
    ],

    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});
