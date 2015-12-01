var related = require('./');
var pkg = require('./package');

var deps = Object.keys(pkg.dependencies)

related(deps, {verbose: true}, function(err, pkgs) {
  if (err) return console.log(err);
  console.log(pkgs)
});
