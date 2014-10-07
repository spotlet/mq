
function run (t, path) {
  try {
    require(path);
    console.log("  `%s' ok...", t);
  } catch (e) {
    console.error("  `%s' fail...", t);
  }
}

run ("Command", './command');
