const battery = await Service.import('battery')

const batteryProgress = Widget.Icon({
  icon: battery.bind('icon_name'),
  visible: battery.bind('available'),
  class_name: "bar-label bar-comp-wrapper"
})

export default batteryProgress;
