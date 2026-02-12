FinGuard - Personal Finance Management App
FinGuard is a comprehensive personal finance management application designed to help users track expenses, simulate purchases, and maintain financial health. The app provides predictive analytics and safety buffers to guide users in making informed financial decisions.

Table of Contents
Project Overview
Features
Technology Stack
File Structure
Getting Started
Running the Application
Commands
Development
Project Overview
FinGuard empowers individuals with intuitive tools that promote financial wellness through smart expense tracking, predictive modeling, and personalized insights. The application features a responsive design that works seamlessly on both mobile and desktop devices.

Features
Dashboard
Real-time financial overview
Total liquidity display
Safety buffer visualization
Upcoming obligations preview
Spending tips and insights
Expense Management
Add/edit/remove expenses
Categorize expenses (fixed/variable)
Set due dates for recurring bills
Visual expense breakdown
Purchase Simulation
Simulate potential purchases
Risk assessment (Low/Medium/High)
Balance projection after purchase
Future alerts preview
Voice notifications for safety status
Analytics & Insights
Spending patterns analysis
Category-wise breakdown
Historical trend visualization
Savings recommendations
Technology Stack
Frontend (Mobile)
Framework: React Native with Expo
Language: TypeScript
Styling: Tailwind CSS via NativeWind
Icons: Lucide React Native
State Management: React Context API
Database: Expo SQLite
Voice: Expo Speech
Backend (Server)
Framework: NestJS
Language: TypeScript
Database: PostgreSQL (with TypeORM)
Authentication: JWT, Passport
Configuration: @nestjs/config
File Structure
NEW PROJECT/
├── .git/
├── .qwen/
│   └── PROJECT_SUMMARY.md
├── apps/
│   ├── mobile/
│   │   ├── assets/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── screens/
│   │   │   └── utils/
│   │   ├── .expo/
│   │   ├── app.json
│   │   ├── App.tsx
│   │   ├── babel.config.js
│   │   ├── global.css
│   │   ├── metro.config.js
│   │   ├── nativewind-env.d.ts
│   │   ├── package.json
│   │   ├── PRD.md
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   ├── public/
│   │   ├── This is safe to buy  You can Buy this.mp3
│   │   └── This is not safe to buy  You cant Buy this.mp3
│   └── server/
│       ├── src/
│       │   ├── modules/
│       │   ├── config/
│       │   ├── middleware/
│       │   └── main.ts
│       ├── .env
│       ├── package.json
│       ├── tsconfig.json
│       └── dist/
├── node_modules/
├── .gitignore
└── README.md
Getting Started
Prerequisites
Node.js (v18 or higher)
npm or yarn
For mobile development:
Expo Go app on your device or iOS/Android emulators
For server development:
PostgreSQL database (or SQLite for development)
Installation
Clone the repository:
git clone <repository-url>
cd NEW PROJECT
Install dependencies for the mobile app:
cd apps/mobile
npm install
Install dependencies for the server:
cd ../server
npm install
Configure environment variables for the server:
cd ../server
cp .env.example .env
# Edit .env with your database credentials and other configurations
Running the Application
Mobile App (FinGuard)
To run the mobile application:

cd apps/mobile
npm start
This will start the Expo development server. You can then:

Scan the QR code with the Expo Go app on your phone
Open in an iOS simulator (if on macOS)
Open in an Android emulator
Open in web browser
Alternative commands:

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
Server
To run the backend server:

cd apps/server
npm run start:dev
This will start the NestJS server in development mode with hot reloading.

Alternative server commands:

# Build the server
npm run build

# Start production build
npm run start:prod

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
Commands
Mobile App Commands
npm start - Start the Expo development server
npm run android - Run on Android device/emulator
npm run ios - Run on iOS device/simulator
npm run web - Run on web browser
Server Commands
npm run start - Start the server
npm run start:dev - Start the server in development mode with watch
npm run start:debug - Start the server in debug mode
npm run start:prod - Start the production build
npm run build - Build the application
npm run test - Run tests
npm run test:watch - Run tests in watch mode
npm run test:cov - Run tests with coverage
npm run lint - Lint the codebase
Development
Mobile App Development
The mobile app is built with React Native and Expo. It uses:

NativeWind for styling with Tailwind CSS
React Context API for state management
Expo SQLite for local data storage
Expo Speech for voice notifications
Server Development
The server is built with NestJS and includes:

RESTful API endpoints
Authentication with JWT
Database integration with TypeORM
Configuration management
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Make your changes
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License.
