/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    let addImage = data => {
        debugger;
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 5c0d27eb3b35410585c6397d4321f53266e5b7300903ca1f2ad1e79069ac724a'
            }
        }).then(function(response) {
            return response.json();
        }).then(addImage);
    });
})();
