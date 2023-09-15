"use strict";
(() => {
  // code.tsx
  var { AutoLayout, Rectangle, Text } = figma.widget;
  var DIMENSION_COL_WIDTH = 300;
  var DIMENSION_ROW_HEIGHT = DIMENSION_COL_WIDTH * 0.1;
  var DIMENSION_GAP_LG = DIMENSION_COL_WIDTH * 0.1;
  var DIMENSION_GAP_MD = DIMENSION_GAP_LG * 0.5;
  var DIMENSION_GAP_SM = DIMENSION_GAP_LG * 0.25;
  var FONT_SIZE_H1 = DIMENSION_GAP_LG;
  var FONT_SIZE_H2 = DIMENSION_GAP_LG * 0.6;
  var FONT_SIZE_MD = DIMENSION_GAP_LG * 0.5;
  var FONT_SIZE_SM = DIMENSION_GAP_LG * 0.3;
  var VARIABLE_FILL_ID_PREFIX = "asdf-variable-fill-";
  var collections = figma.variables.getLocalVariableCollections();
  var object = {};
  run();
  async function run() {
    collections.forEach((collection) => {
      const json = collectionAsJSON(collection);
      if (json) {
        object[collection.id] = json;
      }
    });
    await render(object);
    const nodes = figma.currentPage.findAllWithCriteria({ types: ["RECTANGLE"] });
    nodes.forEach((node) => {
      const match = node.name.match(
        new RegExp(`^${VARIABLE_FILL_ID_PREFIX}(.+)$`)
      );
      if (match) {
        const id = match[1];
        const paint = {
          type: "SOLID",
          color: { r: 0, g: 0, b: 0 }
        };
        const variable = figma.variables.getVariableById(id);
        node.name = "Swatch";
        if (variable) {
          node.fills = [
            figma.variables.setBoundVariableForPaint(paint, "color", variable)
          ];
        }
      }
    });
    figma.closePlugin();
  }
  function renderValues(values, isSemantic = false) {
    return Object.entries(values).map(([modeId, value]) => {
      return "values" in value ? /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "vertical",
          key: modeId,
          name: "Value: Alias",
          spacing: DIMENSION_GAP_SM
        },
        /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", spacing: "auto" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_SM }, value.name), /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_SM }, object[value.collection].name)),
        renderValues(value.values, true)
      ) : /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "vertical",
          horizontalAlignItems: "end",
          spacing: DIMENSION_GAP_SM,
          key: modeId,
          name: "Value: Color"
        },
        !isSemantic ? /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_SM }, "raw value")) : null,
        /* @__PURE__ */ figma.widget.h(
          Rectangle,
          {
            width: DIMENSION_COL_WIDTH,
            height: DIMENSION_ROW_HEIGHT,
            stroke: "#000",
            fill: Object.assign({ a: 1 }, value.rgb)
          }
        ),
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_SM }, value.hex)
      );
    });
  }
  async function render(collections2) {
    const node = /* @__PURE__ */ figma.widget.h(AutoLayout, { name: "Variables", spacing: 100 }, Object.entries(collections2).map(([id, { name, modes, variables }]) => {
      return /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: id,
          direction: "vertical",
          name: `Collection: ${name}`,
          fill: { r: 1, g: 1, b: 1, a: 1 },
          padding: DIMENSION_GAP_LG,
          spacing: DIMENSION_GAP_MD
        },
        /* @__PURE__ */ figma.widget.h(AutoLayout, null, /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_H1 }, name)),
        /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: DIMENSION_GAP_MD }, /* @__PURE__ */ figma.widget.h(AutoLayout, { width: DIMENSION_COL_WIDTH }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_H2 }, "Token Name")), modes.map(({ name: name2 }) => /* @__PURE__ */ figma.widget.h(AutoLayout, { width: DIMENSION_COL_WIDTH, key: name2 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_H2 }, modes.length > 1 ? name2 : "Value")))),
        variables.sort((a, b) => a.name > b.name ? 1 : -1).map(({ id: id2, description, name: name2, values }) => {
          return /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: name2,
              verticalAlignItems: "center",
              spacing: DIMENSION_GAP_MD,
              name: `Token: ${name2}`
            },
            /* @__PURE__ */ figma.widget.h(
              AutoLayout,
              {
                width: DIMENSION_COL_WIDTH,
                direction: "vertical",
                name: "Token Name",
                spacing: DIMENSION_GAP_SM
              },
              /* @__PURE__ */ figma.widget.h(
                AutoLayout,
                {
                  width: "fill-parent",
                  verticalAlignItems: "center",
                  spacing: "auto"
                },
                /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_MD }, name2),
                /* @__PURE__ */ figma.widget.h(
                  Rectangle,
                  {
                    name: `${VARIABLE_FILL_ID_PREFIX}${id2}`,
                    stroke: { r: 0, g: 0, b: 0, a: 1 },
                    height: DIMENSION_ROW_HEIGHT,
                    width: DIMENSION_ROW_HEIGHT
                  }
                )
              ),
              description ? /* @__PURE__ */ figma.widget.h(Text, { fontSize: FONT_SIZE_SM }, description) : null
            ),
            renderValues(values)
          );
        })
      );
    }));
    await figma.createNodeFromJSXAsync(node);
    return true;
  }
  function collectionAsJSON({ modes, name, variableIds }) {
    const collection = { modes, name, variables: [] };
    let hasVariable = false;
    variableIds.forEach((variableId) => {
      const variable = figma.variables.getVariableById(variableId);
      if (variable && variable.resolvedType === "COLOR") {
        const { description, name: name2, valuesByMode } = variable;
        hasVariable = true;
        const values = {};
        collection.variables.push({
          id: variableId,
          name: name2,
          description,
          values: modes.reduce((into, { modeId }) => {
            const value = valueToJSON(valuesByMode[modeId]);
            if (value) {
              into[modeId] = value;
            }
            return into;
          }, values)
        });
      }
    });
    return hasVariable ? collection : null;
  }
  function valueToJSON(value) {
    if (typeof value === "object" && "type" in value && value.type === "VARIABLE_ALIAS") {
      const variable = figma.variables.getVariableById(value.id);
      if (!variable) {
        return null;
      }
      const map = {};
      const values = Object.keys(variable.valuesByMode).reduce((into, modeId) => {
        const value2 = valueToJSON(variable.valuesByMode[modeId]);
        if (value2) {
          into[modeId] = value2;
        }
        return into;
      }, map);
      return {
        collection: variable.variableCollectionId,
        name: variable.name,
        values
      };
    }
    if (typeof value === "string")
      return null;
    if (typeof value === "number")
      return null;
    if (typeof value === "boolean")
      return null;
    if ("type" in value)
      return null;
    return { hex: rgbToHex(value), rgb: value };
  }
  function rgbToHex(rgb) {
    const { r, g, b } = rgb;
    if ("a" in rgb && rgb.a !== 1) {
      return `rgba(${[r, g, b].map((n) => Math.round(n * 255)).join(", ")}, ${rgb.a.toFixed(4)})`;
    }
    const toHex = (value) => {
      const hex2 = Math.round(value * 255).toString(16);
      return hex2.length === 1 ? "0" + hex2 : hex2;
    };
    const hex = [toHex(r), toHex(g), toHex(b)].join("");
    return `#${hex}`;
  }
})();
