// figma.showUI(__html__, { width: 320, height: 240 });

// // When the plugin UI is shown, load the `bundle.js` file
// figma.ui.onready(() => {
//   fetch("index.html")
//     .then((response) => response.text())
//     .then((html) => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");
//       const script = doc.createElement("script");
//       script.src = "bundle.js";
//       doc.body.appendChild(script);
//       document.body.innerHTML = doc.body.innerHTML;
//     })
//     .catch((error) => console.error(error));
// });

// const formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

const changePrice = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  const selection = figma.currentPage.selection;
  const page = figma.currentPage;
  const nodes: SceneNode[] = [];
  // for (let i = 0; i < numberOfRectangles; i++) {
  //   const rect = figma.createRectangle();
  //   rect.x = i * 150;
  //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
  //   figma.currentPage.appendChild(rect);
  //   nodes.push(rect);
  // }
  // console.log(formatter.format(20000));
  if (selection.length > 0) {
    let instanceSet = selection.find(
      (node) => node.type === "INSTANCE"
    ) as InstanceNode;
    console.log(instanceSet);
    const templateStrikePrice = instanceSet.findOne(
      (node) => node.name === "Strike Price" && node.type === "TEXT"
    ) as TextNode;
    const templatePrice = instanceSet.findOne(
      (node) => node.name === "Price" && node.type === "TEXT"
    ) as TextNode;

    templateStrikePrice.characters =
      "Rp" +
      // formatter.format(
      Math.floor(Math.random() * 1000000) +
      (1)
        // )
        .toString();
    templatePrice.characters =
      "Rp" +
      // formatter.format(
      Math.floor(Math.random() * 1000000) +
      (1)
        // )
        .toString();
    console.log(templateStrikePrice, templateStrikePrice);
    // nodes.push();
    // figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  } else {
    figma.closePlugin("Please make a selection");
  }
};
changePrice();
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
