# React Native Maps Demo

This repository demonstrates how to use React Native Maps to create interactive map-based applications. It includes features like user location tracking, custom polygon rendering from fake database data, and interactive map markers. The goal is to provide a simple foundation for building location-based apps with React Native.

## Features

- **User Location Tracking**: Track and display the user's current location on the map.
- **Custom Polygon Rendering**: Render custom polygons on the map using data from a fake database.
- **Interactive Map Markers**: Add interactive markers to the map that respond to user actions.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **React Native CLI**: Install the React Native CLI globally using npm:
  ```bash
  npm install -g react-native-cli
  ```
- **Android Studio/Xcode**: Set up your development environment for React Native as per the [React Native documentation](https://reactnative.dev/docs/environment-setup).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your_username/react-native-maps-demo.git
   cd react-native-maps-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Link React Native Maps**:
   ```bash
   npx react-native link react-native-maps
   ```

### Running the App

#### Android

1. **Start the Metro Bundler**:
   ```bash
   npx react-native start
   ```

2. **Run the app on an Android emulator or device**:
   ```bash
   npx react-native run-android
   ```

#### iOS

1. **Install CocoaPods dependencies**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Start the Metro Bundler**:
   ```bash
   npx react-native start
   ```

3. **Run the app on an iOS simulator or device**:
   ```bash
   npx react-native run-ios
   ```

## Project Structure

- `src/components`: Contains reusable React components.
- `src/screens`: Contains the main application screens.
- `src/services`: Contains services for data fetching and other utilities.
- `src/assets`: Contains static assets like images and icons.
- `src/styles`: Contains style definitions for the application.

## Usage

### User Location Tracking

The app tracks and displays the user's current location on the map using the `react-native-maps` library. Make sure to request the necessary location permissions from the user.

### Custom Polygon Rendering

Custom polygons are rendered on the map using data fetched from a fake database. This demonstrates how to visualize complex shapes and regions on the map.

### Interactive Map Markers

Interactive map markers are added to the map, allowing users to interact with specific points of interest. Customize the markers to display additional information or trigger actions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is for learning purposes and does not have a license.

---
