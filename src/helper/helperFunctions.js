import { showMessage } from "react-native-flash-message";
import Sound from "react-native-sound";
import imagePath from "../constants/imagePath";
import { useMemo } from "react";

// const showError = message => {
//   showMessage({
//     type: 'danger',
//     icon: 'danger',
//     message,
//   });
// };

// const showSuccess = message => {
//   showMessage({
//     type: 'success',
//     icon: 'success',
//     message,
//   });
// };

// export function otpTimerCounter(seconds) {
//   // alert(seconds)
//   let m = Math.floor(seconds / 60);
//   let s = seconds % 60;
//   m = m < 10 ? '0' + m : m;
//   s = s < 10 ? '0' + s : s;
//   return `${m}:${s}`;
// }

// export {showError, showSuccess};

export const addAlpha = (color, opacity) => {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export const playSound = () => {
  const sound = new Sound(imagePath.soundFile, error => {
    if (error) {
      console.log("failed to load the sound", error);
    } else {
      if (!sound.isPlaying()) {
        sound.play();
      }
    }
  });
};
