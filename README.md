# Valentine's Day Penguin Game

An interactive Valentine's Day website with a cute penguin character and heart-catching game.

---

## Project Structure

```
valentines-day/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and animations
├── js/
│   ├── main.js            # Core functionality and screen management
│   ├── game.js            # Canvas game logic and heart catching
│   ├── results.js         # Results screen and celebration effects
│   └── controls.js        # Button and keyboard controls
├── imgs/                  # Penguin images (your custom images)
│   ├── penguin-sad.png
│   ├── penguin-looking-left.png
│   ├── penguin-looking-right.png
│   ├── penguin-bored.png
│   ├── penguin-angry.png
│   ├── penguin-pleasant.png
│   ├── penguin-overjoyed.png
│   ├── penguin-questioning.png
│   └── penguin-overjoyed-arms-up.png
├── audio/
│   └── celebration.mp3    # Celebration music
└── README.md
```

## Features

- Clean modular code structure (HTML/CSS/JS separated)
- Antarctic-themed background with falling snowflakes
- Heart-catching canvas game with directional penguin sprites
- Score-based progression (75%+ to win)
- Dynamic penguin expressions based on movement and score
- Mobile-optimized controls (right thumb area)
- Celebration with confetti, hearts, and music
- Responsive design for all screen sizes

## Penguin Sprite Behavior

During gameplay, the penguin sprite changes based on input:
- **Holding LEFT button:** Shows `penguin-looking-left.png`
- **Holding RIGHT button:** Shows `penguin-looking-right.png`
- **Idle (no input):** Shows `penguin-bored.png`

## Image Requirements

**All images should be:**
- Square format (1:1 aspect ratio)
- 512x512 pixels recommended
- PNG format with transparent background
- Placed in the `imgs/` folder

## Music Setup

Your `celebration.mp3` file is already configured in `audio/` folder. It will play automatically when the player clicks "Yes" on the Valentine's question.

## Testing

**Desktop:**
- Use arrow keys or mouse to click control buttons
- Penguin changes sprite based on movement

**Mobile:**
- Use stacked arrow buttons on the right side
- Optimized for right-thumb control
- Test on Safari iOS for best experience

## Customization

### Change Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --color-pink: #FF85B3;
    --color-ice-blue: #B4D7E8;
    /* etc. */
}
```

### Change Text
Edit `index.html` and update the text content in each screen section.

### Adjust Game Difficulty
Edit `js/game.js`:
- Heart spawn rate: Line with `Math.random() < 0.02`
- Heart fall speed: `Heart` class constructor
- Total hearts needed: Change `totalHearts: 20` in `GameState`

## Code Structure

- **main.js**: Handles screen transitions, snowflakes, countdown
- **game.js**: Canvas rendering, collision detection, game loop
- **results.js**: Score calculation, feedback messages, celebration effects
- **controls.js**: Touch/mouse/keyboard event handlers

---


## Author

**Abhay Manoj**

[My GitHub](https://github.com/melchior729)

[My LinkedIn](https://linkedin.com/in/abhaymanoj729)

