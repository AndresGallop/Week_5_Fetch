import { fetchData } from "./modules/DataMiner.js"; 

(() => {

    // let useras = document.querySelector(".user"); 

    console.log('loaded');

    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
     function openLightbox(data) {
         // populate a lightbox with this data
         // and then open it
         let lightbox = document.querySelector(".lightbox"),
             closeButton = lightbox.querySelector('span');

         closeButton.addEventListener("click", ()=> {lightbox.classList.remove('show-lightbox')});

         lightbox.classList.add('show-lightbox');
         // lightbox should open but nothing inside yet
         lightbox.querySelector('img').src = `images/${data[0].avatar}`;
         lightbox.querySelector('h3').textContent = data[0].name;
         lightbox.querySelector('p').textContent = data[0].role;

         // testify!
         // so that's it! you would style your lightbox items however you like!
         // retrieve the info a click, and just change their contents to reflect that data
         // NO TEMPLATES, JUST WIRE IT ALL UP DIRECTLY
    
        }

    function retrieveProjectInfo(event){
        //test for an ID
        // check for an id, and if there isn't one, then don't try the fetch call
        // because it will break (the PHP will choke)
        if (!event.target.id) {return}

        let userPieces = event.target.parentElement.children;

        // need to write some lightbox functionality here - pass the data into that function and then show it
        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => openLightbox(data)).catch(err => console.log(err));
        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => showtext(data, userPieces)).catch(err => console.log(err));
    }

    function renderPortfolioThumbnails(thumbs) {
        let  userSection = document.querySelector('.user-section');
        let userTemplate = document.querySelector('#user-template').content;
        //let template = document.querySelector('#user-template').children;
            

       
        for (let user in thumbs) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;
                let usuario = document.querySelectorAll(".user");

            currentUserText[1].src = `images/${thumbs[user].avatar}`; 
            currentUserText[1].id = thumbs[user].id;  // Esta mierda es para obtener los datos (se ven en la consola), no se ven en la pantalla.

             

        
            // add this new user to the view
            userSection.appendChild(currentUser);
        }

        userSection.addEventListener("click", retrieveProjectInfo);   
          

    }

    function showtext(person, elements) {
        // debugger;

        elements[2].innerHTML = person[0].name;  
        elements[3].innerHTML = person[0].nickname;
        elements[4].innerHTML = person[0].role;

        elements[2].classList.toggle('show-name');
        elements[3].classList.toggle('show-nickname');  // TREVOR - I need to find out how to indicate JS that I want this function
        elements[4].classList.toggle('show-role');      // to happen in the selected user. I tried ${this} but did not work.
    }
    // function showtext(){

    //     let name = document.querySelector(".user-name"),
    //         nickname = document.querySelector(".user-nickname"),
    //         role = document.querySelector(".user-role");
            

    //     name.classList.toggle('show-name');
    //     nickname.classList.toggle('show-nickname');
    //     role.classList.toggle('show-role');
    // }

    // useras.addEventListener("click", showtext);

    

    fetchData('./includes/index.php').then(data => renderPortfolioThumbnails(data)).catch(err => console.log(err));

})();