import { fetchData } from "./modules/DataMiner.js";

(() => {

    console.log('loaded');
    
    function popErrorBox(message){
        alert("Something has gone horribly, horribly wrong");
    }

    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
           let  userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

        debugger;

        // loop through the JavaScript object and for each user, make a copy of the user template we find at the bottom of index.html, populate it with the user's data, and put that fresh copy in the users section in index.html

        for (let user in data) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].src = `images/${data[user].avatar}`;    
            currentUserText[2].textContent = data[user].name;
            currentUserText[3].textContent = data[user].role;
            currentUserText[4].textContent = data[user].nickname;

            // add this new user to the view
            userSection.appendChild(currentUser);
        }

        console.log(data);
    }

    function retrieveProjectInfo(){
        //test for an ID
        debugger;
        console.log(this.id);

        fetchData(`./includes/index.php?id=${this.id}`).then(data => console.log(data)).catch(err => console.log(err));
    }

    function renderPortfolioThumbnails(thumbs) {
        let  userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

       
        for (let user in thumbs) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].src = `images/${thumbs[user].avatar}`;  
            currentUserText[1].id = thumbs[user].id;  
            // add this new user to the view
             currentUser.addEventListener("click", retrieveProjectInfo);
            userSection.appendChild(currentUser);
        }

    }

    fetchData('./includes/index.php').then(data => renderPortfolioThumbnails(data)).catch(err => console.log(err));

})();