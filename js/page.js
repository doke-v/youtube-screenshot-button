const captureScreenshot = () => {
  const extension = ".png";
  const title =
    document.title.replace(/ - YouTube$/g, "") || "YouTube video screenshot";
  const player = document.getElementsByClassName("video-stream")[0];
  const timestamp = createTimestamp(player.currentTime);
  const canvas = document.createElement("canvas");
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);

  const downloadElement = document.createElement("a");
  downloadElement.download = `${sanitize(title)} ${timestamp}${extension}`;

  canvas.toBlob((blob) => {
    downloadElement.href = URL.createObjectURL(blob);
    downloadElement.click();
  }, "image/png");
};

const addButton = () => {
  const controls = document.getElementsByClassName("ytp-right-controls")[0];
  const button = document.getElementsByClassName("screenshot-button")[0];
  if (controls && !button) {
    controls.prepend(screenshotButton);
  }
};

const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length);
  }
  return str;
};

const illegalRe = /[\/\?<>\\:\*\|"]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[\. ]+$/;

const sanitize = (input) => {
  const sanitized = input
    .replace(illegalRe, "")
    .replace(controlRe, "")
    .replace(reservedRe, "")
    .replace(windowsReservedRe, "")
    .replace(windowsTrailingRe, "");
  return truncate(sanitized, 246);
};

const createTimestamp = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8).replace(/:/g, "-").trim();
};

const screenshotButton = document.createElement("button");
screenshotButton.className = "screenshot-button ytp-button";
screenshotButton.title = "Take a screenshot";
screenshotButton.onclick = captureScreenshot;
screenshotButton.innerHTML =
  '<svg height="100%" version="1.1" viewBox="-8 -8 40 40" width="100%"><use class="ytp-svg-shadow"></use><path fill="#fff" d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z" ></path></svg>';

setTimeout(addButton, 1000);
addButton();
