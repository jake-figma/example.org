# Snippets

A way to represent a dynamic snippet for component usage.

## Components

Components think about properties and children instead of a literal template.

Params are converted to values for properties. Values can be string templates or ternary conditional expressions. Here, we say the value of `disabled` is `true` if `params.state === "disabled"`, otherwise, it is `undefined`.

The `propTypes` field is used to help indicate what kind of format should be used for the properties. A wildcard `"*"` can be used to describe the default type. These types are only used when formatting a snippet, so it is best kept to primitive-like values.

```json
{
  "name": "SweetComponent",
  "params": {
    "@icon": "undefined",
    "@state": "default",
    "@text": "Hello world!",
    "@variant": "primary!"
  },
  "props": {
    "*": "string",
    "disabled": "boolean",
    "icon": "node",
    "onClick": "function"
  },
  "SweetComponent": {
    "Hello World": {
      "children": "@text",
      "disabled": "@state=disabled?true:undefined",
      "icon": "<@icon />",
      "onClick": "() => {}",
      "variant": "@variant"
    }
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

## Examples

### Mapping many names to one Component

Search/Input in Figma might all be one Input component in code but with specific values for its properties. You can either supply custom snippets or map an alternate to another snippet key.

```json
{
  "name": "Input",
  "alternates": ["InputField", "Search"],
  "params": {
    "@iconEnd": "undefined",
    "@iconStart": "undefined",
    "@placeholder": "Text here...",
    "@value": "Value"
  },
  "props": {
    "iconEnd": "node",
    "iconStart": "node",
    "onChange": "function",
    "onInput": "function",
    "placeholder": "string",
    "type": "string",
    "value": "string"
  },
  "Input": {
    "All": {
      "iconEnd": "<@iconEnd />",
      "iconStart": "<@iconStart />",
      "onChange": "() => {}",
      "onInput": "() => {}",
      "placeholder": "@placeholder",
      "type": "text",
      "value": "@value"
    }
  },
  "InputField": "Input",
  "Search": {
    "Something": {
      "iconStart": "<IconSearch />",
      "onChange": "() => {}",
      "onInput": "() => {}",
      "placeholder": "@placeholder",
      "type": "search",
      "value": "@value"
    }
  }
}
```

### Use params as variables

```json
{
  "name": "Input",
  "params": {
    "@stubbed": "() => {}"
  },
  "props": {
    "*": "function"
  },
  "Input": {
    "All": {
      "onBlur": "@stubbed",
      "onChange": "@stubbed",
      "onFocus": "@stubbed",
      "onKeydown": "@stubbed",
      "onKeyup": "@stubbed",
      "onInput": "@stubbed"
    }
  }
}
```

### Combine params

```json
{
  "name": "Div",
  "params": {
    "@label": "hello",
    "@something": "world!"
  },
  "props": {
    "children": "string"
  },
  "Div": {
    "All": {
      "children": "<p>@label @something some other stuff!</p>"
    }
  }
}
```
