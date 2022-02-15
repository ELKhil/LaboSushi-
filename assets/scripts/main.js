//Doc LocalStorage, si vous voulez aller + loin
//https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage

///////////////////CONSTANTES UTILES AU PROJET///////////////////
const PRODUCTS = [
    {
      id: 1,
      name: "maki Saumon",
      price: 5.5,
      category: "maki",
      image: "maki_saumon.webp",
      quantity: 6,
    },
    {
      id: 2,
      name: "maki Thon",
      price: 5.9,
      category: "maki",
      image: "maki_thon.webp",
      quantity: 6,
    },
    {
      id: 3,
      name: "sushi Saumon",
      price: 4,
      category: "sushi",
      image: "sushi_saumon.webp",
      quantity: 2,
    },
    {
      id: 4,
      name: "sushi Thon",
      price: 5,
      category: "sushi",
      image: "sushi_thon.webp",
      quantity: 2,
    },
    {
      id: 5,
      name: "sushi Daurade",
      price: 5.8,
      category: "sushi",
      image: "sushi_daurade.webp",
      quantity: 2,
    },
    {
      id: 6,
      name: "chirashi Saumon Thon",
      price: 16,
      category: "chirashi",
      image: "chirashi_thon_saumon.webp",
      quantity: 1,
    },
    {
      id: 7,
      name: "gyoza Poulet",
      price: 4.5,
      category: "gyoza",
      image: "gyoza_poulet.webp",
      quantity: 3,
    },
    {
      id: 8,
      name: "sashimi Saumon",
      price: 6.2,
      category: "sashimi",
      image: "sashimi_saumon.webp",
      quantity: 5,
    },
    {
      id: 9,
      name: "sashimi Thon",
      price: 6.5,
      category: "sashimi",
      image: "sashimi_thon.webp",
      quantity: 5,
    },
  ];

const CATEGORIES = ["sushi", "maki", "chirashi", "gyoza", "sashimi"];


////////////////////CONSTRUCTION HTML EN JS/////////////////////
const nombreProduit =document.querySelector(".parNom")
const buttonRouge = document.querySelector(".parNom")

// if(!nombreProduit.textContent){
//   buttonRouge.style.display="none";
// }else{
//   buttonRouge.style.display="block";
// }


//Construction du select avec les catégories
const DIVCONTAINER = document.getElementById("sushicontainer");
//Titre


for (let i = 0; i < PRODUCTS.length; i++) {
  //On crée tous les éléments donc on aura besoin
  const divCardCol = document.createElement("div");
  divCardCol.setAttribute("class", "card-col");
  divCardCol.setAttribute("id", PRODUCTS[i].id)
  divCardCol.setAttribute("onClick", "button(id)")

  const divCard = document.createElement("div");
  divCard.setAttribute("class", "card");


  const divImage = document.createElement("div");
  divImage.setAttribute("class", "card-top");
  const bImg = document.createElement("img");

  const divContent = document.createElement("div");
  divContent.setAttribute("class", "card-content")

  const divNom = document.createElement("div");
  const divCategory = document.createElement("div");

  const divPrix = document.createElement("div");
  divPrix.setAttribute("class", "card-bottom")
  const pPrix = document.createElement("p")
  pPrix.setAttribute("class", "price")


  //Modification des textContent et src image
  bImg.setAttribute("src", "assets/images/" + PRODUCTS[i].image);
  divNom.textContent = PRODUCTS[i].name;

  divCategory.textContent = PRODUCTS[i].category;
  pPrix.textContent = PRODUCTS[i].price + " € " + " | " + PRODUCTS[i].quantity + (PRODUCTS[i].quantity > 1 ? " pièces " : " pièce ");

  //On ajoute les éléments créer à leur parent !!Penser en arbre
  divPrix.appendChild(pPrix);
  divContent.append(divNom, divCategory);
  divImage.appendChild(bImg);
  divCard.append(divImage, divContent, divPrix);
  divCardCol.appendChild(divCard)
  DIVCONTAINER.appendChild(divCardCol);


}
  
//Affichage des produits
//+ Mise en place du filtre selon catégorie sélectionnée (tips event onchange sur le select)

let elt = document.querySelector('select');
elt.addEventListener('change', function () {

  if (this.value == "all") {
    for (let i = 0; i < PRODUCTS.length; i++) {
      const divSup = document.getElementById(PRODUCTS[i].id)
      divSup.style.display = "block";

    }
  } else {
    for (let i = 0; i < PRODUCTS.length; i++) {
      //on compare la categorie avec la valeur selectionné par l'utilisateur
      //si ce n'est pas la meme valeur, on cache tous les div 

      if (PRODUCTS[i].category != this.value) {
        //On récupère la div de ce produit 
        const divSup = document.getElementById(PRODUCTS[i].id)
        // on cache la div 
        divSup.style.display = 'none';

        //si c'est la meme valeur
      } else {
        //On récupère la div de ce produit 
        const divSup = document.getElementById(PRODUCTS[i].id)
        //On l'affiche si il'était dèja caché
        divSup.style.display = "block";
      }
    }
  }

})

///////////////////////////Ajout au panier//////////////////////////
var produitEnregistreDansLocaleStorage = JSON.parse(localStorage.getItem("produit"));

//récuperation des infos produit sous forme d'une liste d'objet 
function button(id) {
  const recupID = parseInt(document.getElementById(id).id)

  const idProduit = PRODUCTS[recupID - 1].id
  const nomProduit = PRODUCTS[recupID - 1].name;
  const prixProduit = PRODUCTS[recupID - 1].price;
  const imageProduit = PRODUCTS[recupID - 1].image;

  let infoProduit = {
    idDeProduit: idProduit,
    nomDeProduit: nomProduit,
    prixDeProduit: prixProduit,
    imageDeProduit: imageProduit,
  }
  
  //fonction fenetre pop up  
  const popConfirmation = () => {
    if (window.confirm(`${nomProduit} // prix : ${prixProduit} € a bien été ajouter au panier. Consulter le panier OK ou revenir à l'accueil ANNULER`)) {
      window.location.href = "panier.html";
    } else {
      //window.location.href = "index.html";
    }
  }

  //-------------------------Locale Storage----------------------//

  //la variable dans laquelle on met les key et les valeurs qui sont dans le locale Storage
  

  //Fonction ajouter un produit sélectionné dans le localStorage
  const ajouterProduitLocalStorage = () => {
    //ajout dans le tableau de l'objet avec les values
    produitEnregistreDansLocaleStorage.push(infoProduit);
    //la transformation en format json et l'envoyer dans la key "produit" du localStorage
    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocaleStorage));
    
  }


  // s'il y a dèja des produits d'enregisté dans le local storage
  if (produitEnregistreDansLocaleStorage) {
    ajouterProduitLocalStorage();
    popConfirmation();
    // s'il n'y pas dèja des produits d'enregisté dans le local storage
  } else {
    produitEnregistreDansLocaleStorage = [];
    ajouterProduitLocalStorage();
    popConfirmation();
    
  }

  const nombreProduit =document.querySelector(".parNom")
  nombreProduit.textContent=parseInt(produitEnregistreDansLocaleStorage.length)
  
  if (nombreProduit.textContent) {
    buttonRouge.style.display = "block";
  }

}


if(produitEnregistreDansLocaleStorage){
  nombreProduit.textContent = parseInt(produitEnregistreDansLocaleStorage.length)
  if (nombreProduit.textContent) {
  buttonRouge.style.display = "block";
  }
}else{
  buttonRouge.style.display = "none";
}




  





