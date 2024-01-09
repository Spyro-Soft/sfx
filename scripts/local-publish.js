const execSync = require('child_process').execSync;

const localRegistry = 'http://localhost:4873/';

function localPublish() {
  //neither verdaccio nor nx have an option to check if verdaccio is actually running, so we check if the npm registry url is changed to localhost
  const registry = execSync('npm config get registry').toString();
  if (registry.trim() === localRegistry.trim()) {
    execSync(
      `nx run ${process.argv[2]}:version-update && nx run ${process.argv[2]}:build && npm publish dist/libs/${process.argv[2]}`
    );
  } else {
    console.log('Verdaccio is not running!');
    process.exit(1);
  }
}

localPublish();
