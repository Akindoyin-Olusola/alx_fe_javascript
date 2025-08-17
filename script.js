// Array of quotes with text and category
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Resilience" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quote").textContent = quote.text;
  document.getElementById("category").textContent = `Category: ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
  const quoteInput = document.getElementById("quote-input").value.trim();
  const categoryInput = document.getElementById("category-input").value.trim();

  if (quoteInput !== "" && categoryInput !== "") {
    quotes.push({ text: quoteInput, category: categoryInput });
    document.getElementById("quote-input").value = "";
    document.getElementById("category-input").value = "";
    alert("Quote added successfully!");
  }
}

// Event listeners
document.getElementById("new-quote").addEventListener("click", displayRandomQuote);
document.getElementById("add-quote").addEventListener("click", addQuote);

// Display one quote when page loads
displayRandomQuote();
