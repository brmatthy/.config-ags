import { MprisPlayer } from "types/service/mpris";

const mpris = await Service.import('mpris')

function getFirstPlayer() {
  const spotifyPlayer = mpris.getPlayer("spotify");
  return spotifyPlayer ? spotifyPlayer : mpris.players[0]
}

const class_name = "bar-label bar-comp-wrapper";

function selectIcon(players: MprisPlayer[]) {
  const musicIcon = Widget.Icon({ icon: "audio-x-generic-symbolic", class_name: class_name })
  const spotifyIcon = Widget.Label({ label: "", class_name: class_name })

  return players.some(p => p.name == "spotify") ? spotifyIcon : musicIcon;
}

function track(players: MprisPlayer[]) {
  const player = getFirstPlayer();
  return Widget.Label({ label: player.bind("track_title"), class_name: class_name })
}

const showIcon = Widget.Box({ child: mpris.bind("players").transform(selectIcon) })
const showTrack = Widget.Box({ child: mpris.bind("players").transform(track) })

export function closeMediaWidget() {
  const mediaWidget = App.getWindow("mediaWidget");
  if (!mediaWidget?.has_toplevel_focus) {
    App.closeWindow("mediaWidget")
  }
}

export default function multimedia() {
  return Widget.EventBox({
    onPrimaryClick: () => getFirstPlayer().playPause(),
    onSecondaryClick: () => Utils.execAsync(["hyprctl", "dispatch", "focuswindow", `${getFirstPlayer().identity}`]),
    onScrollUp: () => getFirstPlayer().next(),
    onScrollDown: () => getFirstPlayer().previous(),
    onHover: () => App.openWindow("mediaWidget"),
    onHoverLost: () => closeMediaWidget(),
    child: Widget.Box([showTrack, showIcon])
  })
}
