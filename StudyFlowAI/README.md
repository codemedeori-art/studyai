# StudyFlow AI - Smart Study Planner

A modern, AI-powered study planning and productivity application built with React, Firebase, and Google Gemini AI.

## 🌟 Features

- **AI-Powered Study Scheduling**: Generate personalized 7-day study schedules using Gemini AI
- **Smart Task Management**: Track your daily tasks and assignments
- **Habit Tracking**: Build consistent study habits with streak tracking
- **Pomodoro Timer**: Stay focused with the built-in 25-minute focus timer
- **AI Study Assistant**: Chat with an AI-powered study assistant for advice and help
- **Advanced Analytics**: Track your productivity, study hours, and progress
- **Dark Mode**: Beautiful dark theme for comfortable studying
- **Real-time Sync**: All your data syncs in real-time with Firebase
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend**: React.js 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend/Database**: Firebase (Firestore + Authentication)
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Firebase project (free tier works!)
- Google Gemini API key

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd StudyFlowAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase credentials (get from Firebase Console)
   - Add your Gemini API key (get from Google AI Studio)
   ```
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_AUTH_DOMAIN=xxx
   VITE_FIREBASE_PROJECT_ID=xxx
   VITE_FIREBASE_STORAGE_BUCKET=xxx
   VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
   VITE_FIREBASE_APP_ID=xxx
   VITE_GEMINI_API_KEY=xxx
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Opens at http://localhost:3000

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── layouts/            # Layout components
├── routes/             # Route definitions
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── firebase/           # Firebase configuration
├── services/           # API and database services
├── utils/              # Utility functions
├── assets/             # Images and static files
├── animations/         # Animation configurations
├── styles/             # Global styles
├── main.jsx            # Entry point
├── index.css           # Global CSS
└── App.jsx             # Main app component
```

## 🎨 Pages

1. **Landing Page** - Marketing homepage with features and testimonials
2. **Login/Signup** - Authentication with email and Google OAuth
3. **Dashboard** - Main hub with tasks, timer, and stats
4. **Study Planner** - AI-powered schedule generator
5. **AI Assistant** - Chat interface with Gemini
6. **Habit Tracker** - Build study habits with streak tracking
7. **Analytics** - Productivity charts and statistics
8. **Settings** - User preferences and profile

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable:
   - Authentication (Email + Google)
   - Firestore Database
4. Copy your config credentials to `.env`

### Firestore Collections

- **users**: User profiles and data
- **tasks**: Daily tasks and assignments
- **habits**: Tracked habits
- **studyPlans**: Generated study schedules
- **chats**: AI chat history
- **analytics**: User analytics data

### Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤖 Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` file

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Deploy to Vercel

1. Push your project to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Firebase Hosting

```bash
npm run build
npx firebase deploy
```

## 🎯 Features In Detail

### AI Study Schedule Generator
Generate personalized study schedules by:
- Adding your subjects
- Setting exam dates
- Identifying weak topics
- Specifying daily study hours

The AI creates a day-by-day schedule tailored to your needs.

### Pomodoro Timer
- 25-minute focused work sessions
- 5-minute breaks
- Session tracking
- Sound notifications

### Habit Tracker
- Create custom habits
- Track daily completion
- Maintain streaks
- Visual progress

### Analytics Dashboard
- Weekly study hours chart
- Productivity score tracking
- Subject distribution pie chart
- Performance metrics

## 🛣️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Collaborative study groups
- [ ] Advanced AI tutoring
- [ ] Spaced repetition system
- [ ] Video note-taking
- [ ] Study group chat
- [ ] Achievement badges system
- [ ] Leaderboards

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 💬 Support

For questions or support:
- Open an issue on GitHub
- Check existing documentation
- Review the codebase comments

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Firebase
- AI features by Google Gemini
- Design inspiration from modern SaaS apps

## 📊 Version

- **Current**: 1.0.0
- **Status**: Production Ready

---

**Happy Studying! 🎓**