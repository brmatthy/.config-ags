const notifications = await Service.import("notifications");
import defaultMonitor from "./defaultMonitor";
import { dialog, remoteDialogImgAvatar } from "./dialog";

function notificationIcon({ app_entry, app_icon, image }) {
  if (image)
    return remoteDialogImgAvatar(image);

  let icon = ""
  if (Utils.lookUpIcon(app_icon))
    icon = app_icon;

  if (app_entry && Utils.lookUpIcon(app_entry))
    icon = app_entry;

  if (icon == "")
    return Widget.Box();

  return Widget.Box({
    child: Widget.Icon(icon),
  })
}

function notification(n) {
  const icon = notificationIcon(n);
  const title = n.summary;
  const body = n.body;
  const actions = n.actions;

  return Widget.EventBox(
    {
      attribute: { id: n.id },
      on_primary_click: n.dismiss,
    },
    dialog(title, body, icon, actions)
  )
}

export default function notificationPopups() {
  const monitor = defaultMonitor;
  const list = Widget.Box({
    css: "background: transparent;",
    vertical: true,
    children: notifications.popups.map(notification),
  })

  function onNotified(_, /** @type {number} */ id) {
    const n = notifications.getNotification(id)
    if (n)
      list.children = [notification(n), ...list.children]
  }

  function onDismissed(_, /** @type {number} */ id) {
    list.children.find(n => n.attribute.id === id)?.destroy()
  }

  list.hook(notifications, onNotified, "notified")
    .hook(notifications, onDismissed, "dismissed")

  return Widget.Window({
    monitor,
    name: `notifications${monitor}`,
    anchor: ["top", "right"],
    child: Widget.Box({
      css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      child: list,
    }),
  })
}
