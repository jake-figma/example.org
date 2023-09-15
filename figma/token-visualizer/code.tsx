const { AutoLayout, Rectangle, Text } = figma.widget;

const DIMENSION_COL_WIDTH = 300;
const DIMENSION_ROW_HEIGHT = DIMENSION_COL_WIDTH * 0.1;
const DIMENSION_GAP_LG = DIMENSION_COL_WIDTH * 0.1;
const DIMENSION_GAP_MD = DIMENSION_GAP_LG * 0.5;
const DIMENSION_GAP_SM = DIMENSION_GAP_LG * 0.25;
const FONT_SIZE_H1 = DIMENSION_GAP_LG;
const FONT_SIZE_H2 = DIMENSION_GAP_LG * 0.6;
const FONT_SIZE_MD = DIMENSION_GAP_LG * 0.5;
const FONT_SIZE_SM = DIMENSION_GAP_LG * 0.3;
const VARIABLE_FILL_ID_PREFIX = "asdf-variable-fill-";

interface PluginMode {
  modeId: string;
  name: string;
}

interface PluginVariableValues {
  [k: string]: PluginVariableValue;
}
interface PluginVariableAliasValue {
  collection: string;
  name: string;
  values: PluginVariableValues;
}
type PluginVariableValue =
  | PluginVariableAliasValue
  | { hex: string; rgb: RGB | RGBA };

interface PluginVariable {
  id: string;
  name: string;
  description: string;
  values: { [k: string]: PluginVariableValue };
}

interface PluginCollection {
  name: string;
  modes: PluginMode[];
  variables: PluginVariable[];
}

const collections = figma.variables.getLocalVariableCollections();
const object: { [k: string]: PluginCollection } = {};

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
      const paint: Paint = {
        type: "SOLID",
        color: { r: 0, g: 0, b: 0 },
      };
      const variable = figma.variables.getVariableById(id);
      node.name = "Swatch";
      if (variable) {
        node.fills = [
          figma.variables.setBoundVariableForPaint(paint, "color", variable),
        ];
      }
    }
  });

  figma.closePlugin();
}

function renderValues(values: PluginVariableValues, isSemantic = false) {
  return Object.entries(values).map(([modeId, value]) => {
    return "values" in value ? (
      <AutoLayout
        direction="vertical"
        key={modeId}
        name="Value: Alias"
        spacing={DIMENSION_GAP_SM}
      >
        <AutoLayout width="fill-parent" spacing="auto">
          <Text fontSize={FONT_SIZE_SM}>{value.name}</Text>
          <Text fontSize={FONT_SIZE_SM}>{object[value.collection].name}</Text>
        </AutoLayout>
        {renderValues(value.values, true)}
      </AutoLayout>
    ) : (
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="end"
        spacing={DIMENSION_GAP_SM}
        key={modeId}
        name="Value: Color"
      >
        {!isSemantic ? (
          <AutoLayout width="fill-parent">
            <Text fontSize={FONT_SIZE_SM}>raw value</Text>
          </AutoLayout>
        ) : null}
        <Rectangle
          width={DIMENSION_COL_WIDTH}
          height={DIMENSION_ROW_HEIGHT}
          stroke={"#000"}
          fill={Object.assign({ a: 1 }, value.rgb)}
        />
        <Text fontSize={FONT_SIZE_SM}>{value.hex}</Text>
      </AutoLayout>
    );
  });
}

