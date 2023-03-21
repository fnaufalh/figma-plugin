const SIZE = [24];
const select = figma.currentPage.selection;
const selectedVectors: any = [];

function removeGrid(clone: any) {
  const grid = clone.findOne(
    (node: any) => node.type === "INSTANCE" && node.name === "grid-icon"
  ) as SceneNode;
  grid?.remove();
}

function outlining(node: any, frame: FrameNode) {
  if (node.strokeStyleId && node.fillStyleId) {
    node.fills = [];
    const stroke = node.outlineStroke() as VectorNode;
    node.remove();
    frame.appendChild(stroke);
    node = stroke;
  }
  selectedVectors.push(node);
}
function selectAllVector(component: ComponentNode, frame: FrameNode) {
  for (const node of frame.children) {
    if (
      node.type === "VECTOR" ||
      node.type === "RECTANGLE" ||
      node.type === "ELLIPSE"
      // node.type === "BOOLEAN_OPERATION" ||
    ) {
      switch (node.type) {
        // case "BOOLEAN_OPERATION":
        // const booleanOperation = node as BooleanOperationNode;
        // booleanOperation.flatten();

        // break;
        case "VECTOR":
        case "RECTANGLE":
        case "ELLIPSE":
        default:
          outlining(node, frame);
          break;
      }
    }
  }
  const flatten = figma.flatten(selectedVectors);
  flatten.name = "Vector";
  const vector = component.findOne(
    (node) => node.type === "VECTOR"
  ) as VectorNode;
  vector.constraints = {
    horizontal: "SCALE",
    vertical: "SCALE",
  };
}

function resizeIt(component: ComponentNode, componentSet: ComponentSetNode) {
  for (const size of SIZE) {
    const clone = component.clone() as ComponentNode;
    clone.resize(size, size);
    clone.name = "Size=" + size;
    componentSet.appendChild(clone);
  }
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
      removeGrid(component);
      const frame = componentSet.findOne(
        (node) => node.type === "COMPONENT"
      ) as FrameNode;
      selectAllVector(component, frame);
      resizeIt(component, componentSet);
    } else {
      figma.closePlugin("Please select a component set");
    }
  }
  figma.closePlugin();
}

iconScaling();
