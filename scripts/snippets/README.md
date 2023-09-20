# Snippets

A way to represent a dynamic snippet for markup or component usage.

## Markup

```json
{
  "name": "Sweet Markup",
  "template": "<h1>@text</h1>"
}
```

Given `params` of `{ text: "Hello world" }`, the snippet would be rendered as...

```html
<h1>Hello world</h1>
```

## Components

Components think about properties and children instead of a literal template.

Params are converted to values for properties. Values can be string templates or ternary conditional expressions. Here, we say the value of `disabled` is `true` if `params.state === "disabled"`, otherwise, it is `undefined`.

The `propTypes` field is used to help indicate what kind of format should be used for the properties. A wildcard `"*"` can be used to describe the default type. These types are only used when formatting a snippet, so it is best kept to primitive-like values.

```json
{
  "name": "SweetComponent",
  "props": {
    "Hello World": {
      "children": "@text",
      "disabled": "@state=disabled?true:undefined",
      "icon": "<@icon />",
      "onClick": "() => {}",
      "variant": "@variant"
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

Given the following `params`...

```js
{ state: "disabled", icon: "IconHeart", variant: "primary", text: "Hello world" }
```

The snippet would be rendered as...

```jsx
<SweetComponent disabled={true} icon={<IconHeart />} variant="primary">
  Hello world
</SweetComponent>
```