async function render(collections: { [k: string]: PluginCollection }) {
  const node = (
    <AutoLayout name="Variables" spacing={100}>
      {Object.entries(collections).map(([id, { name, modes, variables }]) => {
        return (
          <AutoLayout
            key={id}
            direction="vertical"
            name={`Collection: ${name}`}
            fill={{ r: 1, g: 1, b: 1, a: 1 }}
            padding={DIMENSION_GAP_LG}
            spacing={DIMENSION_GAP_MD}
          >
            <AutoLayout>
              <Text fontSize={FONT_SIZE_H1}>{name}</Text>
            </AutoLayout>
            <AutoLayout spacing={DIMENSION_GAP_MD}>
              <AutoLayout width={DIMENSION_COL_WIDTH}>
                <Text fontSize={FONT_SIZE_H2}>Token Name</Text>
              </AutoLayout>
              {modes.map(({ name }) => (
                <AutoLayout width={DIMENSION_COL_WIDTH} key={name}>
                  <Text fontSize={FONT_SIZE_H2}>
                    {modes.length > 1 ? name : "Value"}
                  </Text>
                </AutoLayout>
              ))}
            </AutoLayout>
            {variables
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(({ id, description, name, values }) => {
                return (
                  <AutoLayout
                    key={name}
                    verticalAlignItems="center"
                    spacing={DIMENSION_GAP_MD}
                    name={`Token: ${name}`}
                  >
                    <AutoLayout
                      width={DIMENSION_COL_WIDTH}
                      direction="vertical"
                      name="Token Name"
                      spacing={DIMENSION_GAP_SM}
                    >
                      <AutoLayout
                        width="fill-parent"
                        verticalAlignItems="center"
                        spacing="auto"
                      >
                        <Text fontSize={FONT_SIZE_MD}>{name}</Text>
                        <Rectangle
                          name={`${VARIABLE_FILL_ID_PREFIX}${id}`}
                          stroke={{ r: 0, g: 0, b: 0, a: 1 }}
                          height={DIMENSION_ROW_HEIGHT}
                          width={DIMENSION_ROW_HEIGHT}
                        />
                      </AutoLayout>
                      {description ? (
                        <Text fontSize={FONT_SIZE_SM}>{description}</Text>
                      ) : null}
                    </AutoLayout>
                    {renderValues(values)}
                  </AutoLayout>
                );
              })}
          </AutoLayout>
        );
      })}
    </AutoLayout>
  );
  await figma.createNodeFromJSXAsync(node);
  return true;
}

function collectionAsJSON({ modes, name, variableIds }: VariableCollection) {
  const collection: PluginCollection = { modes, name, variables: [] };
  let hasVariable = false;
  variableIds.forEach((variableId) => {
    const variable = figma.variables.getVariableById(variableId);
    if (variable && variable.resolvedType === "COLOR") {
      const { description, name, valuesByMode } = variable;
      hasVariable = true;

      const values: PluginVariableValues = {};
      collection.variables.push({
        id: variableId,
        name,
        description,
        values: modes.reduce((into, { modeId }) => {
          const value = valueToJSON(valuesByMode[modeId]);
          if (value) {
            into[modeId] = value;
          }
          return into;
        }, values),
      });
    }
  });
  return hasVariable ? collection : null;
}

function valueToJSON(value: VariableValue): PluginVariableValue | null {
  if (
    typeof value === "object" &&
    "type" in value &&
    value.type === "VARIABLE_ALIAS"
  ) {
    const variable = figma.variables.getVariableById(value.id);
    if (!variable) {
      return null;
    }
    const map: PluginVariableValues = {};
    const values = Object.keys(variable.valuesByMode).reduce((into, modeId) => {
      const value = valueToJSON(variable.valuesByMode[modeId]);
      if (value) {
        into[modeId] = value;
      }
      return into;
    }, map);
    return {
      collection: variable.variableCollectionId,
      name: variable.name,
      values,
    };
  }
  if (typeof value === "string") return null;
  if (typeof value === "number") return null;
  if (typeof value === "boolean") return null;
  if ("type" in value) return null;

  return { hex: rgbToHex(value), rgb: value };
}

function rgbToHex(rgb: RGB | RGBA): string {
  const { r, g, b } = rgb;
  if ("a" in rgb && rgb.a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${rgb.a.toFixed(4)})`;
  }
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}
