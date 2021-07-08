const divGateaux = document.querySelector('.gateaux');
const divRecettes = document.querySelector('.recettes');
const boutonStart = document.querySelector('.start');

//affiche l' index des gateau 
boutonStart.addEventListener('click', event => {
    afficheTousLesGateaux();
})

//affiche un gateau grace a son id
function afficheUnGateau(sonId) {
    let maRequete = new XMLHttpRequest();
    maRequete.open('GET', `http://localhost/php/garages_pierre/index.php?controller=gateau&task=showApi&gateau_id=${sonId}`);

    maRequete.onload = () => {
        let data = JSON.parse(maRequete.responseText);
        let gateau = data.gateau; //objet
        let recettes = data.recettes; //tableau d'objets recette
        faireCardGateauEtCardsRecettes(gateau, recettes);
    }

    maRequete.send();
}
//fonction pour afficher touts les gateaux
function afficheTousLesGateaux() {
    let maRequete = new XMLHttpRequest();
    maRequete.open('GET', 'http://localhost/php/garages_pierre/index.php?controller=gateau&task=indexApi');

    maRequete.onload = () => {
        let data = JSON.parse(maRequete.responseText);
        faireDesCardsGateaux(data);
    }

    maRequete.send();
}
//fonction pour faire des cards pour les gateaux
function faireDesCardsGateaux(tableauGateau) {
    let cards = "";
    tableauGateau.forEach(element => {
        card = `<div class="col-4 p-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.flavor}</p>
          
            <button value="${element.id}" class="btn btn-primary showGateau">voir le gateau</button>
        
            </div>
        </div>
    </div>`;

        cards += card;
        divGateaux.innerHTML = cards;
        divRecettes.innerHTML = "";
    });

    document.querySelectorAll('.showGateau').forEach(bouton => {

        bouton.addEventListener('click', event => {
            afficheUnGateau(bouton.value);
        })
    })
}

function faireCardGateauEtCardsRecettes(gateau, recettes) {

    cardGateau = `<div class="col-4 p-3">

    <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${gateau.name}</h5>
        <p class="card-text">${gateau.flavor}</p>
        </div>
             <button class="btn btn-success retourGateaux">Retour aux Gateaux</button>
       </div> 
   
</div>`

    divGateaux.innerHTML = cardGateau

    cardsRecettes = ""

    recettes.forEach(recette => {

        cardRecette = `<div class="row" data-recette="${recette.id}">
        <hr>
            <p><strong>${recette.name}</strong></p>
            <p>${recette.description}</p>
    <button class="btn btn-danger supprRecette" value="${recette.id}">Supprimer</button>
           
        <hr>
    </div>`;

        cardsRecettes += cardRecette


    })

    divRecettes.innerHTML = cardsRecettes



    document.querySelector('.retourGateaux').addEventListener('click', event => {

        afficheTousLesGateaux();

    })

    document.querySelectorAll('.supprRecette').forEach(bouton => {

        bouton.addEventListener('click', event => {
            supprimeLaRecette(bouton.value);

        })
    })


    //fonction pour supprimer une recette
    function supprimeLaRecette(idRecette) {


        let maRequete = new XMLHttpRequest();

        maRequete.open('POST', 'http://localhost/php/garages_pierre/index.php?controller=recette&task=supprApi')



        maRequete.onload = () => {

            //let data = JSON.parse(maRequete.responseText)

            //console.log(data);

            let divRecette = document.querySelector(`div[data-recette="${idRecette}"]`);
            console.log(divRecette);


            divRecette.remove();
        }

        maRequete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        params = "id=" + idRecette
        maRequete.send(params);

    }
}