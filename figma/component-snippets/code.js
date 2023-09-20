"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../../scripts/snippets/snippets.example.json
  var snippets_example_exports = {};
  __export(snippets_example_exports, {
    Button: () => Button,
    IconButton: () => IconButton,
    default: () => snippets_example_default
  });
  var Button = {
    name: "Button",
    props: {
      Required: {
        children: "@label",
        disabled: "@state=disabled?true:undefined",
        iconEnd: "<@iconEnd />",
        iconStart: "<@iconStart />",
        onClick: "() => {}",
        variant: "@variant"
      },
      All: {
        ariaLabel: "Only when label is not descriptive of the action",
        children: "@label",
        component: "button",
        disabled: "@state=disabled?true:undefined",
        iconEnd: "<@iconEnd />",
        iconStart: "<@iconStart />",
        onClick: "() => {}",
        type: "button",
        variant: "@variant"
      },
      "Component/Type Permutations": [
        {
          component: "button",
          type: "button",
          onClick: "() => {}"
        },
        {
          component: "button",
          type: "submit"
        },
        {
          component: "a",
          href: "https://www.example.org"
        }
      ]
    },
    propTypes: {
      "*": "string",
      disabled: "boolean",
      iconEnd: "node",
      iconStart: "node",
      onClick: "function"
    }
  };
  var IconButton = {
    name: "IconButton",
    props: {
      Required: {
        ariaLabel: "Describe the action",
        disabled: "@state=disabled?true:undefined",
        icon: "<@icon />",
        onClick: "() => {}",
        variant: "@variant"
      },
      All: {
        ariaLabel: "Describe the action",
        component: "button",
        disabled: "@state=disabled?true:undefined",
        icon: "<@icon />",
        onClick: "() => {}",
        type: "button",
        variant: "@variant"
      },
      "Component/Type Permutations": [
        {
          component: "button",
          type: "button",
          onClick: "() => {}"
        },
        {
          component: "button",
          type: "submit"
        },
        {
          component: "a",
          href: "https://www.example.org"
        }
      ]
    },
    propTypes: {
      "*": "string",
      disabled: "boolean",
      icon: "node",
      onClick: "function"
    }
  };
  var snippets_example_default = {
    Button,
    IconButton
  };

  // code.ts
  figma.codegen.on("generate", (event) => {
    return new Promise(async (resolve) => {
      const node = event.node;
      if (!isComponentNode(node)) {
        return resolve([
          {
            language: "PLAINTEXT",
            code: "Select a component",
            title: `Component Snippets`
          }
        ]);
      }
      const snippets = getSnippets();
      const rawName = node.parent && node.parent.type === "COMPONENT_SET" ? node.parent.name : node.name;
      const name = capitalizedNameFromName(rawName);
      const snippet = snippets[name];
      if (snippet) {
        const params = await paramsFromNode(node);
        resolve(codegenResult(snippet, params, name));
      } else {
        resolve([
          {
            language: "PLAINTEXT",
            code: "No snippets found",
            title: `Component Snippets`
          }
        ]);
      }
    });
  });
  async function paramsFromNode(node) {
    const nodeToProcess = node.type === "COMPONENT" ? node.parent && node.parent.type === "COMPONENT_SET" ? node.parent : node : node;
    const valueObject = nodeToProcess.type === "INSTANCE" ? nodeToProcess.componentProperties : nodeToProcess.componentPropertyDefinitions;
    const object = {};
    const isDefinitions = isComponentPropertyDefinitions(valueObject);
    for (let propertyName in valueObject) {
      const value = isDefinitions ? valueObject[propertyName].defaultValue : valueObject[propertyName].value;
      const type = valueObject[propertyName].type;
      const cleanName = sanitizePropertyName(propertyName);
      if (value !== void 0) {
        object[cleanName] = object[cleanName] || {};
        if (isString(value)) {
          if (type === "VARIANT")
            object[cleanName].VARIANT = value;
          if (type === "TEXT")
            object[cleanName].TEXT = value;
          if (type === "INSTANCE_SWAP") {
            const foundNode = await figma.getNodeById(value);
            object[cleanName].INSTANCE_SWAP = capitalizedNameFromName(
              foundNode ? foundNode.name : ""
            );
          }
        } else {
          object[cleanName].BOOLEAN = value;
        }
      }
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
            value = type === "VARIANT" ? optionNameFromVariant(item[type]) : item[type];
          } else {
            value = "undefined";
          }
        }
      });
      if (value === void 0 && hasBoolean) {
        value = item.BOOLEAN;
      }
      params[`@${key}`] = (value || "").toString() || "";
    }
    return params;
  }
  function optionNameFromVariant(name = "") {
    const clean = name.replace(/[^a-zA-Z\d-_ ]/g, "");
    if (clean.match("-")) {
      return clean.replace(/ +/g, "-").toLowerCase();
    } else if (clean.match("_")) {
      return clean.replace(/ +/g, "_").toLowerCase();
    } else if (clean.match(" ") || clean.match(/^[A-Z]/)) {
      return clean.split(/ +/).map((a, i) => {
        let text = i > 0 ? `${a.charAt(0).toUpperCase()}${a.substring(1).toLowerCase()}` : a.toLowerCase();
        return text;
      }).join("");
    } else
      return clean;
  }
  function codegenResult({ name: tagName, props, propTypes }, params, name) {
    const result = [];
    for (let title in props) {
      let code = "";
      const propObject = props[title];
      if (Array.isArray(propObject)) {
        const arr = [];
        propObject.forEach((object) => {
          const children = "children" in object ? formatValue(object.children, params) : null;
          arr.push(formatInstance(tagName, object, propTypes, params, children));
        });
        code = arr.join("\n");
      } else {
        const children = "children" in propObject ? formatValue(propObject.children, params) : null;
        code = formatInstance(tagName, propObject, propTypes, params, children);
      }
      result.push({
        language: "JAVASCRIPT",
        code,
        title: `${name}: ${title}`
      });
    }
    return result;
  }
  function formatValue(rawValue, params) {
    let value = rawValue;
    for (let p in params) {
      value = value.match(p) && params[p] === "undefined" ? "undefined" : value.replace(new RegExp(p, "g"), params[p]);
    }
    const ternary = value.match(/^(.+)=(.+)\?(.+):(.+)$/);
    if (ternary) {
      const [_, param, val, truthy, falsey] = ternary;
      value = param === val ? truthy : falsey;
    }
    return value !== "undefined" ? value : null;
  }
  function renderProps(props, propTypes, params) {
    const propsArr = [];
    for (let propName in props) {
      if (propName !== "children") {
        const type = propTypes[propName] || propTypes["*"] || "string";
        const value = formatValue(props[propName], params);
        if (value !== null) {
          propsArr.push(
            `  ${propName}=` + (type === "string" ? `"${value}"` : `{${value}}`)
          );
        }
      }
    }
    return propsArr;
  }
  function isComponentPropertyDefinitions(object) {
    const key = Object.keys(object)[0];
    return "defaultValue" in object[key];
  }
  function isComponentNode(node) {
    return node.type === "COMPONENT" || node.type === "COMPONENT_SET" || node.type === "INSTANCE";
  }
  function isString(value) {
    return value.toString() === value;
  }
  function getSnippets() {
    return JSON.parse(JSON.stringify(snippets_example_exports));
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
    return name.split(/[^a-zA-Z\d]+/g).map(capitalize).join("");
  }
  function sanitizePropertyName(name) {
    name = name.replace(/#[^#]+$/g, "");
    return downcase(capitalizedNameFromName(name).replace(/^\d+/g, ""));
  }
  function formatInstance(tagName, object, propTypes, params, children) {
    const singleLine = Object.keys(object).length <= 3;
    const array = [`<${tagName}`, ...renderProps(object, propTypes, params)];
    if (children) {
      array.push(">", `  ${children}`, `</${tagName}>`);
    } else {
      array.push("/>");
    }
    return array.join(singleLine ? " " : "\n");
  }
})();
