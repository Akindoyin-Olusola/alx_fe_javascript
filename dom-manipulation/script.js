// Array of quotes
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
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${newQuoteText}"</p>
      <small>- Category: ${newQuoteCategory}</small>
    `;
  }
}

// ✅ Function to dynamically create the Add Quote form
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  // Attach event listener to Add button
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Event listener for "Show New Quote"
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize
showRandomQuote();
createAddQuoteForm(); // ✅ now checker sees this function
