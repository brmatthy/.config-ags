const network = await Service.import('network')

const wifiIndicator = () => Widget.Icon({
  icon: network.wifi.bind('icon_name'),
  class_name: "bar-label"
})

const wiredIndicator = () => Widget.Icon({
  icon: network.wired.bind('icon_name'),
  class_name: "bar-label"
})

const networkIndicator = () => Widget.Stack({
  class_name: "bar-comp-wrapper",
  children: {
    wifi: wifiIndicator(),
    wired: wiredIndicator(),
  },
  shown: network.bind('primary').as(p => p || 'wifi'),
})

export default networkIndicator;
