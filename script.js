const birthInput = document.getElementById("birthdate");
const currentInput = document.getElementById("currentdate");
const calcBtn = document.getElementById("calculate-btn");
const values = document.querySelectorAll(".value");

// default current date
currentInput.valueAsDate = new Date();

calcBtn.addEventListener("click", calculateAge);

function animateValue(el, end) {
  let start = 0;
  const duration = 500;
  const startTime = performance.now();

  function update(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    el.textContent = Math.floor(progress * end);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function calculateAge() {
  if (!birthInput.value || !currentInput.value) return;

  const birthDate = new Date(birthInput.value);
  const currentDate = new Date(currentInput.value);

  if (birthDate > currentDate) {
    alert("Birthdate cannot be after current date");
    return;
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = currentDate - birthDate;
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  const results = [
    years,
    months,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds
  ];

  values.forEach((el, i) => animateValue(el, results[i]));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const ageColor = document.getElementById("age-icon");
  document.body.classList.contains("dark") ? ageColor.src = "age-color.png" : ageColor.src = "age-range.png";
}

async function fetchIndianHistory(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  const list = document.getElementById("history-list");
  list.innerHTML = "<li>Loading Indian historical data...</li>";

  try {
    const res = await fetch(url);
    const data = await res.json();
    list.innerHTML = "";

    const isIndian = (text = "") =>
      /india|indian|bharatiya/i.test(text);

    // 🇮🇳 EVENTS IN INDIA
    data.events.forEach(ev => {
      if (isIndian(ev.text)) {
        const li = document.createElement("li");
        li.textContent = `🇮🇳 ${ev.year}: ${ev.text}`;
        list.appendChild(li);
      }
    });

    // 🎂 INDIAN BIRTHDAYS
    data.births.forEach(b => {
      if (isIndian(b.text)) {
        const li = document.createElement("li");
        li.textContent = `🎂 ${b.year}: ${b.text}`;
        list.appendChild(li);
      }
    });

    // 🕊️ INDIAN DEATH ANNIVERSARIES
    data.deaths.forEach(d => {
      if (isIndian(d.text)) {
        const li = document.createElement("li");
        li.textContent = `🕊️ ${d.year}: ${d.text}`;
        list.appendChild(li);
      }
    });

    if (!list.hasChildNodes()) {
      list.innerHTML = "<li>No notable Indian records found for this date.</li>";
    }

  } catch (err) {
    list.innerHTML = "<li>Failed to load Indian historical data.</li>";
  }
}


birthInput.addEventListener("change", () => fetchIndianHistory(birthInput.value));
currentInput.addEventListener("change", () => fetchIndianHistory(currentInput.value));

// Initial fetch for default current date
fetchIndianHistory(currentInput.value);
