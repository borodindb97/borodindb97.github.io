const path = require('path');

module.exports = {
    entry: './src/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['css-loader'],
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
};

