const SNIPPETS = snippets();
const PARAMS = {
  "@state": "default",
  "@iconEnd": "IconArrowRight",
  "@iconStart": "undefined",
  "@variant": "primary",
  "@label": "Hello world!",
};

figma.codegen.on("generate", (event) => {
  return new Promise((resolve) => {
    if (!["COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(event.node.type)) {
      return resolve([
        {
          language: "PLAINTEXT",
          code: "Select a component",
          title: `Component Snippets`,
        },
      ]);
    }
    const snippet = SNIPPETS[event.node.name];
    if (snippet) {
      resolve(blocks(snippet, PARAMS, event.node.name));
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

function blocks({ tag, children, computed, props, propTypes }, params, name) {
  for (let p in params) {
    children = children.replace(new RegExp(p, "g"), params[p]);
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
          `<${tag}`,
          ...renderProps(object, propTypes, computed),
          children ? `>\n  ${children}\n</${tag}>` : "/>"
        );
      });
      code = arr.join("\n");
    } else {
      code = [
        `<${tag}`,
        ...renderProps(props[title], propTypes, computed),
        children ? `>\n  ${children}\n</${tag}>` : "/>",
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
      tag: "Button",
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
  };
}
