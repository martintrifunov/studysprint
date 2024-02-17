# StudySprint

StudySprint is an innovative mobile application whose role is to help your
productivity using the Pomodoro technique at work. It also enables
synchronization of work sessions between multiple users in real time.

This is the frontend for the application built in React Native & Expo.

If you'd like to access and read the documentation for the backend you can find it <a href="https://github.com/telechubby/StudySprint-API-Interen">here.</a>

## Features

- State Management with Hooks & Context API
- Authentication and Authorization system using JWT sent from our backend
- Custom vanilla CSS UI elements
- Custom Animations
- Camera and Flash
- Vibration motor
- Toastify reminders
- Friend System
- Party System to study/work together
- Synchronized Pomodoro Clock across all users in the party
- Stack based routing

## Design Patterns for the Frontend

- Componentization
- Reusable Components
- Context Provider
- Modular Driven Design (every screen is a separate module)
- Microservices

## Setup Guide

### Make sure to install Node.js and npm

<a href="https://www.youtube.com/watch?v=KtTe_ckT3iM&ab_channel=ProgrammingKnowledge">How To Install Node.js</a>

### Make sure to install an emulator/simulator
<a href="https://www.youtube.com/watch?v=xKGESzemfdw&ab_channel=Codevolution">How to install Android Emulator</a>


<a href="https://www.youtube.com/watch?v=DloY4tyzKDA&ab_channel=Codevolution">How to install iPhone Simulator(Only If you're on MacOS)</a>

Pull the project <br>

Run the commands:
```bash
 npm install
 npm start
```

When the project starts press 'a' or 'i' to run the project on your emulator/simulator.

Pres 'r' to reload.

## Development Guide

### Make sure to follow a modular driven design

Follow the other bundles as an example.

- Step 1. Create a bundle directory with your assets/components/configs/pages subdirectories

- Step 2. Make every feature/function as modular and reusable as possible

- Step 3. Link them to the main app for navigation
