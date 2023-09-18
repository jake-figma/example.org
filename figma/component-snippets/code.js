const snippets = {
  Button: {
    default:
      '// ./src/ui/Button/button.snippet.json\n<Button\n  ariaLabel="Only when label is not descriptive of the action" // optional\n  component="button"\n  type="button"\n  onClick={() => alert("Required click event")}\n  disabled={true} // optional\n  iconEnd={<@iconEnd />} // optional\n  iconStart={<@iconStart />} // optional\n  variant="@variant"\n>\n  @label\n</Button>',
    permutations:
      '<Button\n  ariaLabel="Only when label is not descriptive of the action" // optional\n  component="a"\n    href="https://www.example.org"\n    onClick={() => alert("Optional click event")} // optional\n  component="button"\n    type="button"\n      onClick={() => alert("Required click event")}\n    type="submit"\n      onClick={() => alert("Optional click event")} // optional\n  disabled={true} // optional\n  iconEnd={<@iconEnd />} // optional\n  iconStart={<@iconStart />} // optional\n  variant="@variant"\n>\n  @label\n</Button>',
  },
};

figma.codegen.on("generate", (event) => {
  return new Promise((resolve, reject) => {
    if (!["COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(event.node.type)) {
      return resolve([
        {
          language: "PLAIN_TEXT",
          code: "Select a component",
          title: `Component Snippets`,
        },
      ]);
    }
    const code = snippets[event.node.name];
    if (code) {
      const result = [
        {
          language: "JAVASCRIPT",
          code: code.default,
          title: `${event.node.name}`,
        },
      ];
      if (code.permutations) {
        result.push({
          language: "JAVASCRIPT",
          code: code.permutations,
          title: `${event.node.name} Permutations`,
        });
      }
      resolve(result);
    } else {
      resolve([
        {
          language: "PLAIN_TEXT",
          code: "No snippets found",
          title: `Component Snippets`,
        },
      ]);
    }
  });
});
