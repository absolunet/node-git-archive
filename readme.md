# @absolunet/git-archive

[![NPM version](https://img.shields.io/npm/v/@absolunet/git-archive.svg)](https://www.npmjs.com/package/@absolunet/git-archive)
[![Travis build](https://api.travis-ci.org/absolunet/node-git-archive.svg?branch=master)](https://travis-ci.org/absolunet/node-git-archive/builds)
[![Dependencies](https://david-dm.org/absolunet/node-git-archive/status.svg)](https://david-dm.org/absolunet/node-git-archive)
[![Dev dependencies](https://david-dm.org/absolunet/node-git-archive/dev-status.svg)](https://david-dm.org/absolunet/node-git-archive?type=dev)

> git archive --remote wrapper


## Install

```sh
$ npm install @absolunet/git-archive
```


## Usage

```js
const gitArchive = require('@absolunet/git-archive');

gitArchive.download('git@github.com:absolunet/node-git-archive.git').then((dir) => {
	console.log(dir);
});

```


## API

### download(url *[, options]*)
Returns a `Promise` with the path of the downloaded archive

#### url
*Required*  
Type: `string`  

Repo url as specified by [git-archive#remote](https://git-scm.com/docs/git-archive#git-archive---remoteltrepogt)

#### options.treeish
Type: `string`  
Default: `master`

The tree or commit to produce an archive for as specified by [git-archive#tree-ish](https://git-scm.com/docs/git-archive#git-archive-lttree-ishgt)

#### options.format
Type: `string`  
Default: `zip`

Format of the resulting archive as specified by [git-archive#format](https://git-scm.com/docs/git-archive#git-archive---formatltfmtgt)

#### options.extract
Type: `boolean`  
Default: `true`

Extract the archive

#### options.path
Type: `string`  
Default: `tmp`

Path and name of the archive file or path of the extracted archive. If not specified will be put in a temporary path.


## License

MIT © [Absolunet](https://absolunet.com)
