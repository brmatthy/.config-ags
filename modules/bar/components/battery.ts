const battery = await Service.import('battery')

const batteryProgress = battery.bind("available") ? Widget.Icon({
  icon: battery.bind('icon_name'),
  class_name: "bar-label bar-comp-wrapper"
}) : Widget.Box();

export default batteryProgress;
