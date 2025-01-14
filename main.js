// creamos la instacia de axios para hacer las peticiones a la API
const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'X-API-KEY': 'live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1',
    },
});


const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error');

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
    btn3.onclick = () => saveFavouriteMichi(data[2].id);
    btn4.onclick = () => saveFavouriteMichi(data[3].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1',
    },
  });

  const data = await res.json();
  console.log('Favoritos');
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favoriteMichis');
    section.innerHTML = ''; // Limpiar los favoritos previos antes de renderizar nuevos
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

// en esta funcion realizamos el ejemplo con axios para guardar un michi en favoritos
async function saveFavouriteMichi(id) {
  /*const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1'
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json(); */
  const res = await api.post('/favourites',{
    image_id: id
    
  });

  console.log('Save');
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi guardado en favoritos");
    loadFavouriteMichis(); // Recargar favoritos después de guardar uno nuevo
  }
}

// Eliminar favoritos
async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVORITE_DELETE(id), {
    method: 'DELETE',
    headers: {
        'X-API-KEY': 'live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1'
    }
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi eliminado de favoritos");
    loadFavouriteMichis(); // Recargar favoritos después de eliminar uno
  }
}

// funcion subir photo michi

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);
  const fileInput = document.getElementById('file');
  const spanError = document.getElementById('error'); // Asegúrate de tener un contenedor con este ID en el HTML

  // Verificar si se ha seleccionado una imagen
  if (fileInput.value === '') {
      alert('No has seleccionado una imagen');
      return; // Detener la ejecución si no se seleccionó una imagen
  }

  console.log(formData.get('file'));

  try {
      const res = await fetch(API_URL_UPLOAD, {
          method: 'POST',
          headers: {
              'X-API-KEY': 'live_gDwF2SmsCBk8izRETtwMpYd3mRPuOE6jT0RgAqU3uLMeDaRuBBQ77Yf9pUG4UKE1',
          },
          body: formData,
      });

      const data = await res.json();

      if (res.status !== 201) {
          spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`;
      } else {
          console.log("Foto de Michi Subida con Exito :)");
          console.log({ data });
          form.reset();
          fileInput.value = ''; // Limpiar el input de tipo file
          previewImage.src = ''; // Limpiar la vista previa
          previewImage.style.display = 'none'; // Ocultar la vista previa
          alert("¡Foto de tu michi subida exitosamente!");

      }

      console.log(data.url);
      saveFavouriteMichi(data.id);

  } catch (error) {
      console.error("Error en la solicitud:", error);
      spanError.innerHTML = "Hubo un problema al subir la foto. Intenta de nuevo más tarde.";
  }
}


// mostrar vista previa de la imagen seleccionada falta 

const fileInput = document.getElementById('file');
const previewImage = document.getElementById('preview');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }else{
    previewImage.style.display = 'none';
  }
});

 // Limpiar la vista previa y el input
 clearPreview.addEventListener('click', () => {
  fileInput.value = ''; // Limpia el input de tipo file
  previewImage.src = ''; // Limpia la vista previa
  previewImage.style.display = 'none'; // Oculta la vista previa
});

loadRandomMichis();
loadFavouriteMichis();
