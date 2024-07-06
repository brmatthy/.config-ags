const hyprland = await Service.import('hyprland')

function dispatch(ws: string | number) {
  hyprland.messageAsync(`dispatch workspace ${ws}`);
}

function isWsVisible(ws: number) {
  return hyprland.monitors.some(monitor => monitor.activeWorkspace.id === ws);
}

function isWsfocussed(ws: number) {
  return hyprland.monitors.some(monitor => monitor.activeWorkspace.id === ws && monitor.focused);
}

function wsLabel(ws: number) {
  const labels = {
    1: "1",
    2: "",
    3: "",
    4: "󰉋",
    5: "5",
    6: "󰖟",
    7: "7",
    8: "8",
    9: "",
    10: "󰙯",
  };
  return labels[ws];
}

export default function workspaces() {
  return Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
      class_name: "bar-comp-wrapper",
      // add all 10 workspaces
      children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.EventBox({
        attribute: i,
        child: Widget.Label({ label: `${wsLabel(i)}`, class_name: "bar-label" }),
        onPrimaryClick: () => dispatch(i),
      })),

      // remove non focused workspaces
      setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
        btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
        btn.class_name =
          isWsfocussed(btn.attribute) ?
            "ws-focussed" :
            isWsVisible(btn.attribute) ?
              "ws-visible" :
              "ws-inactive";
        btn.class_name += " ws-btn"
      })),
    }),
  })
}
