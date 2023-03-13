const SIZE = [24, 16, 12];
const select = figma.currentPage.selection;
const selectedVectors: any = [];

function selectAllVector(component: any) {
  if (component.type === "VECTOR") {
    console.log(component.children);
    for (const child of component.children) {
      selectedVectors.push(child);
    }
  }
  figma.currentPage.selection = selectedVectors;
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
      selectAllVector(component);
      // const vector = component.findOne(
      //   (node) => node.type === "VECTOR"
      // ) as VectorNode;
      // vector.constraints = {
      //   horizontal: "SCALE",
      //   vertical: "SCALE",
      // };
      // for (const size of SIZE) {
      //   const clone = component.clone() as ComponentNode;
      //   const grid = clone.findOne(
      //     (node) => node.type === "INSTANCE" && node.name === "grid-icon"
      //   ) as SceneNode;
      //   grid?.remove();
      //   clone.resize(size, size);
      //   componentSet.appendChild(clone);
      // }
    } else {
      figma.closePlugin("Please select a component set");
    }
  }
  figma.closePlugin();
}

iconScaling();
