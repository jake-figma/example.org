export function isComponentPropertyDefinitions(
  object: ComponentProperties | ComponentPropertyDefinitions
): object is ComponentPropertyDefinitions {
  const key = Object.keys(object)[0];
  return "defaultValue" in object[key];
}

export function isComponentNode(
  node: SceneNode
): node is ComponentNode | ComponentSetNode | InstanceNode {
  return (
    node.type === "COMPONENT" ||
    node.type === "COMPONENT_SET" ||
    node.type === "INSTANCE"
  );
}

export function isString(value: string | boolean): value is string {
  return value.toString() === value;
}

export function capitalize(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

export function downcase(name: string) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}
export function numericGuard(name: string) {
  if (name.charAt(0).match(/\d/)) {
    name = `N${name}`;
  }
  return name;
}
export function capitalizedNameFromName(name: string) {
  name = numericGuard(name);
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}

export function sanitizePropertyName(name: string) {
  name = name.replace(/#[^#]+$/g, "");
  return downcase(capitalizedNameFromName(name).replace(/^\d+/g, ""));
}
