# Audio Ad Recognition App

This is a React Native CLI project for Android that integrates the LISNR SDK to enable audio pattern recognition and fetching of ad URLs from a backend server.

## Description

<video width="1024" height="768" controls>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

The Audio Ad Recognition App is designed to listen to various types of advertisements, including MP3, WAV, TV ads, radio ads, and YouTube videos. By analyzing the audio patterns using the LISNR SDK, the app extracts relevant text from the advertisements. Once the text is obtained, the app sends a request to the backend server to fetch the corresponding URL associated with the ad. Finally, the app opens the retrieved URL, allowing users to interact with the advertisement.

## Features

- Audio pattern recognition using the LISNR SDK
- Support for various advertisement formats (MP3, WAV, TV ads, radio ads, YouTube videos)
- Text extraction from recognized audio patterns
- Fetching ad URLs from the backend server
- Opening the retrieved ad URLs within the app

## Prerequisites

Before running the app, ensure that you have the following:

- Node.js and npm (Node Package Manager) installed on your machine
- Android development environment set up, including Android SDK and Android Studio
- React Native CLI installed globally

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### Configure the backend server

Update the `constants.js` file with the appropriate backend server URL.

```javascript
export const BASE_URL = "http://3.93.186.5:8000";
```

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Deployment

To deploy the app to the Google Play Store, follow these steps:

1. Generate a signed APK:

   - Open Android Studio and load the `android` folder of your project.
   - Go to Build > Generate Signed Bundle / APK.
   - Follow the prompts to create a new keystore or use an existing one.
   - Select the build variant (e.g., release) and generate the signed APK.

2. Upload the signed APK to the Google Play Console:

   - Create a new developer account or sign in to your existing account on the Google Play Console.
   - Create a new app and provide the necessary information.
   - Upload the signed APK to the app release section.
   - Configure the app's metadata, pricing, and distribution settings.

3. Submit the app for review:

   - Once you have completed all the required information and uploaded the APK, submit the app for review.
   - The Google Play team will review your app and provide feedback if necessary.

4. Publish the app:

   - After the app has been approved, you can publish it to the Google Play Store.
   - The app will become available for users to download and install.

## License

This project is licensed under the [MIT License](LICENSE).
