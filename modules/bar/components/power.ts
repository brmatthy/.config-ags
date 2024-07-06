
export default function power() {
  return Widget.Box({
    class_name: "bar-comp-wrapper",
    child: Widget.EventBox({
      class_name: "power-label",
      onPrimaryClick: () => App.openWindow("powerMenu"),
      child: Widget.Icon({ icon: "system-shutdown-symbolic", class_name: "bar-label" })
    })
  })
}
