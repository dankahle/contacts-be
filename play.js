

const { execFile } = require('child_process');
const child = execFile('./initdbunit.sh', [], (error, stdout, stderr) => {
//   const child = execFile('./test.sh', [], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
