figma.codegen.on("generate", (event) => {
  return new Promise(async (resolve) => {
    if (!["COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(event.node.type)) {
      return resolve([
        {
          language: "PLAINTEXT",
          code: "Select a component",
          title: `Component Snippets`,
        },
      ]);
    }
    const SNIPPETS = snippets();
    const rawName =
      event.node.parent.type === "COMPONENT_SET"
        ? event.node.parent.name
        : event.node.name;
    const name = capitalizedNameFromName(rawName);
    const snippet = SNIPPETS[name];
    if (snippet) {
      const params = await paramsFromNode(event.node);
      resolve(blocks(snippet, params, name));
    } else {
      resolve([
        {
          language: "PLAINTEXT",
          code: "No snippets found",
          title: `Component Snippets`,
        },
      ]);
    }
  });
});

async function paramsFromNode(node) {
  const nodeToProcess =
    node.type === "COMPONENT"
      ? node.parent.type === "COMPONENT_SET"
        ? node.parent
        : node
      : node;
  const valueObject =
    nodeToProcess.type === "INSTANCE"
      ? nodeToProcess.componentProperties
      : nodeToProcess.componentPropertyDefinitions;
  const valueKey = nodeToProcess.type === "INSTANCE" ? "value" : "defaultValue";
  const object = {};
  for (let propertyName in valueObject) {
    const value = valueObject[propertyName][valueKey];
    const type = valueObject[propertyName].type;
    const cleanName = sanitizePropertyName(propertyName);
    object[cleanName] = object[cleanName] || {};
    object[cleanName][type] =
      type === "INSTANCE_SWAP"
        ? capitalizedNameFromName(await figma.getNodeById(value).name)
        : value;
  }
  const params = {};
  const types = ["TEXT", "VARIANT", "INSTANCE_SWAP"];
  for (let key in object) {
    const item = object[key];
    const hasBoolean = "BOOLEAN" in item;
    const booleanCheck = !hasBoolean || item.BOOLEAN;
    let value;
    types.forEach((type) => {
      if (type in item) {
        if (booleanCheck) {
          value =
            type === "VARIANT" ? optionNameFromVariant(item[type]) : item[type];
        } else {
          value = "undefined";
        }
      }
    });
    if (value === undefined && hasBoolean) {
      value = item.BOOLEAN;
    }
    params[`@${key}`] = value;
  }
  return params;
}

function capitalizedNameFromName(name) {
  name = numericGuard(name);
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}

function optionNameFromVariant(name) {
  const clean = name.replace(/[^a-zA-Z\d-_ ]/g, "");
  if (clean.match("-")) {
    return clean.replace(/ +/g, "-").toLowerCase();
  } else if (clean.match("_")) {
    return clean.replace(/ +/g, "_").toLowerCase();
  } else if (clean.match(" ") || clean.match(/^[A-Z]/)) {
    return clean
      .split(/ +/)
      .map((a, i) => {
        let text =
          i > 0
            ? `${a.charAt(0).toUpperCase()}${a.substring(1).toLowerCase()}`
            : a.toLowerCase();
        return text;
      })
      .join("");
  } else return clean;
}

function capitalize(name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function downcase(name) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}
function numericGuard(name) {
  if (name.charAt(0).match(/\d/)) {
    name = `N${name}`;
  }
  return name;
}
function capitalizedNameFromName(name) {
  name = numericGuard(name);
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}

function sanitizePropertyName(name) {
  name = name.replace(/#[^#]+$/g, "");
  return downcase(capitalizedNameFromName(name).replace(/^\d+/g, ""));
}

function blocks(
  { name: tagName, children, computed, props, propTypes },
  params,
  name
) {
  if (children) {
    for (let p in params) {
      children = children.replace(new RegExp(p, "g"), params[p]);
    }
  }

  const result = [];
  for (let prop in computed) {
    for (let p in params) {
      computed[prop] =
        computed[prop].match(p) && params[p] === "undefined"
          ? "undefined"
          : computed[prop].replace(new RegExp(p, "g"), params[p]);
    }
    const ternary = computed[prop].match(/^(.+)=(.+)\?(.+):(.+)$/);
    if (ternary) {
      const [_, param, value, truthy, falsey] = ternary;
      computed[prop] = param === value ? truthy : falsey;
    }
  }

  for (let title in props) {
    let code = "";
    if (Array.isArray(props[title])) {
      const arr = [];
      props[title].forEach((object, i) => {
        if (i > 0) {
          arr.push("\n");
        }
        arr.push(
          `<${tagName}`,
          ...renderProps(object, propTypes, computed),
          children ? `>\n  ${children}\n</${tagName}>` : "/>"
        );
      });
      code = arr.join("\n");
    } else {
      code = [
        `<${tagName}`,
        ...renderProps(props[title], propTypes, computed),
        children ? `>\n  ${children}\n</${tagName}>` : "/>",
      ].join("\n");
    }
    result.push({
      language: "JAVASCRIPT",
      code,
      title: `${name}: ${title}`,
    });
  }

  return result;
}

function renderProps(props, propTypes, computed) {
  const propsArr = [];
  for (let propName in props) {
    const type = propTypes[propName] || propTypes["*"] || "string";
    const rawValue = props[propName];
    if (computed[propName] !== "undefined") {
      const value =
        rawValue === "@" ? computed[propName] || rawValue : rawValue;
      propsArr.push(
        `  ${propName}=` + (type === "string" ? `"${value}"` : `{${value}}`)
      );
    }
  }
  return propsArr;
}

function snippets() {
  return {
    Button: {
      name: "Button",
      children: "@label",
      computed: {
        disabled: "@state=disabled?true:undefined",
        iconEnd: "<@iconEnd />",
        iconStart: "<@iconStart />",
        variant: "@variant",
      },
      props: {
        Required: {
          disabled: "@",
          iconEnd: "@",
          iconStart: "@",
          onClick: "() => {}",
          variant: "@",
        },
        All: {
          ariaLabel: "Only when label is not descriptive of the action",
          component: "button",
          disabled: "@",
          iconEnd: "@",
          iconStart: "@",
          onClick: "() => {}",
          type: "button",
          variant: "@",
        },
        "Component/Type Permutations": [
          {
            component: "button",
            onClick: "() => {}",
            type: "button",
          },
          {
            component: "button",
            type: "submit",
          },
          {
            component: "a",
            href: "https://www.example.org",
          },
        ],
      },
      propTypes: {
        "*": "string",
        disabled: "boolean",
        iconEnd: "node",
        iconStart: "node",
        onClick: "function",
      },
    },
    IconButton: {
      name: "IconButton",
      computed: {
        disabled: "@state=disabled?true:undefined",
        icon: "<@icon />",
        variant: "@variant",
      },
      props: {
        Required: {
          ariaLabel: "Describe the action",
          disabled: "@",
          icon: "@",
          onClick: "() => {}",
          variant: "@",
        },
        All: {
          ariaLabel: "Describe the action",
          component: "button",
          disabled: "@",
          icon: "@",
          onClick: "() => {}",
          type: "button",
          variant: "@",
        },
        "Component/Type Permutations": [
          {
            component: "button",
            onClick: "() => {}",
            type: "button",
          },
          {
            component: "button",
            type: "submit",
          },
          {
            component: "a",
            href: "https://www.example.org",
          },
        ],
      },
      propTypes: {
        "*": "string",
        disabled: "boolean",
        icon: "node",
        onClick: "function",
      },
    },
  };
}
