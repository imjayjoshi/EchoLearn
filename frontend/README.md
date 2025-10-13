# SpeakWise Frontend

A modern web application for learning through voice and speech recognition, built with React, TypeScript, and Tailwind CSS.

## Project Overview

SpeakWise's frontend is a responsive and user-friendly interface that helps users practice and improve their language skills through voice interaction. The application features a clean design with both light and dark modes, and provides real-time feedback on user performance.

## Tech Stack

- **React** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Reusable component library
- **React Router** - Client-side routing
- **Vite** - Build tool and development server

## Project Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable React components
│   │   ├── ui/         # Shadcn UI components
│   │   └── ...         # Custom components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and helpers
│   ├── pages/          # Page components
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Public assets
└── package.json        # Project dependencies
```

## Key Features

- **Authentication System**: Secure user authentication and authorization
- **Dashboard**: Personal progress tracking and learning statistics
- **Practice Interface**: Interactive voice-based learning exercises
- **Progress Tracking**: Visual representation of learning progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Design System

The application uses a consistent design system with:

- Custom UI components built with Shadcn/ui
- Responsive layouts using Tailwind CSS
- Consistent typography and spacing
- Accessible components following WCAG guidelines

## State Management

- Local state management using React hooks
- Persistent storage for user preferences

## Performance Features

- Vite-powered development with HMR (Hot Module Replacement)
- Code splitting for optimal load times
- Asset optimization
- Lazy loading of components
- Efficient routing system

## Screenshots

Screenshots of the application can be found in the `docs/screenshots` directory. For convenience, a gallery of the current screenshots is embedded below so team members and contributors can preview key screens without opening the folder.


### User screens

![Landing Page](docs/screenshots/User/LandingPage.png)
*Landing page with hero section and call-to-action.*

![Sign Up](docs/screenshots/User/SignUp.png)
*Sign up form / onboarding flow.*

![Sign In](docs/screenshots/User/SignIn.png)
*Sign in / authentication screen.*

![Features](docs/screenshots/User/Features.png)
*Features page highlighting app capabilities.*

![Works](docs/screenshots/User/Works.png)
*How it works / user flow explanation.*

![Footer](docs/screenshots/User/Footer.png)
*Footer section example with links and copyright.*


### Dashboard

![Dashboard 1](docs/screenshots/Dashboard/Dashboard-1.png)
*Dashboard — main overview, widgets and stats.*

![Dashboard 2](docs/screenshots/Dashboard/Dashboard-2.png)
*Dashboard — alternate view with detailed panels.*

![Progress 1](docs/screenshots/Dashboard/Progress-1.png)
*Progress — user progress visualization and charts.*

![Progress 2](docs/screenshots/Dashboard/Progress-2.png)
*Progress — another view of progress tracking.*

![Practice Mode](docs/screenshots/Dashboard/Practice.png)
*Practice — interactive practice interface with voice input.*

![Feedback 1](docs/screenshots/Dashboard/Feedback-1.png)
*Feedback — example of feedback provided after a practice session.*

![Feedback 2](docs/screenshots/Dashboard/Feedback-2.png)
*Feedback — score breakdown and suggestions.*

![Feedback 3](docs/screenshots/Dashboard/Feedback-3.png)
*Feedback — detailed corrections and tips.*

### Admin

![Admin Dashboard](docs/screenshots/Admin/adminDashboard.png)
*Admin — main admin dashboard overview.*

![Admin Dashboard 2](docs/screenshots/Admin/adminDashboard2.png)
*Admin — alternate dashboard / overview.*

![User Management](docs/screenshots/Admin/userManagement.png)
*Admin — manage users and roles.*

![Phrases Management](docs/screenshots/Admin/PhrasesManagement.png)
*Admin — add/edit/remove phrases used in exercises.*

![Add Phrase](docs/screenshots/Admin/addPhrase.png)
*Admin — form to add a new phrase.*

![Profile & Settings](docs/screenshots/Admin/profileSetting.png)
*Admin — profile and settings page.*

![Profile & Settings 2](docs/screenshots/Admin/profileSetting2.png)
*Admin — alternate profile/settings view.*

![Reports & Analysis](docs/screenshots/Admin/reportAnalysis.png)
*Admin — reports and analytics view.*
