//--------------------------------------------------------
//-- Git archive
//--------------------------------------------------------
'use strict';

const os           = require('os');
const fs           = require('fs');
const { execSync } = require('child_process');
const slash        = require('slash');
const tmp          = require('tmp');
const slugify      = require('@sindresorhus/slugify');

const isWindowsShell = () => {
	return os.type().toLowerCase().includes('windows') && !process.env.SHELL; // eslint-disable-line no-process-env
};

const getPath = ({ url, treeish, format, extract, path }) => {
	return new Promise((resolve) => {

		if (path) {
			resolve(path);
		} else {

			tmp.setGracefulCleanup();

			const prefix = slugify(`absolunetgitarchive-${url}-${treeish}`);

			if (extract) {
				tmp.dir({ prefix:`${prefix}-`, unsafeCleanup:true }, (err, tmpPath) => {
					if (err) {
						throw new Error(err);
					}

					resolve(tmpPath);
				});

			} else {
				tmp.file({ prefix:`${prefix}-`, postfix:`.${format}`, unsafeCleanup:true }, (err, tmpFile) => {
					if (err) {
						throw new Error(err);
					}

					resolve(tmpFile);
				});
			}
		}
	});
};






class GitArchive {

	// The tree or commit to produce an archive for.
	download(url, { treeish = 'master', format = 'zip', extract = true, path } = {}) {
		return new Promise((resolve) => {

			getPath({ url, treeish, format, extract, path }).then((_finalPath) => {
				const finalPath = slash(_finalPath);
				const method = `git archive --remote=${url} ${treeish}`;
				const options = { stdio:'inherit' };

				if (extract) {
					const fileName = `${finalPath}/archive`;
					execSync(`${method} --format tar.gz --output ${fileName}`, options);
					const tarFileName = `${isWindowsShell() ? fileName : fileName.replace(/([A-Z]):\//u, '/$1/')}`;
					execSync(`tar -xf ${tarFileName} -C ${finalPath}`, { stdio:'ignore' });
					fs.unlinkSync(fileName);
				} else {
					execSync(`${method} --format ${format} --output ${finalPath}`, options);
				}

				resolve(finalPath);
			});

		});
	}

}


module.exports = new GitArchive();
