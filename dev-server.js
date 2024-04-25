const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const port = config.devServer.port || 8080; // Use the port from webpack config or default to 8080

const options = {
  allowedHosts: 'all', // Allow all hosts
};

WebpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Development server listening on port ${port}`);
});
