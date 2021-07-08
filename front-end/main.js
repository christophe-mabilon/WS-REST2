"usestrict";
const divRestaurant = document.querySelector('.restaurants');
const divPlats = document.querySelector('.plats');
let buttonFormAddPlat = document.querySelector('.addplat');
//let buttonAddPlat = document.querySelector('.addplat');

//déclanche la fonction d'affichage du depart
afficheTousLesRestaurants();

//affiche un restaurant grace a son id
function afficheUnRestaurant(sonId) {
    let maRequete = new XMLHttpRequest();
    maRequete.open('GET', `http://localhost/php/framework_exam_2/baseFramework/index.php?controller=restaurant&task=showApi&id=${sonId}`);

    maRequete.onload = () => {
        let data = JSON.parse(maRequete.responseText);
        let restaurant = data.restaurant; //objet
        let plats = data.plats; //tableau d'objets plat


        faireCardRestaurantsEtCardsPlats(restaurant, plats);
    }

    maRequete.send();
}

//fonction pour afficher touts les restaurants

function afficheTousLesRestaurants() {
    let maRequete = new XMLHttpRequest();
    maRequete.open('GET', 'http://localhost/php/framework_exam_2/baseFramework/index.php?controller=restaurant&task=indexApi');

    maRequete.onload = () => {
        let data = JSON.parse(maRequete.responseText);
        faireDesCardsRestaurants(data);
    }

    maRequete.send();
}


//fonction pour faire des cards pour les restaurants
function faireDesCardsRestaurants(tableauRestaurants) {
    let cards = "";
    tableauRestaurants.forEach(element => {
        card = `<div class="col-4 p-3">
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.address}</p>
          
            <button value="${element.id}" class="btn btn-info showRestaurant">voir le restaurant</button>
        
            </div>
        </div>
    </div>`;
        cards += card;
        divRestaurant.innerHTML = cards;
        divPlats.innerHTML = "";
    })
    document.querySelectorAll('.showRestaurant').forEach(bouton => {

        bouton.addEventListener('click', event => {

            afficheUnRestaurant(bouton.value);

        })
    })
};





function faireCardRestaurantsEtCardsPlats(restaurants, plats) {

    cardRestaurants = `<div class="col-4 p-3 align-items-center p-auto">
    <div class="card " style="width: 18rem;">
        <div class="card-body ">
        <h5 class="card-title">${restaurants.name}</h5>
        <p class="card-text">${restaurants.address}</p>
        </div>
        <button class="btn btn-success addplat">Ajouter un plat</button>  
             <button class="btn btn-success retourRestaurants">Retour aux Restaurants</button>
       </div> 
   
</div>`;


    divRestaurant.innerHTML = cardRestaurants;

    cardsPlats = "";

    plats.forEach(plat => {

        cardPlat = `<div class="row" data-plat="${plat.id}">
        <hr>
            <p><strong>${plat.name}</strong></p>
            <p>Description : ${plat.description}</p>
            <p>Prix : ${plat.price}€</p>
    <button class="btn btn-danger supprPlat" value="${plat.id}">Supprimer</button>
           
        <hr>
    </div>`;
        cardsPlats += cardPlat;
        divPlats.innerHTML = cardsPlats;    })

    let cardAdddPlat = `<div class="row">
    <input type="text" name="name" id="name" placeholder="Nom du plat">
<input type="text" name="description" id="description" placeholder="Description du plat">
<input type="text" name="price" id="price" placeholder="prix du plat">
<input type="hidden" name="restaurant_id" id="restaurant_id" value="${restaurants.id}">
<button type="submit">Ajouter un plat a ce restaurant</button>
       
    <hr>
</div>`;
    let platName = document.querySelector('#name');
    let platDescription = document.querySelector('#description');
    let platPrice = document.querySelector('#price');
    let restaurant_idPlat = document.querySelector('#restaurant_id');
    
    cardsPlats += cardAdddPlat;
    
    document.querySelector('.retourRestaurants').addEventListener('click', event => {

        afficheTousLesRestaurants();

    })
}



    //fonction pour supprimer une recette
    function supprimeLePlat(idPlat) {
        let maRequete = new XMLHttpRequest();
        maRequete.open('POST','http://localhost/php/framework_exam_2/baseFramework/index.php?controller=plat&task=supprApi');

        maRequete.onload = () => {
            
            let divPlat = document.querySelector(`div[data-plat="${idPlat}"]`);
            console.log(divPlat);
            divPlat.remove();
            
        }
        maRequete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        params = "id=" + idPlat
        maRequete.send(params);

        

    }
    document.querySelectorAll('.supprPlat').forEach(bouton => {
            bouton.addEventListener('click', (event) => {
                
        supprimeLePlat(bouton.value);
});
    });
    function creationDePlat(name, description, price, restaurant_id) {

    }
    
    
    