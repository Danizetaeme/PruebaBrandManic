document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const influencer = data.influcard;

            // ------------ H E A D E R -------------
            // Elementos del encabezado
            const perfilImagen = document.getElementById("perfil-imagen");
            const perfilUsername = document.getElementById("perfil-username");
            const perfilIg = document.getElementById("perfil-ig");
            const perfilPais = document.getElementById("perfil-pais");
            const perfilGenero = document.getElementById("perfil-genero");
            const perfilEdad = document.getElementById("perfil-edad");

            // Cargar los datos desde el JSON en los elementos del encabezado
            perfilImagen.src = "img/fake-influencer.jpg"; // Actualiza la ruta de la imagen si es necesario
            perfilUsername.textContent = influencer.name;
     
            // Crear enlace y agregar icono de Instagram
            const perfilIgLink = document.createElement("a");
            perfilIgLink.href = `https://www.instagram.com/${influencer.username}`;
            perfilIgLink.target = "_blank"; // Abrir en una nueva pestaña

            const igIcon = document.createElement("i");
            igIcon.classList.add("fab", "fa-instagram");
            perfilIgLink.appendChild(igIcon);

            const igUsername = document.createElement("span");
            igUsername.textContent = ` @${influencer.username}`;
            perfilIgLink.appendChild(igUsername);

            // Vaciar el contenido actual y agregar el enlace con el icono
            perfilIg.innerHTML = "";
            perfilIg.appendChild(perfilIgLink);

            perfilPais.innerHTML = '<i class="fas fa-flag"></i> ' + influencer.country;
            perfilGenero.innerHTML = '<i class="fas fa-venus-mars"></i> ' + (influencer.gender === "1" ? "Femenino" : "Masculino");
            perfilEdad.textContent = influencer.age + " Años";



            //   ------------CHARTS CIRCULARES------------
            // Crear gráficos para "Reach", "Relevance" y "Resonance"
            createCircularChart("reach-chart", parseFloat(influencer.reach), "#0096c7");
            createCircularChart("relevance-chart", parseFloat(influencer.relevance), "#ffce56");
            createCircularChart("resonance-chart", parseFloat(influencer.resonance), "#72ddf7");













            //  -------------C O L U M N A    A U D I E N C I A ------------------

            // GRÁFICA 1 DE AUDIENCIA
            const audienciaContainer = document.createElement("div");
            audienciaContainer.classList.add("audiencia-uno");

            const audienciaDatos = [
                { titulo: "Audiencia", valor: influencer.followers },
                { titulo: "Seguidores Fake", valor: influencer.followers_fake }, // Cambiar el valor según tu data
                { titulo: "Audiencia Real", valor: influencer.real_followers }, // Cambiar el valor según tu data
            ];

            // Generar los elementos de datos de Audiencia
            audienciaDatos.forEach(dato => {
                const datoContainer = document.createElement("div");
                datoContainer.classList.add("dato");

                const icono = document.createElement("i");
                icono.classList.add("fa-solid", "fa-users", "icon-grey");

                const valorElement = document.createElement("p");
                valorElement.classList.add("dato-valor");

                if (dato.titulo === "Audiencia" || "Seguidores Fake" || dato.titulo === "Audiencia Real") {
                    const valorNumerico = parseFloat(dato.valor);
                    const valorFormateado = (valorNumerico / 1000).toFixed(2);
                    valorElement.textContent = `${valorFormateado}K`;
                } else {
                    valorElement.textContent = dato.valor;
                }

                const tituloElement = document.createElement("p");
                tituloElement.classList.add("dato-titulo");
                tituloElement.textContent = dato.titulo;

                datoContainer.appendChild(tituloElement);
                datoContainer.appendChild(icono);
                datoContainer.appendChild(valorElement);
                audienciaContainer.appendChild(datoContainer);
            });

            // Agregar el contenedor de Audiencia al documento
            const columnaAudiencia = document.querySelector(".columna-audiencia");
            columnaAudiencia.appendChild(audienciaContainer);


            // -------------GRÁFICA 2 DE BARRAS DE DISTRIBUCIÓN POR EDAD ------------------
            const edadContainer = document.createElement("div");
            edadContainer.classList.add("grafica-edad");

            const canvas = document.createElement("canvas");
            edadContainer.appendChild(canvas);
            columnaAudiencia.appendChild(edadContainer);

            const edadData = influencer.insightsAge.map(item => ({
                age_range: item.age_range,
                percentage: parseFloat(item.percentage)
            }));

            const edadChart = new Chart(canvas, {
                type: "bar",
                data: {
                    labels: edadData.map(item => item.age_range),
                    datasets: [{
                        label: "Distribución por Edad",
                        data: edadData.map(item => item.percentage),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });




            // CONTENEDOR PARA LAS GRÁFICAS GÉNERO Y PAÍS
            const graficasContainer = document.createElement("div");
            graficasContainer.classList.add("graficas-container");
            columnaAudiencia.appendChild(graficasContainer);

            // -------------GRÁFICA 3 DE DISTRIBUCIÓN DE GÉNERO ------------------
            const generoContainer = document.createElement("div");
            generoContainer.classList.add("grafica-genero");

            const canvasGenero = document.createElement("canvas");
            generoContainer.appendChild(canvasGenero);
            graficasContainer.appendChild(generoContainer);

            // Entrar dentro de insightsGender que es donde se encuentra esta info
            const genderData = influencer.insightsGender;
            const totalFollowers = parseFloat(influencer.followers);
            const femalePercentage = (parseFloat(genderData.find(item => item.gender === "1").percentage)) || 0;
            const malePercentage = (parseFloat(genderData.find(item => item.gender === "0").percentage)) || 0;

            const generoChart = new Chart(canvasGenero, {
                type: "pie",
                data: {
                    labels: ["Hombres", "Mujeres"],
                    datasets: [{
                        data: [malePercentage, femalePercentage],
                        backgroundColor: ["rgba(73, 182, 255, 0.6)", "rgba(254, 93, 159, 0.6)"],
                        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "% Distribución por género", // Agregar título aquí
                        },
                    },
                }
            });

            const generoResultados = document.createElement("div");
            generoResultados.classList.add("genero-resultados");
            generoResultados.innerHTML = `
                    <p>Hombres: ${malePercentage.toFixed(1)}%</p>
                    <p>Mujeres: ${femalePercentage.toFixed(1)}%</p>`;
            generoContainer.appendChild(generoResultados);



            // -------------GRÁFICA 4 DE DISTRIBUCIÓN POR PAÍS ------------------
            const paisContainer = document.createElement("div");
            paisContainer.classList.add("grafica");

            const canvasPais = document.createElement("canvas");
            paisContainer.appendChild(canvasPais);
            graficasContainer.appendChild(paisContainer);

            const distribucionPais = influencer.insightsCountry;
            const porcentajesPais = distribucionPais.map(item => parseFloat(item.percentage) || 0);
            const paises = distribucionPais.map(item => item.country || "País Desconocido");

            // Ordenar los países y porcentajes de mayor a menor
            const sortedData = paises.map((pais, index) => ({ pais, porcentaje: porcentajesPais[index] })).sort((a, b) => b.porcentaje - a.porcentaje);

            // Calcular el porcentaje total de los países
            const totalPorcentaje = sortedData.reduce((total, pais) => total + pais.porcentaje, 0);

            // Filtrar los países principales y agrupar los restantes en "Otros"
            const numPaisesMostrados = 10; // Número de países principales a mostrar
            const paisesPrincipales = sortedData.slice(0, numPaisesMostrados);
            const otrosPorcentaje = 100 - totalPorcentaje;

            if (otrosPorcentaje > 0) {
                paisesPrincipales.push({ pais: "Otros", porcentaje: otrosPorcentaje });
            }

            const ctxPais = canvasPais.getContext("2d");
            new Chart(ctxPais, {
                type: "bar",
                data: {
                    labels: paisesPrincipales.map(pais => pais.pais),
                    datasets: [{
                        label: " % Distribución por País",
                        data: paisesPrincipales.map(pais => pais.porcentaje),
                        backgroundColor: "#e04c28",
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 100, // Asegurarse de que el eje Y llegue hasta 100
                            },
                        }],
                    },
                },
            });










            //  -------------C O L U M N A    P U B L I C A C I O N E S ------------------

            // GRÁFICA 1 DISTRIBUCIÓN POR TERRITORIO

            // Definir la variable para la columna "Publicaciones"
            const columnaPublicaciones = document.querySelector(".columna-publicaciones");

            // Crear el contenedor para la gráfica de territorios
            const territoriosContainer = document.createElement("div");
            territoriosContainer.classList.add("grafica-territorios");
            columnaPublicaciones.appendChild(territoriosContainer);

            // Datos de distribución de territorios desde el JSON
            const territoriosData = influencer.territoriesmanual;

            // Extraer valores de porcentaje y nombres de territorio con el metodo .map
            const porcentajesTerritorios = territoriosData.map(item => parseFloat(item.perc));
            const nombresTerritorios = territoriosData.map(item => item.territory_name.name);

            // Crear gráfica de distribución por territorios
            const canvasTerritorios = document.createElement("canvas");
            territoriosContainer.appendChild(canvasTerritorios);



            const ctxTerritorios = canvasTerritorios.getContext("2d");
            new Chart(ctxTerritorios, {
                type: "bar",
                data: {
                    labels: nombresTerritorios,
                    datasets: [{
                        label: "% Distribución de sus publicaciones por territorio",
                        data: porcentajesTerritorios,
                        backgroundColor: [
                            "#ffe169",
                            "#ff9b85",
                            "#ff85a1",
                            "#ff90b3",
                            "#f4a261",
                            "#b79ced",
                        ],
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                    plugins: {
                        datalabels: {
                            anchor: "end",
                            align: "top",
                            formatter: (value) => value.toFixed(1) + "%",
                            color: "#333",
                            font: {
                                weight: "bold",
                            },
                        },
                    },
                },
            });


            // GRÁFICA 2 FRANJA HORARIA DE SUS PUBLICACIONES (DATOS DUMMY)
            // Crear el contenedor para la gráfica de franja horaria
            const franjaHorariaContainer = document.createElement("div");
            franjaHorariaContainer.classList.add("grafica-franja-horaria");
            columnaPublicaciones.appendChild(franjaHorariaContainer);

            // Datos DUMMY de franja horaria
            const franjaHorariaData = [
                { label: "Mañana", icon: "☀️", value: 30 },
                { label: "Tarde", icon: "⛅", value: 60 },
                { label: "Noche", icon: "🌙", value: 15 },
            ];

            // Extraer valores y etiquetas con el metodo .map
            const valoresFranjaHoraria = franjaHorariaData.map(item => item.value);
            const etiquetasFranjaHoraria = franjaHorariaData.map(item => item.label + " " + item.icon);

            // Crear gráfica de franja horaria de sus publicaciones
            const canvasFranjaHoraria = document.createElement("canvas");
            franjaHorariaContainer.appendChild(canvasFranjaHoraria);

            const ctxFranjaHoraria = canvasFranjaHoraria.getContext("2d");
            new Chart(ctxFranjaHoraria, {
                type: "bar",
                data: {
                    labels: etiquetasFranjaHoraria,
                    datasets: [{
                        label: "% Franja Horaria de sus publicaciones",
                        data: valoresFranjaHoraria,
                        backgroundColor: [
                            "#ffe169",
                            "#ff9b85",
                            "#4F518C",
                        ],
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                    plugins: {
                        datalabels: {
                            anchor: "end",
                            align: "top",
                            formatter: (value) => value.toFixed(1) + "%",
                            color: "#333",
                            font: {
                                weight: "bold",
                            },
                        },
                    },
                },
            });


            // LISTADO 3 DE MARCAS CON LAS QUE HA TRABAJADO
            // Crear el contenedor para el listado de marcas
            const marcasContainer = document.createElement("div");
            marcasContainer.classList.add("marcas-container");
            columnaPublicaciones.appendChild(marcasContainer);

            // Extraer los datos de las marcas y sus imágenes del archivo JSON
            const marcasData = influencer.brands;
            const marcasImages = influencer.brands_images;

            // Crear título para el listado de marcas
            const tituloMarcas = document.createElement("h2");
            tituloMarcas.textContent = "Marcas con las que ha trabajado";
            tituloMarcas.classList.add("titulo-marcas");
            marcasContainer.appendChild(tituloMarcas);

            // Crear lista de marcas
            const marcasList = document.createElement("ul");
            marcasList.classList.add("marcas-list");

            let counter = 0;

            for (const marcaId in marcasData) {
                if (counter >= 8) {
                    break; // Mostrar solo 8 marcas
                }

                const marcaName = marcasData[marcaId].name;
                const marcaItem = document.createElement("li");

                // Buscar la imagen correspondiente a la marca en el array de imágenes
                const marcaImage = marcasImages.find(item => item.name === marcaName);
                if (marcaImage) {
                    const img = document.createElement("img");
                    img.src = marcaImage.image;
                    img.alt = marcaName;
                    marcaItem.appendChild(img);
                }

                const nombreMarca = document.createElement("p");
                nombreMarca.textContent = marcaName;
                marcaItem.appendChild(nombreMarca);

                marcasList.appendChild(marcaItem);

                counter++;
            }

            marcasContainer.appendChild(marcasList);









            // ------------- C O L U M N A   D E S E M P E Ñ O -------------

            // -----------INFO #1 AUDIENCIA Y ALCANCE------------

            // Función para crear elementos de desempeño (icono, título y valor)
            function createdesempeñoElement(iconClass, title, value) {
                const element = document.createElement("div");
                element.classList.add("desempeño-element");
                element.innerHTML = `
                        <i class="${iconClass} icon-grey"></i>
                        <p>${title}</p>
                        <p class="desempeño-value">${value}</p>
                        `;
                return element;
            }

            // Crear el contenedor para la información de desempeño
            const desempeñoContainer = document.createElement("div");
            desempeñoContainer.classList.add("desempeño-container");
            document.querySelector(".columna-desempeño").appendChild(desempeñoContainer);


            // Obtener valores de audiencia y alcance del archivo data.json
            const audiencia = (parseFloat(data.influcard.followers) / 1000).toFixed(2) + "K";
            const alcance = (parseFloat(data.influcard.uusers) / 1000).toFixed(2) + "K";



            // Crear contenedor de columna para audiencia
            const audienciaColumn = document.createElement("div");
            audienciaColumn.classList.add("desempeño-column");
            audienciaColumn.appendChild(createdesempeñoElement("fas fa-users", "Audiencia", audiencia));
            desempeñoContainer.appendChild(audienciaColumn);

            // Crear contenedor de columna para alcance
            const alcanceColumn = document.createElement("div");
            alcanceColumn.classList.add("desempeño-column");
            alcanceColumn.appendChild(createdesempeñoElement("fas fa-chart-bar", "Alcance", alcance));
            desempeñoContainer.appendChild(alcanceColumn);




            /* --------------INFO #2 IMPRESIONES---------------- */

            // Crear contenedor para el segundo bloque de desempeño
            const desempeñoContainer2 = document.createElement("div");
            desempeñoContainer2.classList.add("desempeño-container-dos");
            document.querySelector(".columna-desempeño").appendChild(desempeñoContainer2);

            // Obtener valores de impresiones, alcance y audiencia del archivo data.json
            const impresiones = (parseFloat(data.influcard.impresions) / 1000).toFixed(2) + "K";
            const alcancePercentage = parseFloat(data.influcard.ir_alcance).toFixed(1) + "%";
            const audienciaPercentage = parseFloat(data.influcard.ir_audiencia).toFixed(1) + "%";

            // Crear contenedor de fila para impresiones, alcance y audiencia
            const info2Row = document.createElement("div");
            info2Row.classList.add("desempeño-row");

            // Crear contenedor de columna para impresiones
            const impresionesColumn = document.createElement("div");
            impresionesColumn.classList.add("desempeño-column");
            info2Row.appendChild(impresionesColumn);

            // Crear elemento de desempeño para impresiones
            const impresionesElement = createdesempeñoElement("fas fa-eye", "Impresiones", impresiones);

            // Agregar clase personalizada para cambiar el color del icono
            const impresionesIconElement = impresionesElement.querySelector("i");
            impresionesIconElement.classList.add("custom-icon-color");

            impresionesColumn.appendChild(impresionesElement);



            // Crear contenedor de columna para alcance
            const alcanceColumn2 = document.createElement("div");
            alcanceColumn2.classList.add("desempeño-column");
            alcanceColumn2.appendChild(createdesempeñoElement("fas fa-chart-bar", "Alcance", alcancePercentage));
            alcanceColumn2.classList.add("small-text");
            info2Row.appendChild(alcanceColumn2);

            // Crear contenedor de columna para audiencia
            const audienciaColumn2 = document.createElement("div");
            audienciaColumn2.classList.add("desempeño-column");
            audienciaColumn2.appendChild(createdesempeñoElement("fas fa-users", "Audiencia", audienciaPercentage));
            audienciaColumn2.classList.add("small-text");
            info2Row.appendChild(audienciaColumn2);

            desempeñoContainer2.appendChild(info2Row);




            /* --------------INFO #3 REPRODUCCIONES---------------- */

            // Crear contenedor para la tercera sección de desempeño
            const desempeñoContainer3 = document.createElement("div");
            desempeñoContainer3.classList.add("desempeño-container-tres");
            document.querySelector(".columna-desempeño").appendChild(desempeñoContainer3);

            // Obtener valores de Reproducciones, Alcance y Audiencia del archivo data.json
            const reproducciones = data.influcard.vplays_formated;
            const alcanceValue = parseFloat(data.influcard.vr_alcance).toFixed(1) + "%";
            const audienciaValue = parseFloat(data.influcard.vr_audiencia).toFixed(1) + "%";

            // Crear contenedor de fila para Reproducciones, Alcance y Audiencia
            const info3Row = document.createElement("div");
            info3Row.classList.add("desempeño-row");

            // Crear contenedor de columna para Reproducciones
            const reproduccionesColumn = document.createElement("div");
            reproduccionesColumn.classList.add("desempeño-column");
            info3Row.appendChild(reproduccionesColumn);

            // Crear elemento de desempeño para Reproducciones
            const reproduccionesElement = createdesempeñoElement("fas fa-play", "Reproducciones", reproducciones);

            // Agregar clase personalizada para cambiar el color del icono
            const iconElement = reproduccionesElement.querySelector("i");
            iconElement.classList.add("custom-icon-color-dos");

            reproduccionesColumn.appendChild(reproduccionesElement);

            // Crear contenedor de columna para Alcance
            const alcanceColumn3 = document.createElement("div");
            alcanceColumn3.classList.add("desempeño-column");
            alcanceColumn3.appendChild(createdesempeñoElement("fas fa-chart-bar", "Alcance", alcanceValue));
            alcanceColumn3.classList.add("small-text");
            info3Row.appendChild(alcanceColumn3);

            // Crear contenedor de columna para Audiencia
            const audienciaColumn3 = document.createElement("div");
            audienciaColumn3.classList.add("desempeño-column");
            audienciaColumn3.appendChild(createdesempeñoElement("fas fa-users", "Audiencia", audienciaValue));
            audienciaColumn3.classList.add("small-text");
            info3Row.appendChild(audienciaColumn3);

            desempeñoContainer3.appendChild(info3Row);



            /* --------------INFO #4 ENGAGEMENT---------------- */

            // Crear contenedor para la cuarta sección de desempeño
            const desempeñoContainer4 = document.createElement("div");
            desempeñoContainer4.classList.add("desempeño-container-cuatro");
            document.querySelector(".columna-desempeño").appendChild(desempeñoContainer4);

            // Obtener valores de Engagement, Alcance y Audiencia del archivo data.json
            const engagement = data.influcard.engagement_formated;
            const alcanceER = parseFloat(data.influcard.er_alcance).toFixed(2) + "%";
            const audienciaER = parseFloat(data.influcard.er_audiencia).toFixed(2) + "%";

            // Crear contenedor de fila para Engagement, Alcance y Audiencia
            const info4Row = document.createElement("div");
            info4Row.classList.add("desempeño-row");

            // Crear contenedor de columna para Engagement
            const engagementColumn = document.createElement("div");
            engagementColumn.classList.add("desempeño-column");
            info4Row.appendChild(engagementColumn);

            // Crear elemento de desempeño para Engagement
            const engagementElement = createdesempeñoElement("fas fa-heart", "Engagement", engagement);

            // Agregar clase personalizada para cambiar el color del icono
            const engagementIconElement = engagementElement.querySelector("i");
            engagementIconElement.classList.add("custom-icon-color-tres");

            engagementColumn.appendChild(engagementElement);

            // Crear contenedor de columna para Alcance
            const alcanceColumn4 = document.createElement("div");
            alcanceColumn4.classList.add("desempeño-column");
            alcanceColumn4.appendChild(createdesempeñoElement("fas fa-chart-bar", "Alcance", alcanceER));
            alcanceColumn4.classList.add("small-text");
            info4Row.appendChild(alcanceColumn4);

            // Crear contenedor de columna para Audiencia
            const audienciaColumn4 = document.createElement("div");
            audienciaColumn4.classList.add("desempeño-column");
            audienciaColumn4.appendChild(createdesempeñoElement("fas fa-users", "Audiencia", audienciaER));
            audienciaColumn4.classList.add("small-text");
            info4Row.appendChild(audienciaColumn4);

            desempeñoContainer4.appendChild(info4Row);



            /* --------------INFO #5 PUBLICACIONES/DIA---------------- */

            // Obtener datos de engagement por día del archivo data.json
            const engagementData = influencer.account_post_day;

            // Mapear los números de día a iniciales en español
            const daysMap = {
                1: "L", 2: "M", 3: "X", 4: "J", 5: "V", 6: "S", 7: "D"
            };

            // Obtener las iniciales de los días y las tasas de engagement del arreglo de datos
            const days = engagementData.map(item => daysMap[item.day_id]);
            const engRates = engagementData.map(item => parseFloat(item.engrate));

            // Definir colores para cada día
            const colors = [
                "rgba(67, 97, 238, 0.6)",
                "rgba(63, 55, 201, 0.6)",
                "rgba(72, 12, 168, 0.6)",
                "rgba(106, 0, 244, 0.6)",
                "rgba(114, 9, 183, 0.6)",
                "rgba(181, 23, 158, 0.6)",
                "rgba(247, 37, 133, 0.6)"
            ];

            // Crear contenedor para la gráfica
            const graphContainer = document.createElement("div");
            graphContainer.classList.add("engagement-graph");
            document.querySelector(".columna-desempeño").appendChild(graphContainer);

            // Crear el contexto del lienzo de la gráfica
            const graphCanvas = document.createElement("canvas");
            graphContainer.appendChild(graphCanvas);
            const ctx = graphCanvas.getContext("2d");

            // Crear la gráfica de barras
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: days,
                    datasets: [
                        {
                            label: "% Engagement Rate por día de publicación",
                            data: engRates,
                            backgroundColor: colors,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 1.5,
                            max: 2.5,
                            ticks: {
                                stepSize: 0.1,
                            },
                        },
                    },
                },
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});