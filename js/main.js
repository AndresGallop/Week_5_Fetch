import { fetchData } from "./modules/DataMiner.js";

(() => {

    // let useras = document.querySelector(".user"); 

    console.log('loaded');

    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    //  function handleDataSet(thumbs) {
            
    //  }

    function retrieveProjectInfo(event){
        //test for an ID
        // check for an id, and if there isn't one, then don't try the fetch call
        // because it will break (the PHP will choke)
        if (!event.target.id) {return}

        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => console.log(data)).catch(err => console.log(err));
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

            currentUserText[2].innerHTML = `${thumbs[user].name}`;
            currentUserText[3].innerHTML = `${thumbs[user].nickname}`;
            currentUserText[4].innerHTML = `${thumbs[user].role}`;

            function showtext(){
                    
                currentUserText[2].classList.toggle('show-name');
                currentUserText[3].classList.toggle('show-nickname');
                currentUserText[4].classList.toggle('show-role');
            }
                usuario.forEach(useri =>useri.addEventListener("click", showtext)); 

        
            // add this new user to the view
            userSection.appendChild(currentUser);
        }

        userSection.addEventListener("click", retrieveProjectInfo);   
          

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