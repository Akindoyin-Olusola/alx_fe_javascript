// Quotes array with objects containing text and category
const quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Push yourself, because no one else is going to do it for you.", category: "Inspiration" },
    { text: "Success doesn’t just find you. You have to go out and get it.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    document.getElementById("quote").textContent = quote.text;
    document.getElementById("category").textContent = `- ${quote.category}`;
}

// Function AddQuoteForm
function AddQuoteForm() {
    const textInput = document.getElementById("quote-text").value.trim();
    const categoryInput = document.getElementById("quote-category").value.trim();

    if (textInput && categoryInput) {
        quotes.push({ text: textInput, category: categoryInput });
        document.getElementById("quote-text").value = "";
        document.getElementById("quote-category").value = "";
        showRandomQuote();
    }
}

// Event listeners
document.getElementById("new-quote").addEventListener("click", displayRandomQuote);
document.getElementById("add-quote").addEventListener("click", addQuote);

// Display an initial quote when page loads
window.onload = displayRandomQuote;
