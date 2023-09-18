const snippets = {
  Button:
    '// ./src/ui/Button/button.snippet.json\n<Button\n  ariaLabel="Only when text is not descriptive of the action" // optional\n  component="a"\n    href="https://www.example.org"\n    onClick={() => alert("Optional click event")} // optional\n  component="button"\n    type="button"\n      onClick={() => alert("Required click event")}\n    type="submit"\n      onClick={() => alert("Optional click event")} // optional\n  disabled={true} // optional\n  iconEnd={<@iconEnd />} // optional\n  iconStart={<@iconStart />} // optional\n  variant="@variant"\n>\n  @text\n</Button>',
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
      resolve([
        {
          language: "JAVASCRIPT",
          code,
          title: `${event.node.name} Snippet`,
        },
      ]);
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
