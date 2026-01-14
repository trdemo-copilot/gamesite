# gamesite
a demo repo for gh copilot workspace

## Multi-Language Number Guessing Game

A simple number guessing game with full internationalization support.

### Features

- 🎮 Interactive number guessing game (1-100)
- 🌍 Multi-language support (English, Chinese, Japanese)
- 💾 Language preference saved in localStorage
- 📊 Guess history tracking
- 🎨 Modern, responsive design

### Supported Languages

- **English** (en)
- **中文** (zh) - Chinese
- **日本語** (ja) - Japanese

### How to Play

1. Open `index.html` in your web browser
2. Select your preferred language using the language switcher at the top
3. Enter a number between 1 and 100
4. Click "Submit" or press Enter
5. Follow the hints (too high/too low) to find the correct number
6. Try to guess in as few attempts as possible!

### Technical Details

#### File Structure

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `i18n.js` - Internationalization module
- `game.js` - Game logic

#### i18n Implementation

The internationalization system is implemented using a custom JavaScript module:

- **Language Detection**: Automatically loads the user's preferred language from localStorage
- **Dynamic Translation**: All UI text is translated dynamically when language changes
- **Event-Driven**: Uses custom events to notify components of language changes
- **Extensible**: Easy to add new languages by extending the translations object

#### Adding a New Language

To add a new language, edit `i18n.js`:

1. Add a new language object in the `translations` constant
2. Add a language button in `index.html`:
   ```html
   <button class="lang-btn" data-lang="your-lang-code">Your Language</button>
   ```

Example:
```javascript
const translations = {
    // ... existing languages
    es: {
        'page-title': 'Juego de Adivinar Números',
        'game-title': 'Juego de Adivinar Números',
        // ... other translations
    }
};
```

### Development

No build process required - just open `index.html` in a modern web browser.

### Browser Support

Works on all modern browsers that support ES6 features:
- Chrome/Edge 51+
- Firefox 54+
- Safari 10+

---

由AI生成，请务必仔细验证 
