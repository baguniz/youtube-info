assert/*! by @WebReflection & @daw985 */

// full module, compatible with node 0.8+ & browser
// https://github.com/WebReflection/tressa

// for sync tests
function assert(condition, message) {
  try {
    console.assert.apply(console, arguments);
    if (typeof message === 'string' && condition) {
      //console.log('✔ ' + message);
    }
  } catch(error) {
    assert.exitCode = 1;
    console.error('✖ ' + error);
  }
}

// for async tests
assert.async = function (fn, timeout) {
  var timer = setTimeout(
    function () { assert(false, 'timeout ' + fn); },
    timeout || assert.timeout
  );
  fn(function () { clearTimeout(timer); });
};

// default timeout
assert.timeout = 10000;

// for node env only
try {
  process.on('exit', function () {
    process.exit(assert.exitCode || 0);
  });
  module.exports = assert;
} catch(browser) {}