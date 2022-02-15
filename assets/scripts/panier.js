
//la variable dans laquelle on met les key et les valeurs qui sont dans le locale Storage
let recup = localStorage.getItem('produit');
// Vérification qu'il ne soit pas vide
if (!recup) {
  //dans le cas ou le local storage est vide
  let main = document.querySelector("main");
  
  const divImage =document.createElement("div")
  divImage.setAttribute("class", "imagePanier")
  const imagePanier = document.createElement("img")
  imagePanier.setAttribute("src", "assets/images/panierVide.png");
  
  divImage.appendChild(imagePanier)
  main.appendChild(divImage)

  let parag = document.createElement("p");
  parag.textContent = "Votre panier est vide...";
  parag.setAttribute("class","pasDeCommande")
  
  main.appendChild(parag)

  const thead = document.querySelector("thead")
  const tfoot = document.querySelector("tfoot")
  thead.style.display= 'none';
  tfoot.style.display= 'none';
  //dans le cas ou le local storage n'est pas vide
} else {
  var recupParse = JSON.parse(recup);

  // Création dle case nombreProduit ainsi le total:
  const divBot12 = document.querySelector(".bot12")

  const divNombreDeProduit = document.createElement('div');
  divNombreDeProduit.setAttribute("class","nombreDeProduit")

  const nombreProduit = document.createElement("p");
  nombreProduit.setAttribute("class","parNom")
  nombreProduit.textContent=parseInt(recupParse.length)

  divNombreDeProduit.appendChild(nombreProduit)
  divBot12.appendChild(divNombreDeProduit)

  const supprimePanier = document.querySelector(".supprimerPanier")
  const btnSupPanier = document.createElement("Button");
  btnSupPanier.textContent="Supprimer le panier"
  btnSupPanier.setAttribute("class","suppPanier")
  btnSupPanier.setAttribute("onClick","supPanier()")
  supprimePanier.appendChild(btnSupPanier)


  const total12 =document.querySelector(".total12");
  const total1 = document.createElement("div");
  total1.setAttribute("class","total1")
  const p1 =document.createElement("p")
  p1.textContent = "Total : ";
  total1.appendChild(p1)

  const total2 = document.createElement("div")
  total2.setAttribute("class","total2")
  const p2 = document.createElement("p")
  p2.setAttribute("id","total")
  p2.innerHTML="0€"
  total2.appendChild(p2)



  total12.append(total1,total2)

  //Supprimer panier
  function supPanier(){
    popConfirmation();
    
  }
  //fonction fenetre pop up  
  const popConfirmation = () => {
    if (window.confirm(`Confirmez la suppression du panier`)) {
      localStorage.removeItem("produit");
      location.reload();
    } else {
      
    }
  }

  //-----------L'affichage des produits du panier-----------------

  const tbody = document.querySelector(".tableau");
  const total = document.getElementById("total");
  
  for (let i = 0; i < recupParse.length; i++) {

    let trouve = false;

    //On récupere toutes les (tr) présentent dans le panier
    let allTrPanier = tbody.children;
    for (let j = 0; j < allTrPanier.length; j++) {
      if (allTrPanier[j].getAttribute("id") == recupParse[i].idDeProduit) {
        trouve = true;
        //On récupère la liste de toutes les td
        let allTdOfTrFound = allTrPanier[j].children;

        allTdOfTrFound[2].textContent = parseFloat(allTdOfTrFound[2].textContent) + 1;

        allTdOfTrFound[4].textContent = (parseFloat(allTdOfTrFound[4].textContent) + parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"

        total.textContent = (parseFloat(total.textContent) + parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"
      }
    }
    if (!trouve) {
      
      //Création du tr
      const tr1 = document.createElement("tr");
      tr1.setAttribute("id", recupParse[i].idDeProduit);
      
      //Récupération et Création d'image
      const td1 = document.createElement("td");
      const imageP = document.createElement("img")
      imageP.setAttribute("src", "assets/images/" + recupParse[i].imageDeProduit);
      imageP.setAttribute("class", "imageP")
      td1.appendChild(imageP)

    

      //Récupération et création nomDeProduit
      const td2 = document.createElement("td");
      td2.textContent = recupParse[i].nomDeProduit;

      //Création du champ quantité
      const td3 = document.createElement("td");
      td3.textContent = 1;

      //Création des deux buttons plus et moins
      const td4 = document.createElement("td");
      //Création du Button moins pour chaque ligne (tr)
      const divPlusMoins = document.createElement("div")
      divPlusMoins.setAttribute("class", "divPlusMoins")
      const divMoins = document.createElement("div")
      divMoins.setAttribute("class", "divMoins")
      const diminuer = document.createElement("input");
      diminuer.setAttribute("id", recupParse[i].idDeProduit);
      diminuer.setAttribute("onClick", "diminuerProduit(id)");
      diminuer.type = "image";
      diminuer.src = "assets/images/moins.png";

      divMoins.appendChild(diminuer);
      td4.appendChild(divMoins);


      //Création du Button plus pour chaque ligne(tr)
      const divPlus = document.createElement("div")
      divPlus.setAttribute("class", "divPlus")
      const ajouter = document.createElement("input");
      ajouter.setAttribute("id", recupParse[i].idDeProduit);
      ajouter.setAttribute("onClick", "ajouterProduit(id)");
      ajouter.type = "image";
      ajouter.src = "assets/images/plus.png";

      divPlus.appendChild(ajouter)
      divPlusMoins.append(diminuer, divPlus)
      td4.appendChild(divPlusMoins)

      const td5 = document.createElement("td")
      td5.textContent = parseFloat(recupParse[i].prixDeProduit).toFixed(2) + "€";

      tr1.append(td1, td2, td3, td4, td5);
      tbody.appendChild(tr1);




      total.textContent = (parseFloat(total.textContent) + parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"


    }
  }

  //fonction ajouter
  function ajouterProduit(id) {
    const idProduit = document.getElementById(id).id
    for (let i = 0; i < recupParse.length; i++) {
      if (parseInt(recupParse[i].idDeProduit) == parseInt(idProduit)) {
        //On récupere toutes les (tr) présentent dans le panier
        const idd = document.getElementById(id).children
        // on récupere toutes les (td) 
        idd[2].textContent = parseFloat(idd[2].textContent) + 1;


        idd[4].textContent = (parseFloat(idd[4].textContent) + parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"
        total.textContent = (parseFloat(total.textContent) + parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"
        //ajout dans le tableau de l'objet avec les values
        recupParse.push(recupParse[i]);
        //la transformation en format json et l'envoyer dans la key "produit" du localStorage
        localStorage.setItem("produit", JSON.stringify(recupParse));
        i = recupParse.length
        nombreProduit.textContent = parseInt(recupParse.length)
        

      }
    }
  }


  function diminuerProduit(id) {

    //On récupere toutes les (tr) présentent dans le panier
    const idProduit = document.getElementById(id).id
    const idd = document.getElementById(id).children

    // on récupere toutes les (td) 
    idd[2].textContent = parseFloat(idd[2].textContent) - 1;
    const quant = parseFloat(idd[2].textContent);

    if (quant > 0) {
     let i=0;
     let find =false;
     while(i<recupParse.length && !find){
        
        if (parseInt(recupParse[i].idDeProduit) == parseInt(idProduit)) {
          idd[4].textContent = (parseFloat(idd[4].textContent) - parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"
          total.textContent = (parseFloat(total.textContent) - parseFloat(recupParse[i].prixDeProduit)).toFixed(2) + "€"
          find= true;
          //Supprimer la ligne , l'objet de la liste
          recupParse.splice(i, 1);

          //la transformation en format json et l'envoyer dans la key "produit" du localStorage
          localStorage.setItem("produit", JSON.stringify(recupParse));
          nombreProduit.textContent = parseInt(recupParse.length)
          // i = recupParse.length
          // // break;
          

        }
        i++;
      }
    } else {
      let i=0;
      let find =false;
      while(i<recupParse.length && !find){
        if (parseInt(recupParse[i].idDeProduit) == parseInt(idProduit)) {

          //ajout dans le tableau de l'objet avec les values
          recupParse.splice(i, 1);
          //la transformation en format json et l'envoyer dans la key "produit" du localStorage
          localStorage.setItem("produit", JSON.stringify(recupParse));
          

        }
        i++;
      }

      location.reload();
      if (recupParse.length == 0) {
        localStorage.removeItem("produit");
      }

    }

  }
}



