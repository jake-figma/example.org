const fs = require("fs");

const SNIPPET_ROOT = "./src/ui/";
const SNIPPETS = [
  "Button/Button.snippet.json",
  "Button/IconButton.snippet.json",
];

const snippets = SNIPPETS.reduce((into, path) => {
  const json = JSON.parse(fs.readFileSync(SNIPPET_ROOT + path));
  into[json.name] = { ...json };
  return into;
}, {});

fs.writeFileSync(
  "./scripts/snippets/snippets.example.json",
  JSON.stringify(snippets, null, 2)
);
