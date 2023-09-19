const fs = require("fs");

const SNIPPETS = ["./src/ui/Button/button.snippet.json"];

const snippets = SNIPPETS.reduce((into, path) => {
  const json = JSON.parse(fs.readFileSync(path));
  into[json.tag] = { ...json };
  return into;
}, {});

fs.writeFileSync(
  "./src/snippets.example.json",
  JSON.stringify(snippets, null, 2)
);
