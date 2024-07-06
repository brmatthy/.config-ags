import powerMenu from "modules/powerMenu.js";
import notificationPopups from "modules/notifications.js";
import applauncher from "modules/applauncher";
import barWindow from "modules/bar/bar";
import mediaWidget from "modules/mediaWidget";

const scss = `${App.configDir}/style.scss`;
const css = `/tmp/ags-style.css`;

function resetCss() {
  Utils.exec(`sassc ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);
}

resetCss();

App.config({
  windows: [
    barWindow,
    applauncher,
    powerMenu,
    mediaWidget,
    notificationPopups(),
  ],
  style: css,
});

App.closeWindow("powerMenu");
App.closeWindow("mediaWidget");

// autoreload css
Utils.monitorFile(scss, resetCss);
