# Code Quest Game

A puzzle-based web game built with Next.js, TypeScript, and Material-UI where players solve various coding and logic challenges.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm
- Git

### Available Scripts
```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
│
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ │ ├── beacon/ # Beacon API endpoints
│ │ └── leaderboard/ # Leaderboard API endpoints
│ └── leaderboard/ # Leaderboard page
│
├── components/
│ ├── common/ # Shared components
│ │ ├── Button/
│ │ ├── Footer/
│ │ ├── GiphyImage/
│ │ ├── Header/
│ │ ├── Instructions/
│ │ └── UserForm/
│ ├── Layout/ # Layout component
│ ├── leaderboard/ # Leaderboard components
│ └── puzzles/ # Puzzle components
│ ├── puzzle1/
│ ├── puzzle2/
│ ├── puzzle3/
│ ├── puzzle4/
│ └── puzzle5/
│
├── hooks/ # Custom React hooks
│
├── redux/ # Redux store configuration
│
├── slices/ # Redux slices
│
├── types/ # TypeScript types
│
└── utils/ # Utility functions

public/
│
├── bg/ # Background images
│
├── common/ # Common assets
│ ├── logo.png
│ └── code-quest.png
│
└── puzzle{1-5}/ # Puzzle assets
├── main.gif
├── success.gif
└── failure.gif
```

## 🧩 Adding a New Puzzle

1. Create a new puzzle component in `src/components/puzzles/puzzle{N}/`:
```typescript
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { states } from '../../../slices/puzzleSlice'
import { usePuzzle } from '../../../hooks/usePuzzle'
import { setTitle } from '../../../slices/headerSlice'
import { setTimer } from '../../../slices/footerSlice'
const PuzzleN = () => {
const dispatch = useDispatch()
const { status } = useSelector((state: any) => state.puzzle)
const { next, retry, success, failure } = usePuzzle()
useEffect(() => {
if (status === states.IN_PROGRESS) {
dispatch(setTitle('Puzzle N: Your Puzzle Title'))
dispatch(setTimer(300)) // Set time limit in seconds
}
}, [status, dispatch])
// Your puzzle logic here
return (
<Layout>
{/ Your puzzle UI /}
</Layout>
)
}
export default PuzzleN
```

2. Add puzzle assets in `public/puzzleN/`
   - Required files: `main.gif`, `success.gif`, `failure.gif`
   - Any additional images/assets needed for the puzzle

3. Add puzzle to `HomeContent.tsx`:

```typescript
import PuzzleN from '@/components/puzzles/puzzleN/PuzzleN'
// Add to renderPuzzle switch statement
case N:
return <PuzzleN />

```


## 🎮 Game Flow

1. **User Start**
   - Players enter name and email
   - Data stored in localStorage
   - Timer starts tracking total completion time

2. **Puzzle Flow**
   - Each puzzle has 3 states: IN_PROGRESS, SUCCESS, FAILURE
   - Timer countdown for each puzzle
   - Success/Failure handlers manage state transitions

3. **Completion**
   - Final puzzle submits score to leaderboard
   - Records: completion time, retries, total time

## 🔧 Key Features

### Timer System
- Global timer in Footer component
- Individual puzzle time limits
- Automatic failure on timeout

### State Management
- Redux store manages:
  - Current puzzle state
  - Timer
  - Header title
  - Game progress

### Puzzle Hook
The `usePuzzle` hook provides:
- Success/failure handlers
- Next/retry functions
- Image source management


# 📝 Best Practices

1. **Puzzle Development**
   - Keep puzzles modular and self-contained
   - Use shared components from `common/`
   - Follow existing puzzle patterns
   - Include clear instructions

2. **State Management**
   - Use Redux for global state
   - Local state for puzzle-specific logic
   - Handle cleanup in useEffect

3. **Styling**
   - Use Material-UI (MUI) components
   - Follow existing theme
   - Ensure mobile responsiveness

## 🔒 Security

- Admin password for leaderboard access
- JWT validation for beacon signals
- Input sanitization for user data

## 🐛 Debugging

1. Enable Redux DevTools in development
2. Use browser console for puzzle state
3. Check localStorage for user data
4. Monitor network requests in puzzle3 (beacon)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow code style guidelines
4. Test thoroughly
5. Submit pull request

Happy Coding! 🎮✨
