const birthInput = document.getElementById("birthdate");
const currentInput = document.getElementById("currentdate");
const calcBtn = document.getElementById("calculate-btn");

// result divs
const yearsDiv = document.querySelector(".years");
const monthsDiv = document.querySelector(".months");
const weeksDiv = document.querySelector(".weeks");
const daysDiv = document.querySelector(".days");
const hoursDiv = document.querySelector(".hours");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");

calcBtn.addEventListener("click", calculateAge);

function calculateAge() {
  if (!birthInput.value || !currentInput.value) {
    alert("Please select both dates");
    return;
  }

  const birthDate = new Date(birthInput.value);
  const currentDate = new Date(currentInput.value);

  if (birthDate > currentDate) {
    alert("Birthdate cannot be after the current date");
    return;
  }

  // ---- Years & Months Calculation ----
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // ---- Total Time Calculations ----
  const diffMs = currentDate - birthDate;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // ---- Display Results ----
  yearsDiv.innerHTML = `<b>Years:</b> ${years}`;
  monthsDiv.innerHTML = `<b>Months:</b> ${months}`;
  weeksDiv.innerHTML = `<b>Weeks:</b> ${totalWeeks}`;
  daysDiv.innerHTML = `<b>Days:</b> ${totalDays}`;
  hoursDiv.innerHTML = `<b>Hours:</b> ${totalHours}`;
  minutesDiv.innerHTML = `<b>Minutes:</b> ${totalMinutes}`;
  secondsDiv.innerHTML = `<b>Seconds:</b> ${totalSeconds}`;
}
