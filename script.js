// Quotes array with text and category properties
const quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Keep pushing forward.", category: "Inspiration" },
  { text: "Success comes with effort.", category: "Hard Work" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quote-display").textContent =
    `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("quote-text").value;
  const categoryInput = document.getElementById("quote-category").value;

  if (textInput && categoryInput) {
    quotes.push({ text: textInput, category: categoryInput });
    document.getElementById("quote-text").value = "";
    document.getElementById("quote-category").value = "";
    displayRandomQuote(); // update DOM with new quote
  }
}

// Event listeners
document.getElementById("new-quote-btn").addEventListener("click", displayRandomQuote);
document.getElementById("add-quote-btn").addEventListener("click", addQuote);

// Display one random quote at startup
displayRandomQuote();
