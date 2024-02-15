import * as snippetsJSON from "../../../scripts/snippets/snippets.example.json";
import formatterReact from "../../../scripts/snippets/formatters/formatterReact.js";
import { capitalizedNameFromName, sanitizePropertyName } from "./utils";

figma.codegen.on("generate", (event) => {
  return new Promise(async (resolve) => {
    const node = event.node;
    if (
      !(
        node.type === "COMPONENT" ||
        node.type === "COMPONENT_SET" ||
        node.type === "INSTANCE"
      )
    ) {
      return resolve([
        {
          language: "PLAINTEXT",
          code: "Select a component",
          title: `Component Snippets`,
        },
      ]);
    }
    const snippets = JSON.parse(JSON.stringify(snippetsJSON));
    for (let name in snippets) {
      const { alternates = [] } = snippets[name];
      alternates.forEach((alternate) => (snippets[alternate] = snippets[name]));
    }
    const rawName =
      node.parent && node.parent.type === "COMPONENT_SET"
        ? node.parent.name
        : node.name;
    const name = capitalizedNameFromName(rawName);
    const snippet = snippets[name];
    if (snippet) {
      const params = await paramsFromNode(node, snippet.params);
      resolve(codegenResult(snippet, params, name));
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

function codegenResult(snippet, paramsValues, name) {
  const result = [];
  const key = typeof snippet[name] === "string" ? snippet[name] : name;
  const snippetObject = snippet[key];
  for (let title in snippetObject) {
    const code = formatterReact(snippet, snippetObject[title], paramsValues);
    result.push({
      language: "JAVASCRIPT",
      code,
      title: `${name}: ${title}`,
    });
  }

  return result;
}

async function paramsFromNode(node, params) {
  const valueObject = valueObjectFromNode(node);
  const object = {};
  const isDefinitions =
    "defaultValue" in valueObject[Object.keys(valueObject)[0]];
  for (let propertyName in valueObject) {
    const value = isDefinitions
      ? valueObject[propertyName].defaultValue
      : valueObject[propertyName].value;
    const type = valueObject[propertyName].type;
    const cleanName = sanitizePropertyName(propertyName);
    if (value !== undefined) {
      object[cleanName] = object[cleanName] || {};
      if (typeof value === "string") {
        if (type === "VARIANT") object[cleanName].VARIANT = value;
        if (type === "TEXT") object[cleanName].TEXT = value;
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
  const paramsValues = Object.assign({}, params);
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
    paramsValues[`@${key}`] = (value || "").toString() || "";
  }

  function optionNameFromVariant(name = "") {
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

  return paramsValues;
}

function valueObjectFromNode(node) {
  if (node.type === "INSTANCE") return node.componentProperties;
  if (node.type === "COMPONENT_SET") return node.componentPropertyDefinitions;
  if (node.type === "COMPONENT") {
    if (node.parent.type === "COMPONENT_SET") {
      const initialProps = Object.assign(
        {},
        node.parent.componentPropertyDefinitions
      );
      const nameProps = node.name.split(", ");
      nameProps.forEach((prop) => {
        const [propName, propValue] = prop.split("=");
        initialProps[propName].defaultValue = propValue;
      });
      return initialProps;
    } else {
      return node.componentPropertyDefinitions;
    }
  }
  return {};
}
