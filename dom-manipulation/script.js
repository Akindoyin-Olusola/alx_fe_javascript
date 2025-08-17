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
  displayQuote(randomQuote);
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ Display a single quote
function displayQuote(quote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const p = document.createElement("p");
  p.textContent = `"${quote.text}"`;

  const small = document.createElement("small");
  small.textContent = `- Category: ${quote.category}`;

  quoteDisplay.appendChild(p);
  quoteDisplay.appendChild(small);
}

// ✅ Load last viewed quote
function loadLastQuote() {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) displayQuote(JSON.parse(lastQuote));
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    displayQuote(newQuote);
    sessionStorage.setItem("lastQuote", JSON.stringify(newQuote));
    populateCategories();
    postQuoteToServer(newQuote); // ✅ also sync to server
  }
}

// ✅ Create Add Quote Form
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");
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

  formContainer.appendChild(inputQuote);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);
}

// ✅ Export
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

// ✅ Import
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        showNotification("Quotes imported successfully!");
      } else {
        showNotification("Invalid file format.");
      }
    } catch (err) {
      showNotification("Error reading file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
    filterQuotes();
  }
}

// ✅ Filter by category
function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", category);
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  filtered.forEach(q => displayQuote(q));
}

// ✅ Notification helper
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  setTimeout(() => { notification.textContent = ""; }, 3000);
}

/* ---------------- Server Sync Simulation ---------------- */

// ✅ Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await res.json();
    // Convert mock API posts to quote format
    return data.map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (err) {
    showNotification("Failed to fetch from server");
    return [];
  }
}

// ✅ Post new quote to server
async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
    showNotification("Quote synced to server");
  } catch (err) {
    showNotification("Failed to sync quote");
  }
}

// ✅ Sync quotes (conflict resolution: server wins)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (serverQuotes.length > 0) {
    quotes = [...serverQuotes, ...quotes]; // server takes precedence
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification("Quotes synced with server (conflicts resolved)");
  }
}

// Periodic sync (every 10s)
setInterval(syncQuotes, 10000);

/* ---------------- Init ---------------- */
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);

loadQuotes();
loadLastQuote();
createAddQuoteForm();
populateCategories();
