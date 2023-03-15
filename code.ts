const SIZE = [24, 16, 12];
const select = figma.currentPage.selection;
const selectedVectors: any = [];

function selectAllVector(frame: FrameNode) {
  for (const node of frame.children) {
    if (
      node.type === "VECTOR" ||
      node.type === "RECTANGLE" ||
      node.type === "ELLIPSE"
    ) {
      if (node.strokeStyleId && node.fillStyleId) {
        node.fills = [];
        const stroke = node.outlineStroke() as VectorNode;
        node.remove();
        frame.appendChild(stroke);
        selectedVectors.push(stroke);
      } else {
        selectedVectors.push(node);
      }
    }
  }
  const flatten = figma.flatten(selectedVectors);
  flatten.name = "Vector";
}

function iconScaling() {
  for (const node of select) {
    if (node.type === "COMPONENT_SET") {
      const componentSet = select.find(
        (node) => node.type === "COMPONENT_SET"
      ) as ComponentSetNode;
      componentSet.layoutMode = "VERTICAL";
      componentSet.layoutAlign = "STRETCH";
      const component = componentSet.findOne(
        (node) => node.type === "COMPONENT"
      ) as ComponentNode;
      const frame = componentSet.findOne(
        (node) => node.type === "COMPONENT"
      ) as FrameNode;
      selectAllVector(frame);
      const vector = component.findOne(
        (node) => node.type === "VECTOR"
      ) as VectorNode;
      vector.constraints = {
        horizontal: "SCALE",
        vertical: "SCALE",
      };
      for (const size of SIZE) {
        const clone = component.clone() as ComponentNode;
        const grid = clone.findOne(
          (node) => node.type === "INSTANCE" && node.name === "grid-icon"
        ) as SceneNode;
        grid?.remove();
        clone.resize(size, size);
        clone.name = "Size=" + size;
        componentSet.appendChild(clone);
      }
    } else {
      figma.closePlugin("Please select a component set");
    }
  }
  figma.closePlugin();
}

iconScaling();
