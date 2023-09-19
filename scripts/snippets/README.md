# Snippets

A way to represent a dynamic snippet for markup or components.

## Markup

```json
{
  "name": "Sweet Markup",
  "template": "<h1>@text</h1>"
}
```

Where `params` is `{ text: "Hello world" }` yields:

```html
<h1>Hello world</h1>
```

## Components

Components think about properties and children instead of a literal template.

Params are converted to values for properties in the `computed` definition. Computed values can be string templates or ternary conditional expressions. Here, we say the value of `disabled` is `true` if `params.state === "disabled"`, otherwise, it is `undefined`.

The `propTypes` field is used to help indicate what kind of format should be used for the properties.

```json
{
  "name": "SweetComponent",
  "children": "@text",
  "computed": {
    "disabled": "@state=disabled?true:undefined",
    "icon": "<@icon />",
    "variant": "@variant"
  },
  "props": {
    "Hello World": {
      "disabled": "@",
      "icon": "@",
      "onClick": "() => {}",
      "variant": "@"
    }
  },
  "propTypes": {
    "*": "string",
    "disabled": "boolean",
    "icon": "node",
    "onClick": "function"
  }
}
```

Where `params` is:

```js
{ state: "disabled", icon: "IconHeart", variant: "primary", text: "Hello world" }
```

yields:

```jsx
<SweetComponent disabled={true} icon={<IconHeart />} variant="primary">
  Hello World
</SweetComponent>
```
