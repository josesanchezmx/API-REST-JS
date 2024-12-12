/*console.log('Hello, World')

const URL = "https://api.thecatapi.com/v1/images/search";

fetch(URL)
.then(res => res.json())
.then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;
});*/

// limite de imagenes que queremos de la api
//const API_URL = "https://dog.ceo/api/breeds/image/random/3";
//const API_URL = "https://dog.ceo/api/breed/malinois/images/random/3";
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_ypZSL603gpleNyDpoX40a3IoU0hDgoVvlRk9xm1UO1CMAqGyoDQ1y2BbqUxXpkJQ'

async function reload() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data)
        // Acceder a las URLs del array en data.message
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].url;// en la de perros es .message
        img2.src = data[1].url;
        img3.src = data[2].url;
    } catch (error) {
        console.error('Error fetching cat images:', error);
    }
}

reload();
