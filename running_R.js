var child_process = require('child_process');
var r_comm = 'R';
var rspawn = child_process.spawn(r_comm,['--vanilla','--slave']);

rspawn.stdout.on('data', function (data) {
	  console.log(data.toString());
});

rspawn.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
		if ((data.toString().search("error") != -1) ) {
			console.log('process has been killed - "error" keyword found in stderr!');
			rspawn.kill('SIGTERM');
		}
});

rspawn.on('close', function (code) {
	  console.log('child process exited with code ' + code);
});

rspawn.stdin.write("message('bam bam')\n");
rspawn.stdin.write("message('tada!')\n");
