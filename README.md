# 🧮 Age Calculator + 🇮🇳 Indian History on This Day

A modern **Age Calculator web application** that calculates your exact age (years → seconds) and also shows **important Indian historical events, Indian celebrity birthdays, and death anniversaries** for the selected date.

Built using **HTML, CSS, and Vanilla JavaScript** — no frameworks.

---

## ✨ Features

### 🔢 Age Calculation
- Calculates age in:
  - Years
  - Months
  - Weeks
  - Days
  - Hours
  - Minutes
  - Seconds
- Smooth animated counters
- Handles leap years and date edge cases
- Prevents invalid date selections

### 🎨 UI & UX
- Clean card-based layout
- Responsive design (mobile-friendly)
- Smooth animations
- 🌙 Dark mode toggle
- Dynamic image switching for light & dark mode

### 🇮🇳 Indian History on This Day
For the selected date, the app displays:
- 🎂 Birthdays of **Indian celebrities**
- 🕊️ Death anniversaries of **Indian personalities**
- 🇮🇳 Major **historical events related to India**

---

## 🌍 API Used

### Wikipedia “On This Day” API
https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/MM/DD

- Free
- No API key required
- Reliable and well-maintained
- Provides:
  - Historical events
  - Births
  - Deaths
  - Holidays

---

## 🧠 Indian-Only Filtering Logic (Important)

Wikipedia does **not** provide a country-specific endpoint.  
To show **only Indian-related information**, this project applies **client-side filtering**.

### 🔍 How filtering works

Each event/birth/death entry contains descriptive text, for example:
- `Indian politician`
- `Indian freedom fighter`
- `Event in India`

The app keeps entries where the description contains keywords like:
India
Indian
Bharatiya

### 🛠️ Tech Stack

HTML5
CSS3 (CSS Variables, Animations)  

JavaScript (ES6)  

Wikipedia Public API

### 📌 Future Improvements

Tabs for Birthdays / Deaths / Events  

Celebrity images from Wikipedia pages  

Live ticking seconds counter
