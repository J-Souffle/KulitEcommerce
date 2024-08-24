const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8001,
    open: true,
    proxy: {
      '/payment': {
        target: 'https://www.kulit.us',
        secure: false,
        changeOrigin: true,
      },
      '/newsletter': {
        target: 'https://www.kulit.us',
        secure: false,
        changeOrigin: true,
      },
      '/support': {
        target: 'https://www.kulit.us',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
