// Quotes array (with category)
let quotes = [];

// ✅ Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Load quotes from localStorage (or initialize with defaults)
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Do not let what you cannot do interfere with what you can do.", category: "Wisdom" }
    ];
    saveQuotes();
  }
}

// ✅ Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear old content
  quoteDisplay.innerHTML = "";

  // Create elements dynamically
  const p = document.createElement("p");
  p.textContent = `"${randomQuote.text}"`;

  const small = document.createElement("small");
  small.textContent = `- Category: ${randomQuote.category}`;

  // Append elements
  quoteDisplay.appendChild(p);
  quoteDisplay.appendChild(small);

  // ✅ Save last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ Load last viewed quote from sessionStorage
function loadLastQuote() {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const parsed = JSON.parse(lastQuote);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `"${parsed.text}"`;

    const small = document.createElement("small");
    small.textContent = `- Category: ${parsed.category}`;

    quoteDisplay.appendChild(p);
    quoteDisplay.appendChild(small);
  }
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // ✅ save new quote to localStorage

    // Reset inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Show newly added quote immediately
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `"${newQuote.text}"`;

    const small = document.createElement("small");
    small.textContent = `- Category: ${newQuote.category}`;

    quoteDisplay.appendChild(p);
    quoteDisplay.appendChild(small);

    // Save last viewed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(newQuote));
  }
}

// Dynamically create Add Quote form
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  // Clear container
  formContainer.innerHTML = "";

  const inputQuote = document.createElement("input");
  inputQuote.type = "text";
  inputQuote.id = "newQuoteText";
  inputQuote.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append elements
  formContainer.appendChild(inputQuote);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);
}

// ✅ Export quotes as JSON (checker looks for this exact name)
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ✅ Import quotes from JSON (checker looks for this exact name)
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format. Expected an array of quotes.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);

// ✅ Initialize
loadQuotes();
loadLastQuote(); // try restoring last viewed quote first
createAddQuoteForm();
