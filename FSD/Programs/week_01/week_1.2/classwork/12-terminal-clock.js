function displayClock() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  // Clear the console to update the clock
  console.clear();

  // Display the formatted time in the terminal
  console.log(`${hours}:${minutes}:${seconds}`);
}

// Update the clock every second
setInterval(displayClock, 1000);

// Initial display
displayClock();
