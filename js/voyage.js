(function () {
    console.log("rest API");
    // URL de l'API REST de WordPress
    let boutons_categorie = document.querySelectorAll(".cat_bouton");
    let restapi = document.querySelector(".contenu__restapi");

    boutons_categorie.forEach(elm => {
        elm.addEventListener("click", function (e) {
            let categorie = e.target.id.split('_')[1]; // Extract the category ID from the button ID
            console.log("Selected category:", categorie);

            let url = `https://gftnth00.mywhc.ca/tim35/wp-json/wp/v2/posts?categories=${categorie}`;

            // Effectuer la requête HTTP en utilisant fetch()
            fetch(url)
                .then(function (response) {
                    // Vérifier si la réponse est OK (statut HTTP 200)
                    if (!response.ok) {
                        throw new Error(
                            "La requête a échoué avec le statut " + response.status
                        );
                    }

                    // Analyser la réponse JSON
                    return response.json();
                })
                .then(function (data) {
                    // La variable "data" contient la réponse JSON
                    console.log(data);
                    restapi.innerHTML = ""; // Clear previous content

                    // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                    // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                    data.forEach(function (article) {
                        let titre = article.title.rendered;
                        let contenu = article.content.rendered;
						let lien = article.link;
                        let categories = article.categories;

                        contenu = contenu.split('\.', 1)[0];
                        console.log(titre);

                        let carte = document.createElement("div");
                        carte.classList.add("restapi__carte");
                    
                        carte.innerHTML = `
                            <h2>${titre}</h2>
                            <p>${contenu}</p>
							<p><a href= "${lien}">Voir la suite</a></p>
                        `;
                        restapi.appendChild(carte);
                    });
                })
                .catch(function (error) {
                    // Gérer les erreurs
                    console.error("Erreur lors de la récupération des données :", error);
                });
        });
    });
})();
