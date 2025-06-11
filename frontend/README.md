# Frontend Project Documentation

## 📋 Overview

This is a React frontend application built with modern web technologies including Vite, React 19, TailwindCSS, and TypeScript support.

## 🛠 Tech Stack

- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Fast build tool and dev server
- **TailwindCSS 4.1.8** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React Router DOM 7.6.1** - Client-side routing
- **Axios 1.9.0** - HTTP client for API calls
- **Lucide React** - Beautiful SVG icons

## 📦 Dependencies

### Main Dependencies

- `react` & `react-dom` - Core React libraries
- `react-router-dom` - Routing solution
- `axios` - HTTP client
- `tailwindcss` & `@tailwindcss/vite` - Styling framework
- `lucide-react` - Icon library
- `file-saver` - File downloading utility
- `js-cookie` - Cookie management

### Development Dependencies

- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting
- `typescript` - Type checking

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Clone Repository

```bash
git clone <repository-url>
cd lapordaily
cd frontend
```

### Installation

```bash
# Install dependencies
npm install

# Or using yarn
yarn install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Development

```bash
# Start development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── layout/         # Layout for some page
│   └── App.jsx         # Main application component
├── public/             # Static assets
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # TailwindCSS configuration
└── .env                # Environment variables
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite with React and TailwindCSS plugins:

- React plugin for JSX/TSX support
- TailwindCSS plugin for styling
- Development server configured for local API at port 3000

### TailwindCSS

TailwindCSS 4.x is configured with the Vite plugin for optimal performance and developer experience.

## 🌐 API Integration

The application is configured to communicate with a backend API:

- Base URL: `http://localhost:3000` (development)
- HTTP client: Axios
- Cookie support: js-cookie for session management

## 📝 Available Scripts

| Script            | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start development server    |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Run ESLint for code quality |

## 🔄 Git Workflow

### Commit Guidelines

Follow conventional commit format:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### Example Commits

```bash
git add .
git commit -m "feat: implement user authentication"
git commit -m "fix: resolve routing issue on navigation"
git commit -m "docs: update installation instructions"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m "feat: add new feature"`
6. Push to the branch: `git push origin feature/new-feature`
7. Open a Pull Request

## 📋 Development Checklist

- [ ] Code follows ESLint rules
- [ ] Components are properly typed
- [ ] Responsive design implemented
- [ ] API integration tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Accessibility considerations met

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Change port in vite.config.ts or kill the process
npx kill-port 5173
```

**Dependencies not installing:**

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📞 Support

For questions or issues:

1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error logs and environment details

---

**Last Updated:** June 2025  
**Node Version:** 16+  
**Package Manager:** npm/yarn
