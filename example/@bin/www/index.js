/* eslint-disable indent */
const http = require('http');
const { argv } = require('yargs');
const { is } = require('describe-type');
const debug = require('debug');
const pipeline = require('../webpack/pipeline');
const normalizePort = require('./utilities/normalize-port');
const wwwError = require('./utilities/www-error');
const app = require('../../app');

const info = debug('eguru:server');
const { NODE_ENV = 'production', HOST = '0.0.0.0', PORT = 3001 } = pipeline.env;
app.set('env', NODE_ENV);
app.set('port', normalizePort(PORT));
app.use(pipeline.serve(argv));

const server = http.createServer(app);
server.listen(PORT, HOST);
server.on('error', err => wwwError(app.get('port'), err));
server.on('listening', () => {
	const addr = server.address();
	const bind = is.string(addr) ? `pipe ${addr}` : `port ${addr.port}`;
	info(`Listening ${HOST} on ${bind} at ${NODE_ENV} mode\n`);
});

module.exports = server;
