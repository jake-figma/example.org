export function capitalize(name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

export function downcase(name) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}
export function numericGuard(name) {
  if (name.charAt(0).match(/\d/)) {
    name = `N${name}`;
  }
  return name;
}
export function capitalizedNameFromName(name) {
  name = numericGuard(name);
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}

export function sanitizePropertyName(name) {
  name = name.replace(/#[^#]+$/g, "");
  return downcase(capitalizedNameFromName(name).replace(/^\d+/g, ""));
}
