# MoneyScope Mobile App

This repository contains the source code for the "MoneyScope" mobile application.

## Features

* **Onboarding Flow:** Interactive introduction for new users.
* **Authentication:** User registration.
* **Account Overview:** Displays account type, number, available balance, date added.
* **Transaction History:** Shows a list of recent financial transactions.
* **Robust Network Handling:** Implements `axios-retry` for resilient API requests against network errors.
* **User-Friendly Error Messages:** Clear feedback for API and validation issues.
* **Theme Support:** Automatic light/dark mode based on system preferences.

## Technologies

* **React Native**
* **Expo**
* **TypeScript**
* **Axios**
* **Axios-Retry**
* **React Navigation**
* **React Hook Form & Yup**
* **AsyncStorage**

## Getting Started

### 1. Clone the repository

### 2. Install dependencies
```
cd moneyscope
npm install 
```
### 3. Run the application
```
npm run start
```

Once the server starts, a QR code will appear in your terminal. You can then:

* **Scan the QR code using the Expo Go app on your mobile device (Android or iOS).**
* **Press 'a' in the terminal to run on an Android emulator/device.**
* **Press 'i' in the terminal to run on an iOS simulator/device (requires macOS).**

