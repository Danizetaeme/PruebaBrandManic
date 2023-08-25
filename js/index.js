// document.addEventListener("DOMContentLoaded", function () {
//   fetch("data.json")
//     .then(response => response.json())
//     .then(data => {
//       const influencer = data.influcard;
//       const totalTarjetas = 9;

//       const mosaicoContainer = document.querySelector(".mosaico");

      
//       function formatNumberWithK(number) {
//         if (number >= 1000000) {
//           return (number / 1000000).toFixed(1) + "M";
//         } else if (number >= 1000) {
//           return (number / 1000).toFixed(1) + "K";
//         }
//         return number.toString();
//       }

//       for (let i = 0; i < totalTarjetas; i++) {
//         const tarjeta = document.createElement("div");
//         tarjeta.classList.add("tarjeta");

//         const izquierda = document.createElement("div");
//         izquierda.classList.add("izquierda");

//         const imagenCirculo = document.createElement("div");
//         imagenCirculo.classList.add("imagen-circulo");

//         const imagen = document.createElement("img");
//         imagen.src = "img/fake-influencer.jpg";
//         imagen.alt = "Foto de Perfil";
  
//         const hoverText = document.createElement("div");
//         hoverText.classList.add("imagen-hover-text");
//         hoverText.textContent = "Ver InfluCard";

       
//         imagen.addEventListener("click", function () {
//           window.location.href = "detalle.html";
//         });

       
//         hoverText.addEventListener("click", function () {
//           window.location.href = "detalle.html";
//         });

//         const usuarioIcono = document.createElement("p");
//         usuarioIcono.innerHTML = '<i class="fab fa-instagram"></i> ' + influencer.username;

//         const generoEdad = document.createElement("p");
//         generoEdad.innerHTML = '<i class="fas fa-' + (influencer.gender === "1" ? "male" : "female") + '"></i> ' + influencer.age + ' años';

//         const nacionalidad = document.createElement("p");
//         nacionalidad.innerHTML = '<i class="fas fa-flag"></i> ' + influencer.country;

//         const intereses = document.createElement("p");
//         const displayedInterests = influencer.interests.split(',').slice(0, 3).join(', '); // Muestra los primeros 3 intereses
//         intereses.innerHTML = '<i class="fas fa-cocktail"></i> ' + displayedInterests +" ...";

//         const derecha = document.createElement("div");
//         derecha.classList.add("derecha");

//         const nombreUsuario = document.createElement("h3");
//         nombreUsuario.textContent = influencer.username;

//         const audiencia = document.createElement("p");
//         audiencia.innerHTML = '<i class="fas fa-users"></i> Audiencia: ' + formatNumberWithK(influencer.followers);

//         const mediaEngagement = document.createElement("p");
//         mediaEngagement.innerHTML = '<i class="fas fa-heart"></i> Media Eng: ' + formatNumberWithK(influencer.engagement);

//         const engagementRate = document.createElement("p");
//         const roundedEngRate = parseFloat(influencer.engratio).toFixed(2); // Redondear a 2 decimales
//         engagementRate.innerHTML = '<i class="fas fa-chart-bar"></i> Eng Rate: ' + roundedEngRate + '%';

//         const impresiones = document.createElement("p");
//         impresiones.innerHTML = '<i class="fas fa-eye"></i> Impresiones: ' + formatNumberWithK(influencer.impresions);

//         // Agrego los elementos a la estructura de la tarjeta
//         imagenCirculo.appendChild(imagen);
//         imagenCirculo.appendChild(hoverText);
//         izquierda.appendChild(imagenCirculo);
//         izquierda.appendChild(usuarioIcono);
//         izquierda.appendChild(generoEdad);
//         izquierda.appendChild(nacionalidad);
//         izquierda.appendChild(intereses);

//         derecha.appendChild(nombreUsuario);
//         derecha.appendChild(audiencia);
//         derecha.appendChild(mediaEngagement);
//         derecha.appendChild(engagementRate);
//         derecha.appendChild(impresiones);

//         tarjeta.appendChild(izquierda);
//         tarjeta.appendChild(derecha);

