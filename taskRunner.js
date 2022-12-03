const { execFile } = require('child_process');

module.exports = (command) => {
    return new Promise((resolve, reject) => {
        execFile(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            if (stderr) {
                reject(stderr);
                return;
            }

            console.log(`stdout:\n${stdout}`);
            resolve(stdout);
        });
    });
};