run();

async function run() {
  const promises = figma.currentPage
    .findAllWithCriteria({ types: ["COMPONENT"] })
    .reduce((into, component) => {
      if (!component.name.match(/^Icon/)) {
        return into;
      }
      into.push(
        new Promise((resolve) =>
          component.exportAsync({ format: "SVG_STRING" }).then((svg) => {
            svg = svg
              .replace("<svg ", "<svg className={`icon icon-size-${size}`} ")
              .replace(/</g, "&lt;")
              .replace(/\n *?/g, "")
              .replace(/"#...(...)"/g, `"var(--icon-fill)"`);
            const code = `
export const ${component.name
              .split(" ")
              .join("")
              .replace(
                /[^\dA-Za-z]/g,
                ""
              )} = ({ size = "md" }: IconProps = {}) => (${svg});`;
            resolve(code);
          })
        )
      );
      return into;
    }, []);
  const data = await Promise.all(promises);
  const code = data.sort().join("");
  figma.showUI(
    `<pre>import "./icons.css";
type IconProps = { size?: "sm" | "md" | "lg" };
${code}</pre>`
  );
}