//         mosaicoContainer.appendChild(tarjeta);
//       }
//     });
// });






document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const influencer = data.influcard;
      const totalTarjetas = 9;

      const mosaicoContainer = document.querySelector(".mosaico");

      function formatNumberWithK(number) {
        if (number >= 1000000) {
          return (number / 1000000).toFixed(1) + "M";
        } else if (number >= 1000) {
          return (number / 1000).toFixed(1) + "K";
        }
        return number.toString();
      }

      for (let i = 0; i < totalTarjetas; i++) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const izquierda = document.createElement("div");
        izquierda.classList.add("izquierda");

        const imagenCirculo = document.createElement("div");
        imagenCirculo.classList.add("imagen-circulo");

        const imagen = document.createElement("img");
        imagen.src = "img/fake-influencer.jpg";
        imagen.alt = "Foto de Perfil";

        const hoverText = document.createElement("div");
        hoverText.classList.add("imagen-hover-text");
        hoverText.textContent = "Ver InfluCard";

        imagen.addEventListener("click", function () {
          // Pasa el influencer actual a la página de detalle
          localStorage.setItem("selectedInfluencer", JSON.stringify(influencer));
          window.location.href = "detalle.html";
        });

        hoverText.addEventListener("click", function () {
          // Pasa el influencer actual a la página de detalle
          localStorage.setItem("selectedInfluencer", JSON.stringify(influencer));
          window.location.href = "detalle.html";
        });

        const edad = document.createElement("p");
        edad.innerHTML = '<i class="fas fa-birthday-cake"></i> ' + influencer.age + ' años';

        const genero = document.createElement("p");
        const genderIcon = influencer.gender === "1" ? "mars" : "venus";
        genero.innerHTML = '<i class="fa-solid fa-venus-mars"></i> ' + (influencer.gender === "1" ? "Femenino" : "Masculino");

        const nacionalidad = document.createElement("p");
        nacionalidad.innerHTML = '<i class="fas fa-flag"></i> ' + influencer.country;

        const intereses = document.createElement("p");
        const displayedInterests = influencer.interests.split(',').slice(0, 3).join(', '); // Muestra los primeros 3 intereses
        intereses.innerHTML = '<i class="fas fa-cocktail"></i> ' + displayedInterests + " ...";

        const derecha = document.createElement("div");
        derecha.classList.add("derecha");

        const nombreUsuario = document.createElement("h3");
        nombreUsuario.textContent = influencer.username;

        const audiencia = document.createElement("p");
        audiencia.innerHTML = '<i class="fas fa-users"></i> Audiencia: ' + formatNumberWithK(influencer.followers);

        const mediaEngagement = document.createElement("p");
        mediaEngagement.innerHTML = '<i class="fas fa-heart"></i> Media Eng: ' + formatNumberWithK(influencer.engagement);

        const engagementRate = document.createElement("p");
        const roundedEngRate = parseFloat(influencer.engratio).toFixed(2); // Redondear a 2 decimales
        engagementRate.innerHTML = '<i class="fas fa-chart-bar"></i> Eng Rate: ' + roundedEngRate + '%';

        const impresiones = document.createElement("p");
        impresiones.innerHTML = '<i class="fas fa-eye"></i> Impresiones: ' + formatNumberWithK(influencer.impresions);

        // Agrego los elementos a la estructura de la tarjeta
        imagenCirculo.appendChild(imagen);
        imagenCirculo.appendChild(hoverText);
        izquierda.appendChild(imagenCirculo);
        izquierda.appendChild(edad);
        izquierda.appendChild(genero);
        izquierda.appendChild(nacionalidad);
        izquierda.appendChild(intereses);

        derecha.appendChild(nombreUsuario);
        derecha.appendChild(audiencia);
        derecha.appendChild(mediaEngagement);
        derecha.appendChild(engagementRate);
        derecha.appendChild(impresiones);

        tarjeta.appendChild(izquierda);
        tarjeta.appendChild(derecha);

        mosaicoContainer.appendChild(tarjeta);
      }
    });
});

