var related = require('./')();
var pkg = require('./package');

var deps = Object.keys(pkg.dependencies);
var opts = {
  verbose: true,
  helpers: {
    truncate: function(str) {
      return str;
    }
  }
};

related(deps, opts, function(err, pkgs) {
  if (err) return console.log(err);
  console.log(pkgs)
});
