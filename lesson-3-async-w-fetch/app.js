(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function displayImage() {
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 5c0d27eb3b35410585c6397d4321f53266e5b7300903ca1f2ad1e79069ac724a'
            }
        }).then(response => response.json())
            .then(json => {
              let firstImage = json['results'][0];
              let imageHTML = `<figure><img src="${firstImage.urls.regular}" alt="${searchedForText}"></figure>`;
              responseContainer.insertAdjacentHTML('beforeend', imageHTML);
            })
            .catch(e => console.log);
    }

    function displayArticles() {
        const apiKey = '9bfb1da84c8444fe87156f36e38db2ae';
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                let articlesHTML = '';
                const articles = json['response']['docs'];
                articles.map(article => {
                    articlesHTML += `<div class="article">
                                       <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                                       <p>${article.snippet}</p>
                                     </div>`
                });
                console.log(articles);
                responseContainer.insertAdjacentHTML('beforeend', articlesHTML);
            })
            .catch(e => console.log);

    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        displayImage();
        displayArticles();
    });
})();
