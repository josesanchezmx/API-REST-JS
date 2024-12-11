const API_URL = "https://api.thecatapi.com/v1/images/search";

/*console.log('Hello, World')

const URL = "https://api.thecatapi.com/v1/images/search";

fetch(URL)
.then(res => res.json())
.then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;
});*/

async function reload() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
}

reload();
