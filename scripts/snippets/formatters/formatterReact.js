export default function formatterReact(snippet, snippetObject, paramsValues) {
  const { name, props, params } = snippet;
  if (Array.isArray(snippetObject)) {
    const arr = [];
    snippetObject.forEach((object) => {
      arr.push(formatInstance(name, object, props, params, paramsValues));
    });
    return arr.join("\n");
  } else {
    return formatInstance(name, snippetObject, props, params, paramsValues);
  }
}

function formatInstance(name, object, props, params, paramsValues) {
  const children =
    "children" in object && object.children
      ? formatValue(object.children, paramsValues, params)
      : null;
  const singleLine = Object.keys(object).length <= 3;
  const array = [
    `<${name}`,
    ...formatProps(object, props, params, paramsValues),
  ];
  if (children) {
    array.push(">", `  ${children}`, `</${name}>`);
  } else {
    array.push("/>");
  }
  return array.join(singleLine ? " " : "\n");
}

function formatProps(object, props, params, paramsValues) {
  const propsArr = [];
  for (let propName in object) {
    if (propName !== "children") {
      const type = props[propName] || props["*"] || "string";
      const value = formatValue(object[propName] || "", paramsValues, params);
      if (value !== null) {
        propsArr.push(
          `  ${propName}=` + (type === "string" ? `"${value}"` : `{${value}}`)
        );
      }
    }
  }
  return propsArr;
}

function formatValue(rawValue, paramsValues, params) {
  let value = rawValue;
  for (let p in paramsValues) {
    const defaultValue =
      params[p] && params[p] !== "undefined" ? params[p] : undefined;
    value =
      value.match(p) && paramsValues[p] === "undefined"
        ? defaultValue || "undefined"
        : value.replace(new RegExp(p, "g"), paramsValues[p] || "");
  }
  const ternary = value.match(/^(.+)=(.+)\?(.+):(.+)$/);
  if (ternary) {
    const [_, param, val, truthy, falsey] = ternary;
    value = param === val ? truthy : falsey;
  }

  return value !== "undefined" ? value : null;
}
