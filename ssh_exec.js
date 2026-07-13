const { Client } = require('ssh2');

const commands = [
  "pm2 status",
  "pm2 logs weboutshop --lines 15 --nostream",
  "curl -s http://localhost:3002 | head -c 100",
  "echo ''",
  "ss -tlnp | grep 3002"
];

let idx = 0;
const conn = new Client();

function runNext() {
  if (idx >= commands.length) { conn.end(); return; }
  const cmd = commands[idx++];
  console.log('\n[' + (idx) + '] ' + cmd);
  conn.exec(cmd, (err, stream) => {
    if (err) { console.log('ERROR:', err); conn.end(); return; }
    stream.on('close', () => { runNext(); });
    stream.on('data', (data) => process.stdout.write(data));
    stream.stderr.on('data', (data) => process.stdout.write(data));
  });
}

conn.on('ready', () => {
  console.log('Connected!');
  runNext();
}).on('error', (err) => {
  console.log('ERROR:', err.message);
}).connect({
  host: '13.140.153.222',
  port: 22,
  username: 'root',
  password: 'fco8523al',
  readyTimeout: 15000
});
