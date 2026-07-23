# TypeVibe - Modern Typing Practice App

⌨️ **Feel the rhythm of typing** - A modern, beautiful typing practice application with Glassmorphism UI design.

## ✨ Features

- 🎮 **Modern Glassmorphism UI** - Sleek and contemporary design
- ⚡ **Real-time Statistics** - Live WPM, accuracy, and progress tracking
- 🎯 **Difficulty Levels** - Easy, Medium, Hard modes
- 📚 **Practice Modes** - Articles, Words, Sentences, Code snippets
- 🏆 **Leaderboard** - Track your best scores
- 📊 **Personal Stats** - View your typing performance
- 💾 **Local Storage** - Automatically saves all scores
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Neon Gradients** - Eye-catching animations and effects

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gz3020/typing-app.git
cd typing-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── TypingTest.tsx  # Main typing test component
│   ├── DifficultySelector.tsx
│   ├── ModeSelector.tsx
│   ├── StatsCard.tsx
│   ├── Leaderboard.tsx
│   └── *.css           # Component styles
├── types/              # TypeScript types
├── utils/              # Utility functions
│   ├── storage.ts      # LocalStorage management
│   └── textGenerator.ts
├── styles/             # Global styles
│   └── globals.css
└── App.tsx             # Main app component
```

## 🎮 How to Use

1. **Select Difficulty** - Choose Easy, Medium, or Hard
2. **Select Mode** - Pick Articles, Words, Sentences, or Code
3. **Start Typing** - Click in the input area and begin
4. **View Results** - See your WPM, accuracy, and stats
5. **Check Leaderboard** - View your best scores

## 🎨 Design Features

- **Glassmorphism**: Beautiful frosted glass effect with blur
- **Neon Colors**: Cyan (#00d4ff), Purple (#8338ec), Pink (#ff006e)
- **Smooth Animations**: 0.3s cubic-bezier transitions
- **Dark Theme**: Easy on the eyes for extended typing sessions
- **Responsive**: Adapts beautifully to any screen size

## 📊 Metrics Tracked

- **WPM (Words Per Minute)** - Your typing speed
- **Accuracy** - Percentage of correct characters
- **Duration** - Time taken to complete
- **Difficulty** - Selected difficulty level
- **Mode** - Practice mode used
- **Timestamp** - When the test was completed

## 🔧 Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling with animations
- **LocalStorage API** - Data persistence

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 🎯 Future Enhancements

- [ ] Multiplayer mode
- [ ] Advanced statistics and charts
- [ ] Custom text upload
- [ ] Sound effects
- [ ] Dark/Light theme toggle
- [ ] Progressive Web App (PWA)
- [ ] Keyboard shortcuts
- [ ] Theme customization

---

**Made with ❤️ for typing enthusiasts**
