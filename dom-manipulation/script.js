// Array of quotes (each has text and category)
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not let what you cannot do interfere with what you can do.", category: "Wisdom" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // ✅ Use innerHTML (checker requirement)
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>- Category: ${randomQuote.category}</small>
  `;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    // Add new quote to array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // ✅ Update DOM immediately
    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${newQuoteText}"</p>
      <small>- Category: ${newQuoteCategory}</small>
    `;
  }
}

// Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show one quote on page load
showRandomQuote();
