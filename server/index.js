const fs = require('fs');
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

const compilerPath = '../../libra/target/debug/compiler';

app.use(cors({
  origin: '*',
}));
app.use(express.static('public'));
app.use(bodyParser.text({ type: 'text/html'}));

app.get('/libra/compiler', function (req, res) {
  const compiler = exec(`${compilerPath} --version`, (error, compiled, stderr) => {
    res.send(compiled);
  });
});

app.post('/libra/compile', function (req, res) {
  const fileName = `temp_${(new Date()).getTime()}`;
  const filePath = process.cwd() + '/' + fileName;
  const command = `${compilerPath} ${req.query.type === 'm' ? '-m ' : ''}${filePath}`;

  fs.writeFile(fileName ,req.body, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      const compiled = exec(command, (error, compiled, stderr) => {
        fs.unlink(fileName, (err) => {
          if (err) throw err;
          console.log(`${fileName} was deleted`);
        });
        res.send(compiled);
      });
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
