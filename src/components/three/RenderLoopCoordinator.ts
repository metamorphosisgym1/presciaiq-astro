type RenderLoopRecord = {
  visible: boolean;
  ratio: number;
  onActiveChange: (active: boolean) => void;
};

const renderLoops = new Map<symbol, RenderLoopRecord>();
let activeRenderLoop: symbol | null = null;

const reconcileRenderLoops = () => {
  const current = activeRenderLoop ? renderLoops.get(activeRenderLoop) : undefined;
  let nextId: symbol | null = current?.visible ? activeRenderLoop : null;
  let nextRatio = current?.visible ? current.ratio : -1;

  renderLoops.forEach((record, id) => {
    if (record.visible && record.ratio > nextRatio) {
      nextId = id;
      nextRatio = record.ratio;
    }
  });

  if (nextId === activeRenderLoop) return;
  if (activeRenderLoop) renderLoops.get(activeRenderLoop)?.onActiveChange(false);
  activeRenderLoop = nextId;
  if (activeRenderLoop) renderLoops.get(activeRenderLoop)?.onActiveChange(true);
};

export const registerRenderLoop = (onActiveChange: (active: boolean) => void) => {
  const id = Symbol("three-render-loop");
  renderLoops.set(id, { visible: false, ratio: 0, onActiveChange });

  return {
    setVisibility(visible: boolean, ratio = visible ? 1 : 0) {
      const record = renderLoops.get(id);
      if (!record) return;
      record.visible = visible;
      record.ratio = visible ? ratio : 0;
      reconcileRenderLoops();
    },
    dispose() {
      const wasActive = activeRenderLoop === id;
      renderLoops.delete(id);
      if (wasActive) {
        activeRenderLoop = null;
        onActiveChange(false);
      }
      reconcileRenderLoops();
    },
  };
};
