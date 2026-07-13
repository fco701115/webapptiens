const { Client } = require('ssh2');
const conn = new Client();
const path = require('path');

const mode = process.argv[2] || 'exec';
const cmd = process.argv[3] || 'echo connected';

conn.on('ready', () => {
  if (mode === 'upload') {
    const localPath = path.resolve(process.argv[4]);
    const remotePath = process.argv[5];
    console.log('Uploading', localPath, '->', remotePath);
    conn.sftp((err, sftp) => {
      if (err) { console.log('SFTP ERROR:', err); conn.end(); return; }
      sftp.fastPut(localPath, remotePath, (err) => {
        if (err) { console.log('UPLOAD ERROR:', err); }
        else { console.log('UPLOADED:', remotePath); }
        conn.end();
      });
    });
  } else {
    conn.exec(cmd, (err, stream) => {
      if (err) { console.log('EXEC ERROR:', err); conn.end(); return; }
      stream.on('close', () => conn.end());
      stream.on('data', (data) => process.stdout.write(data));
      stream.stderr.on('data', (data) => process.stderr.write(data));
    });
  }
}).on('error', (err) => {
  console.log('ERROR:', err.message);
}).connect({
  host: '13.140.153.222',
  port: 22,
  username: 'root',
  password: 'fco8523al',
  readyTimeout: 15000
});
