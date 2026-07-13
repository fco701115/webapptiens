const { Client } = require('ssh2');

const commands = [
  "pm2 logs weboutshop --lines 15 --nostream",
  "sleep 2",
  "cd /root/weboutshop && curl -s -o /dev/null -w 'PRODUCT_URL:%{http_code}\\n' http://localhost:3002/Vestidos/vestido-floral-de-verano-1",
  "cd /root/weboutshop && curl -s -o /dev/null -w 'API:%{http_code}\\n' http://localhost:3002/api/products/1",
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
    stream.on('data', (d) => process.stdout.write(d));
    stream.stderr.on('data', (d) => process.stdout.write(d));
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
