import Gtk from "types/@girs/gtk-3.0/gtk-3.0"

/*
 * Return a box with an icon.
 * Returns an empty box if the iconName is invalid.
 */
export function dialogIconAvatar(iconName: string) {
  iconName = `${iconName}-symbolic`
  if (Utils.lookUpIcon(iconName)) {
    return Widget.Box({
      class_name: "dialog-icon-avatar",
      child: Widget.Icon({ class_name: "dialog-icon-avatar", icon: iconName }),
    })
  }

  return Widget.Box()
}

function dialogImgAvatar(img: string) {
  return Widget.Box({
    class_name: "dialog-img-avatar",
    css: `background-image: ${img};`
      + "background-size: contain;"
      + "background-repeat: no-repeat;"
      + "background-position: center;",
  })
}

export function localDialogImgAvatar(imgPath: string) {
  return dialogImgAvatar(imgPath)
}

export function remoteDialogImgAvatar(imgUrl: string) {
  return dialogImgAvatar(`url("${imgUrl}")`)
}

export function dialog(
  title: string, // Title of the dialog
  body: string, // Body of the dialog
  prepend: Gtk.Box, // A prepend slot
  actions: [string, Function][] // list of actions. name, function pairs
) {
  const titleLabel = Widget.Label({
    class_name: "dialog-title",
    xalign: 0,
    justification: "left",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: title,
    use_markup: true,
  })

  const bodyLabel = Widget.Label({
    class_name: "dialog-body",
    hexpand: true,
    use_markup: true,
    xalign: 0,
    justification: "left",
    label: body,
    wrap: true,
  })

  const actionBtns = Widget.Box({
    class_name: "dialog-actions",
    children: actions.map(([actionLabel, action]) => Widget.Button({
      class_name: "dialog-action-btn",
      on_clicked: () => action(),
      hexpand: true,
      child: Widget.Label(actionLabel),
    })),
  })

  return Widget.Box(
    { vertical: true, class_name: "dialog" },
    Widget.Box({
      children: [
        prepend,
        Widget.Box({ vertical: true, class_name: "test" },
          titleLabel,
          bodyLabel
        )
      ]
    }),
    actionBtns
  )
}
