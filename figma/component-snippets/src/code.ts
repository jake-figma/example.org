import * as snippetsJSON from "../../../scripts/snippets/snippets.example.json";
import { Snippet, ParamsMap, ParamsValues, BasicObject } from "./types";
import {
  capitalizedNameFromName,
  isComponentNode,
  isComponentPropertyDefinitions,
  isString,
  sanitizePropertyName,
} from "./utils";

figma.codegen.on("generate", (event) => {
  return new Promise(async (resolve) => {
    const node = event.node;
    if (!isComponentNode(node)) {
      return resolve([
        {
          language: "PLAINTEXT",
          code: "Select a component",
          title: `Component Snippets`,
        },
      ]);
    }
    const snippets = JSON.parse(JSON.stringify(snippetsJSON)) as {
      [k: string]: Snippet;
    };
    for (let name in snippets) {
      const { alternates = [] } = snippets[name];
      alternates.forEach((alternate) => (snippets[alternate] = snippets[name]));
    }
    const rawName =
      node.parent && node.parent.type === "COMPONENT_SET"
        ? node.parent.name
        : node.name;
    const name = capitalizedNameFromName(rawName);
    const snippet: Snippet = snippets[name];
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

function codegenResult(
  snippet: Snippet,
  paramsValues: ParamsValues,
  name: string
): CodegenResult[] {
  const result: CodegenResult[] = [];
  const { name: tagName, params, props } = snippet;
  const key: string =
    typeof snippet[name] === "string" ? (snippet[name] as string) : name;
  const snippetObject = snippet[key] as {
    [k: string]: BasicObject | BasicObject[];
  };
  for (let title in snippetObject) {
    let code = "";
    const propObject = snippetObject[title];
    if (Array.isArray(propObject)) {
      const arr: string[] = [];
      propObject.forEach((object) => {
        arr.push(formatInstance(tagName, object, props, params, paramsValues));
      });
      code = arr.join("\n");
    } else {
      code = formatInstance(tagName, propObject, props, params, paramsValues);
    }
    result.push({
      language: "JAVASCRIPT",
      code,
      title: `${name}: ${title}`,
    });
  }

  return result;
}

async function paramsFromNode(
  node: ComponentNode | ComponentSetNode | InstanceNode,
  params: BasicObject
) {
  const nodeToProcess =
    node.type === "COMPONENT"
      ? node.parent && node.parent.type === "COMPONENT_SET"
        ? node.parent
        : node
      : node;
  const valueObject: ComponentProperties | ComponentPropertyDefinitions =
    nodeToProcess.type === "INSTANCE"
      ? nodeToProcess.componentProperties
      : nodeToProcess.componentPropertyDefinitions;
  const object: ParamsMap = {};
  const isDefinitions = isComponentPropertyDefinitions(valueObject);
  for (let propertyName in valueObject) {
    const value = isDefinitions
      ? valueObject[propertyName].defaultValue
      : valueObject[propertyName].value;
    const type = valueObject[propertyName].type;
    const cleanName = sanitizePropertyName(propertyName);
    if (value !== undefined) {
      object[cleanName] = object[cleanName] || {};
      if (isString(value)) {
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
  const paramsValues: ParamsValues = Object.assign({}, params);
  const types: ComponentPropertyType[] = ["TEXT", "VARIANT", "INSTANCE_SWAP"];
  for (let key in object) {
    const item = object[key];
    const hasBoolean = "BOOLEAN" in item;
    const booleanCheck = !hasBoolean || item.BOOLEAN;
    let value: string | boolean | undefined;
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

  function optionNameFromVariant(name: string = "") {
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

  return params;
}

function formatValue(
  rawValue: string,
  paramsValues: ParamsValues,
  params: BasicObject
): string | null {
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

function formatProps(
  object: BasicObject,
  props: BasicObject,
  params: BasicObject,
  paramsValues: ParamsValues
) {
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

function formatInstance(
  tagName: string,
  object: BasicObject,
  props: BasicObject,
  params: BasicObject,
  paramsValues: ParamsValues
) {
  const children =
    "children" in object && object.children
      ? formatValue(object.children, paramsValues, params)
      : null;
  const singleLine = Object.keys(object).length <= 3;
  const array = [
    `<${tagName}`,
    ...formatProps(object, props, params, paramsValues),
  ];
  if (children) {
    array.push(">", `  ${children}`, `</${tagName}>`);
  } else {
    array.push("/>");
  }
  return array.join(singleLine ? " " : "\n");
}
