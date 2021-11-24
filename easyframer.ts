// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

//figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

const nodes: SceneNode[] = [];
const selection = figma.currentPage.selection;

if (selection.length > 0) {
  if (selection.length > 1) {
    figma.notify("Wrapping " + selection.length + " elements", {
      timeout: 500,
    });
  } else if (selection.length === 1) {
    figma.notify("Wrapping 1 element");
  }

  for (let i = 0; i < selection.length; i++) {
    nodes.push(selection[i]);
  }

  nodes.forEach((node, index) => {
    const [x, y] = [node.x, node.y];
    const frame = figma.createFrame();

    frame.name = "New Frame " + (index + 1);
    frame.resize(node.width, node.height);
    frame.appendChild(node);

    node.relativeTransform = frame.relativeTransform;
    frame.x = x;
    frame.y = y;

    figma.notify("Elements wrapped succesfully!");
  });
} else {
  figma.notify("No selection found");
}

figma.closePlugin();
