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
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1'
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1'

const spanError = document.getElementById('error')

async function loadRandomMichis() {
    try {
        const response = await fetch(API_URL_RANDOM);
        const data = await response.json();

        console.log('random michis:');
        console.log(data)
        // Acceder a las URLs del array en data.message
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');

        img1.src = data[0].url;// en la de perros es .message
        img2.src = data[1].url;
    } catch (error) {
        console.error('Error fetching cat images:', error);
    }
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('favorites michis:');
    console.log(data)
    
    if ( res.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imagenes favoritas'+ res.status + data.message;
    }
}

async function saveFavouriteMichis() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'h19-vtIeX',
        }),
    });
    const data = await res.json();

    console.log('Save favourite michis:');
    console.log(res);
    if ( res.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imagenes favoritas'+ res.status + data.message;
    }
}

loadRandomMichis();
loadFavouritesMichis();
saveFavouriteMichis();