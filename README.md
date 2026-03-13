# InviteAgent3

A modern web application for managing invitations and events. Built with vanilla HTML, CSS, and JavaScript following modern web development best practices.

## Features

- 🎨 Beautiful, responsive design
- 📱 Mobile-first approach
- ♿ Accessibility-focused
- 🎯 Modern ES6+ JavaScript
- 🔧 Production-ready configuration
- 📦 Modular architecture
- 🎭 Component-based structure
- 🌙 Theme support ready
- 📊 Local storage integration
- 🚀 Performance optimized

## Tech Stack

- **HTML5** - Semantic markup with accessibility best practices
- **CSS3** - Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)** - Modular architecture with modern features
- **No frameworks** - Pure vanilla JavaScript for maximum performance

## Project Structure

```
inviteAgent3/
├── index.html              # Main HTML file
├── package.json            # Node.js dependencies and scripts
├── .gitignore             # Git ignore rules
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore rules
├── README.md              # This file
├── assets/                # Static assets
│   └── favicon.ico        # Favicon
└── src/                   # Source files
    ├── css/               # Stylesheets
    │   ├── reset.css      # CSS reset
    │   ├── variables.css  # CSS custom properties
    │   ├── base.css       # Base styles
    │   ├── components.css # Component styles
    │   ├── layout.css     # Layout styles
    │   └── utilities.css  # Utility classes
    └── js/                # JavaScript files
        ├── utils.js       # Utility functions
        ├── components.js  # Reusable components
        └── main.js        # Main application file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

This will start a live server on http://localhost:3000 with auto-reload.

### Alternative Development Setup

If you prefer not to use the live server, you can serve the files using:
```bash
npm start
```

Or simply open `index.html` in your browser (though some features may require a server).

### Building for Production

Run linting and formatting checks:
```bash
npm run build
```

### Code Quality

- **Lint JavaScript:**
  ```bash
  npm run lint
  ```

- **Fix linting issues:**
  ```bash
  npm run lint:fix
  ```

- **Format code:**
  ```bash
  npm run format
  ```

- **Check formatting:**
  ```bash
  npm run format:check
  ```

## Features Overview

### Navigation
- Responsive navigation with mobile hamburger menu
- Smooth scrolling to sections
- Active link highlighting based on scroll position

### Components
- **Modal System**: Accessible modals with keyboard navigation
- **Alert System**: Toast notifications with auto-dismiss
- **Loading Spinner**: Global loading state management
- **Form Validation**: Client-side form validation with real-time feedback

### Utilities
- DOM manipulation helpers
- Local storage management
- Date and string utilities
- Array manipulation functions
- API request helpers
- Debounce and throttle functions

### Responsive Design
- Mobile-first CSS approach
- Flexible grid system
- Responsive typography
- Touch-friendly interface

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast mode support

### Performance
- Minimal dependencies
- Optimized CSS with custom properties
- Lazy loading ready
- Service worker ready
- Modern JavaScript features

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Configuration

### ESLint
The project uses Airbnb's ESLint configuration for code quality. Configuration can be found in `.eslintrc.json`.

### Prettier
Code formatting is handled by Prettier. Configuration is in `.prettierrc`.

### Package.json Scripts
- `start`: Serve the application using serve package
- `dev`: Start development server with live reload
- `build`: Run linting and formatting checks
- `lint`: Check JavaScript for linting errors
- `lint:fix`: Automatically fix linting errors
- `format`: Format all code using Prettier
- `format:check`: Check if code is properly formatted

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

InviteAgent3 Team

---

*Built with ❤️ using modern web technologies*