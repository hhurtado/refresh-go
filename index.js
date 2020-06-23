const core = require('@actions/core');

async function run() {
  try {
    const goVersionFile = core.getInput('go-version');
    let currentGoVersion = ''
    let newGoVersion = ''

    console.log(`Looking for version in path ${goVersionFile}`)

    if (currentGoVersion !== newGoVersion) {
      core.setOutput('pr-title', `Update to latest Go release ${newGoVersion}`);
      core.setOutput('branch-name', `refresh-go/patch-${newGoVersion}`);
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}


run()
