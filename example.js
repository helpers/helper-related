const related = require('./')();
const pkg = require('./package');
const deps = Object.keys(pkg.dependencies);
const opts = {
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
