// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
//figma.ui.hide();

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'execute-action') {
        /*const nodes: SceneNode[] = [];
        for (let i = 0; i < msg.count; i++) {
          const rect = figma.createRectangle();
          rect.x = i * 150;
          rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
          figma.currentPage.appendChild(rect);
          nodes.push(rect);
        }*/
        const nodes = [];
        if (msg.items === "selected_items" && msg.action === "wrap_canvas") {
            const selection = figma.currentPage.selection;
            for (let i = 0; i < selection.length; i++) {
                nodes.push(selection[i]);
            }
            nodes.forEach((node, index) => {
                const [x, y] = [node.x, node.y];
                const frame = figma.createFrame();
                frame.name = "Frame " + (index + 1);
                frame.resize(node.width, node.height);
                frame.appendChild(node);
                node.relativeTransform = frame.relativeTransform;
                frame.x = x;
                frame.y = y;
                //frame.x = (node.width + 20) * index;
                console.log("Frame x:", frame.x);
                console.log("Frame y:", frame.y);
                console.log("Node x:", node.x);
                console.log("Node y:", node.y);
            });
        }
        /*for (const node of newSelection) {
          console.log("nodes", node.height)
        }*/
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
