const fs = require("fs");

const SNIPPETS = ["./src/ui/Button/button.snippet.json"];

const snippets = SNIPPETS.reduce((into, path) => {
  const json = JSON.parse(fs.readFileSync(path));
  const { tag, children, props } = json;
  const snippet = [
    `// ${path}`,
    `<${tag}`,
    ...renderProps(props),
    children ? `>\n  ${children}\n</${tag}>` : "/>",
  ];
  into[tag] = snippet.filter(Boolean).join("\n");
  return into;
}, {});

fs.writeFileSync(
  "./src/snippets.twigma.json",
  JSON.stringify(snippets, null, 2)
);

function renderProps(props, propsArr = [], indent = "  ") {
  for (let propName in props) {
    const isOptional = Boolean(propName.match(/\?$/));
    const value = props[propName];
    const makePropString = (propVal) => {
      let string = propName.replace(/\?$/, "").replace(/^@/, "");
      string += "=";
      if (propVal.charAt(0) === '"') {
        string += propVal;
      } else {
        string += `{${propVal}}`;
      }
      if (isOptional) {
        string += " // optional";
      }
      return indent + string;
    };
    if (typeof value === "string") {
      propsArr.push(makePropString(value));
    } else {
      for (let propValue in props[propName]) {
        const subArray = [];
        subArray.push(makePropString(`"${propValue}"`));
        renderProps(props[propName][propValue], subArray, indent + "  ");
        propsArr.push(subArray.join("\n"));
      }
    }
  }
  return propsArr;
}
