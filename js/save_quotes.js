window.onload = () => {

    getQuotes();

}

function getQuotes() {

    let quote = document.getElementById('quote');

    let categories = [
        'inspire',
        'management',
        'sports',
        'life',
        'funny',
        'love',
        'art',
        'students',
    ];

    let baseUrl = 'http://quotes.rest/qod.json';

    let quoteHtml = [];
    let quoteAuthor = [];

    let i = 0;

    categories.forEach((category) => {

        getAjax(

            `ajax/proxy.php?url=${baseUrl}?category=${category}`,

            (reply) => {
                
                reply = JSON.parse(reply);
                reply = reply.contents.quotes[0];

                console.log(reply);

                getAjax(`ajax/save_quote.php?quote=${reply.quote}&author=${reply.author}&category=${reply.category}`);

                quoteHtml.push(reply.quote);
                quoteAuthor.push(reply.author);

            }

        );

    });

    for (i; i < quoteHtml; i++) {

        quote.innerHTML += `
            <h3 class="quote">${quoteHtml[i]}</h3>
            <h5 class="author">${quoteAuthor[i]}</h5>
            <hr>
        `;

    }

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