import Gdk from "types/@girs/gdk-3.0/gdk-3.0.js";
import defaultMonitor from "./defaultMonitor.js";
import { dialog, dialogIconAvatar } from "./dialog.js";

function spawnConfirmDialog(
  title: string,
  body: string,
  iconName: string,
  action: Function
) {
  // first close the powermenu
  App.closeWindow("powerMenu");

  function onCancel() {
    // reopen the powerMenu
    App.openWindow("powerMenu");
    // remove the dialog
    App.removeWindow(confirmDialog);
  }

  function onAccept() {
    // remove the dialog
    App.removeWindow(confirmDialog);
    action();
  }

  // create confirm dialog window
  const prependIcon = dialogIconAvatar(iconName);
  const confirmDialog = Widget.Window({
    monitor: defaultMonitor,
    name: `confirm-${title}`,
    keymode: "on-demand",
    child: dialog(
      title,
      body,
      prependIcon,
      [
        [` ${title}`, () => { onAccept() }],
        [`󰅙 Cancel`, () => { onCancel() }]
      ]
    )
  })


  confirmDialog.on("focus-out-event", () => {
    onCancel();
  });


  confirmDialog.on("key-press-event", (_, event) => {
    const keyval = event.get_keyval()[1];
    switch (keyval) {
      case Gdk.KEY_Escape:
        onCancel()
    }
  })

  // add Window
  App.addWindow(confirmDialog);
}

/*Function to create a btn for the power menu*/
function powerMenuBtn(
  title: string,
  body: string,
  iconName: string,
  action: Function
) {
  const button = Widget.Button({
    class_name: "power-menu-btn",
    on_clicked: () => spawnConfirmDialog(title, body, iconName, action),
    child: Widget.Box({
      class_name: "power-menu-icon",
      child: Widget.Icon({ class_name: "dialog-icon", icon: `${iconName}-symbolic` }),
    })
  });

  // Make the button focusable
  return button;
}

/*List of the button properties*/
const btnProps: [string, string, string, Function][] = [
  [
    "Lock",
    "Are you sure you want to lock the device?",
    "system-lock-screen",
    () => Utils.execAsync(["swaylock"])
  ],
  [
    "Suspend",
    "Are you sure you want to suspend the device?",
    "weather-clear-night",
    () => Utils.execAsync(["systemctl", "suspend"])
  ],
  [
    "Log out",
    "Are you sure you want to log out?",
    "system-log-out",
    () => Utils.execAsync(["hyprctl", "dispatch", "exit"])
  ],
  [
    "Reboot",
    "Are you sure you want to reboot the device?",
    "system-reboot",
    () => Utils.execAsync(["systemctl", "reboot"])
  ],
  [
    "Shutdown",
    "Are you sure you want to shut the device down?",
    "system-shutdown",
    () => Utils.execAsync(["systemctl", "poweroff"])
  ]
]

const btnBox = Widget.Box({
  class_name: "power-menu-box",
  children: btnProps.map(
    ([title, body, iconName, action]) => powerMenuBtn(title, body, iconName, action)
  )
});

const powerMenu = Widget.Window({
  monitor: defaultMonitor,
  anchor: ["bottom"],
  margins: [0, 0, 10, 0],
  name: "powerMenu",
  child: btnBox,
  keymode: "on-demand",
})

powerMenu.on("focus-out-event", () => {
  App.closeWindow("powerMenu");
});

powerMenu.on("key-press-event", (_, event) => {
  const keyval = event.get_keyval()[1];
  switch (keyval) {
    case Gdk.KEY_Escape:
      App.closeWindow("powerMenu");
  }
})

export default powerMenu
