window.onload = () => {

    let getQuoteBtn = document.getElementById('get-quote-btn');
    
    getQuoteBtn.addEventListener('click', (event) => {

        event.preventDefault();

        getRandomQuote();

    });

}

function getRandomQuote() {

    let quote = document.getElementById('quote');

    getAjax(
        'ajax/get_random_quote.php',
        (reply) => {

            let data = JSON.parse(reply);

            let html = `
                <p class="author text-left"><b>Author</b>: ${data.author}</p>
                <p class="category text-left"><b>Category</b>: ${data.category}</p>
                <p class="quote text-left"><b>Quote</b>: ${data.quote}</p>
            `;

            quote.innerHTML = html;

        }
    )

}

function getAjax(url, success = null) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200 && typeof success == 'function') success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}