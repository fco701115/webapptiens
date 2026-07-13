const { Client } = require('ssh2');

const commands = [
  "cd /root/weboutshop && git pull origin master",
  "pm2 restart weboutshop",
  "sleep 2",
  "curl -s 'http://localhost:3002/api/products' > /dev/null && echo SYNCED",
  "echo DONE"
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
