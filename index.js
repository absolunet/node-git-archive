//--------------------------------------------------------
//-- Git archive
//--------------------------------------------------------
'use strict';

const { execSync } = require('child_process');
const slash        = require('slash');
const tmp          = require('tmp');
const slugify      = require('@sindresorhus/slugify');


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
				let method;
				if (extract) {
					method = `--format tar.gz | tar -xz --strip 0 -C ${finalPath}`;
				} else {
					method = `--format ${format} --output ${finalPath}`;
				}

				execSync(`git archive --remote=${url} ${treeish} ${method}`, { stdio:'inherit' });
				resolve(finalPath);
			});

		});
	}

}


module.exports = new GitArchive();
