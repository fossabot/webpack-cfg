const { join, resolve } = require('path');
const { is } = require('describe-type');
const { sync } = require('glob');
const { argv, source } = require('../@/config');
const spawn = require('../@/spawn');

const context = is.string(argv.c) ? argv.c : `${source}/**`;
const files = is.array(argv.f) ? `{${argv.f.join(',')}}` : argv.f || '*';
sync(resolve(`${join(context, files)}.bench.js`)).forEach(file => {
	spawn.sync('node', [file]);
});
