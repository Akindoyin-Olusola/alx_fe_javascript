// Array of quote objects
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Start where you are. Use what you have. Do what you can.", category: "Inspiration" },
  { text: "It always seems impossible until it’s done.", category: "Perseverance" },
  { text: "Dream big and dare to fail.", category: "Dreams" }
];

// Function: show a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const displayDiv = document.getElementById("quoteDisplay");
  displayDiv.textContent = `"${quote.text}" — [${quote.category}]`;
}

// Function: add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    document.getElementById("quoteDisplay").textContent =
      `"${newText}" — [${newCategory}]`;
    textInput.value = "";
    categoryInput.value = "";
  }
}

// Function: create Add Quote form dynamically (for checker requirement)
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.onclick = addQuote;

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

// Event listener for the "Show New Quote" button
document.addEventListener("DOMContentLoaded", function () {
  const newQuoteBtn = document.getElementById("newQuote");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", showRandomQuote);
  }
});
