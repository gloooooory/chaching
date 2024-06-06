import { showMessage } from "react-native-flash-message";
import Sound from "react-native-sound";
import imagePath from "../constants/imagePath";
import Toast from "react-native-toast-message";

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
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export const playSound = () => {
  console.log("Play Sound!");
  const sound = new Sound(imagePath.soundFile, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("Failed to load the sound", error);
      return;
    }
    console.log("Sound loaded successfully");
    sound.play(success => {
      if (success) {
        console.log("Successfully finished playing");
      } else {
        console.log("Playback failed due to audio decoding errors");
      }
      sound.release();
    });
  });
};

export const showErrorToast = message => {
  Toast.show({
    type: "error",
    text1: "Error!",
    text2: message,
    visibilityTime: 2500,
    text2Style: { fontSize: 20, color: "black" },
  });
};

export const showSuccessToast = (message, time = 2500) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
    visibilityTime: time,
    text2Style: { fontSize: 20, color: "black" },
  });
};

export const showInfoToast = message => {
  Toast.show({
    type: "info",
    text1: "Notice",
    text2: message,
    visibilityTime: 2500,
    text2Style: { fontSize: 20, color: "black" },
  });
};
