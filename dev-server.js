const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const options = {
  allowedHosts: 'all', // Allow all hosts
};

WebpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Development server listening on port 3000');
});
