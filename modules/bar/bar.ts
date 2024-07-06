import defaultMonitor from "modules/defaultMonitor";
import { RoundedAngleEnd } from "modules/roundedCorner";
import workspaces from "./components/workspaces";
import clock from "./components/time";
import power from "./components/power";
import networkIndicator from "./components/network";
import batteryProgress from "./components/battery";
import multimedia from "./components/multimedia";

const left = Widget.Box({
  children: [workspaces()]
})

const center = Widget.Box({
  children: [clock()]
})

const right = Widget.Box({
  children: [
    networkIndicator(),
    batteryProgress,
    power(),
  ]
})

const bar = Widget.CenterBox({
  class_name: "bar",
  start_widget: Widget.Box({
    children: [
      left,
      RoundedAngleEnd("topright", { class_name: "angle" })
    ]
  }),
  center_widget: Widget.Box({
    children: [
      RoundedAngleEnd("topleft", { class_name: "angle" }),
      center,
      RoundedAngleEnd("topright", { class_name: "angle" })
    ]
  }),
  end_widget: Widget.Box({
    children: [
      Widget.Box({ hexpand: true }),
      RoundedAngleEnd("topleft", { class_name: "angle" }),
      multimedia(),
      RoundedAngleEnd("topright", { class_name: "angle" }),
      RoundedAngleEnd("topleft", { class_name: "angle", click_through: true }),
      right
    ]
  }),
});

const barWindow = Widget.Window({
  class_name: "bar",
  monitor: defaultMonitor,
  name: `bar`,
  anchor: ["top", "left", "right"],
  exclusivity: "exclusive",
  child: bar
});

export default barWindow;
