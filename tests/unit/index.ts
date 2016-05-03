import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import generate from 'intern/dojo/node!../../index';
import * as fs from 'intern/dojo/node!fs';

registerSuite({
	name: 'index',
	'api': function () {
		assert.isFunction(generate, 'generate should be a function');
	},
	'generate': function () {
		return generate({
			name: 'foo',
			project: 'tests/support/foo',
			baseDir: 'tests/support/foo/src',
			// files: [ 'index.ts' ],
			out: 'tmp/foo.d.ts'
		}).then(function () {
			const contents = fs.readFileSync('tmp/foo.d.ts', { encoding: 'utf8' });
			assert(contents, 'foo.d.ts should exist and have contents');
			assert.include(contents, `module 'foo/index'`);
			assert.include(contents, `module 'foo/Bar'`);
		});
	},
	'es6 main module': function () {
		return generate({
			name: 'foo',
			project: 'tests/support/foo-es6',
			out: 'tmp/foo.es6.d.ts',
			main: 'index.ts'
		}).then(function () {
			const contents = fs.readFileSync('tmp/foo.es6.d.ts', { encoding: 'utf8' });
			assert(contents, 'foo.es6.d.ts should exist and have contents');
			// assert.include(contents, `module 'foo/index'`);
			// assert.include(contents, `module 'foo/Bar'`);
		});
	}
});
