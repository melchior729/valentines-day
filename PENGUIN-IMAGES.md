# Penguin Image Requirements 🐧

## Image Specifications

**Aspect Ratio:** 1:1 (Square)  
**Recommended Size:** 512x512 pixels (or higher for better quality)  
**Format:** PNG with transparent background (recommended) or JPG  
**File Location:** Place all images in the same folder as `index.html`

## Required Penguin Images

You need **9 different penguin expressions/poses**:

### 1. **penguin-sad.png**
- **Used:** Intro screen
- **Expression:** Sad, lonely, head down
- **Animation:** Breathing (subtle scale)
- **Context:** Before the game starts

### 2. **penguin-looking-left.png** (Optional - for gameplay)
- **Used:** Game canvas when moving left
- **Expression:** Looking/facing left
- **Animation:** None (canvas drawing)
- **Context:** During gameplay

### 3. **penguin-looking-right.png** (Optional - for gameplay)
- **Used:** Game canvas when moving right
- **Expression:** Looking/facing right
- **Animation:** None (canvas drawing)
- **Context:** During gameplay

### 4. **penguin-angry.png**
- **Used:** Results screen for low scores (0-50%)
- **Expression:** Angry, frustrated, maybe crossed flippers
- **Animation:** Shaking (side to side)
- **Context:** When player scores below 50%

### 5. **penguin-bored.png**
- **Used:** Results screen for mid scores (50-75%)
- **Expression:** Bored, unimpressed, neutral
- **Animation:** Slow breathing
- **Context:** When player scores 50-74%

### 6. **penguin-pleasant.png**
- **Used:** Results screen for good scores (75-99%)
- **Expression:** Happy, smiling, pleased
- **Animation:** Breathing (gentle scale)
- **Context:** When player scores 75-99%

### 7. **penguin-overjoyed.png**
- **Used:** Results screen for perfect score (100%)
- **Expression:** Very happy, big smile, excited
- **Animation:** Bouncing up and down
- **Context:** When player catches all 20 hearts

### 8. **penguin-questioning.png**
- **Used:** Valentine's question screen
- **Expression:** Shy, questioning, maybe blushing or tilting head
- **Animation:** Gentle tilting side to side
- **Context:** When asking "Will you be my Valentine?"

### 9. **penguin-overjoyed-arms-up.png**
- **Used:** Celebration screen after "Yes"
- **Expression:** Extremely happy, arms/flippers raised up, celebrating
- **Animation:** Bouncing continuously
- **Context:** Final celebration after accepting

## Quick Tips for Creating/Finding Images

1. **AI Generation:** Use tools like:
   - DALL-E, Midjourney, or Stable Diffusion
   - Prompt example: "Cute cartoon penguin with [expression], simple flat design, transparent background"

2. **Manual Drawing:** 
   - Use simple, clean lines
   - Keep the design consistent across all images
   - Antarctic colors: black, white, orange (beak/feet)

3. **Stock Images:**
   - Search for "cute penguin illustrations"
   - Ensure you have rights to use them
   - May need editing for expressions

4. **Placeholder Testing:**
   - The code currently shows 🐧 emoji as fallback
   - You can test with any square image first
   - Just name it correctly and replace later

## Current File Names in Code

```
penguin-sad.png                    → Intro
penguin-looking-left.png           → Game (optional)
penguin-looking-right.png          → Game (optional)  
penguin-angry.png                  → Results (low score)
penguin-bored.png                  → Results (mid score)
penguin-pleasant.png               → Results (good score)
penguin-overjoyed.png              → Results (perfect)
penguin-questioning.png            → Question screen
penguin-overjoyed-arms-up.png      → Celebration
```

## Testing Without Images

The website will show broken image icons if images are missing. To test:
1. Generate at least one image (e.g., `penguin-sad.png`)
2. Copy it and rename for other expressions temporarily
3. Replace with actual expressions later

## Font Changes Made
- Changed from Pacifico to **Fredoka One** (more playful, rounded)
- Instructions text made smaller (0.85rem instead of 0.95rem)
- Card padding optimized for larger penguin images
