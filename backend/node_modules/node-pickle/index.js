const spawn = require('child_process').spawn,
      Bluebird = require('bluebird');

module.exports.loads = function loads(pickle) {
  return new Bluebird((resolve, reject) => {
    const convert = spawn('/usr/bin/env', ['python', __dirname + '/convert.py', '--loads']),
          stdout_buffer = [];

    convert.stdout.on('data', function(data) {
      stdout_buffer.push(data);
    });

    convert.on('exit', function(code) {
      const data = stdout_buffer.join('');
      if (data === -1) {
        resovle(false);
      } else {
        let result;
        try {
          result = JSON.parse(data);
        } catch (err) {
          result = false;
        }
        resolve(result);
      }
    });

    convert.stdin.write(pickle);
    convert.stdin.end();

  })
};

module.exports.dumps = function dumps(raw, callback) {
  return new Bluebird((resolve, reject) => {
    const convert = spawn('/usr/bin/env', ['python', __dirname + '/convert.py', '--dumps']),
          stdout_buffer = [];

    convert.stdout.on('data', function(data) {
      stdout_buffer.push(data);
    });

    convert.on('exit', function(code) {
      const data = stdout_buffer.join('');

      resolve(
        data === '-1' ? false : data
      );
    });

    convert.stdin.write(JSON.stringify(raw));
    convert.stdin.end();

  })
};
