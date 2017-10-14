(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function addArticles() {
        const jsonResp = JSON.parse(this.response);
        let articles = '';
        console.log(jsonResp['response']['docs']);
        for (const article of jsonResp['response']['docs']) {
            articles += `<article>
                           <h1><a href="${article.web_url}">${article.headline.main}</a></h1>
                           <p>${article['snippet']}</p>
                         </article>`
        }
        responseContainer.innerHTML = articles;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const articleRequest = new XMLHttpRequest();

        const apiKey = '9bfb1da84c8444fe87156f36e38db2ae';
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${apiKey}`);
        articleRequest.onload = addArticles;
        articleRequest.send();
    });
})();
