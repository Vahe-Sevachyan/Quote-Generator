const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//quotes api
let apiQuotes = [];

//show loader
function loading (){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Loading complete
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //checking if author is blank
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    loading();
    const apiURL = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
    }
}


function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
