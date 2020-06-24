const fs = require('fs');
const request = require('request');
const core = require('@actions/core');

function run() {
  try {
    const goVersionFile = core.getInput('go-version');
    let newGoVersion = ''

//    if (!fs.existsSync(goVersionFile)) {
//      console.log(`File do not exists: ${goVersionFile}`)
//      return process.exit(1);
//    }

    request('https://golang.org/dl/?mode=json', { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      for (let release of body) {
        if (release.stable) {
          newGoVersion = release.version.substr(2);
          break;
        }
      }

      fs.writeFile(goVersionFile, newGoVersion, function(err, data) {
        if (err) {
          return console.log(err);
        }
      });

      core.setOutput('go-version', `${newGoVersion}`);
      core.setOutput('pr-title', `Update to latest Go release ${newGoVersion}`);
      core.setOutput('branch-name', `refresh-go/patch-${newGoVersion}`);
    });
  }
  catch (error) {
    core.setFailed(error.message);
  }
}


run()
