import Icon from "types/widgets/icon";
import defaultMonitor from "./defaultMonitor";

function spawnLevelIndicator(
  iconName: string,
  value: number,
  max_value: number = 100,
  min_value: number = 0,
) {
  iconName = `${iconName}-symbolic`
  let icon: Icon<unknown> | null = null;
  if (Utils.lookUpIcon(iconName)) {
    icon = Widget.Icon({
      class_name: "level-indicator-icon",
      icon: iconName,
    });
  }
  const bar = Widget.LevelBar({
    class_name: "level-indicator-bar",
    widthRequest: 100,
    bar_mode: "continuous",
    max_value: max_value,
    min_value: min_value,
    value: value
  })

  const indicatorBox = Widget.Box({
    class_name: "level-indicator",
    children: [bar],
  })

  if (icon) {
    indicatorBox.children = [icon, ...indicatorBox.children]
  }


  const indicator = Widget.Window({
    monitor: defaultMonitor,
    name: `level-${iconName}-${value}`,
    child: indicatorBox
  })

  App.addWindow(indicator)
  return indicator
}
