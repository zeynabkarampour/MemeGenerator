const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const cardForm = document.getElementById('card-form');
const imageUrl = document.getElementById('image-url');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const cardsContainer = document.getElementById('imagecards-container');


// array of objects to save user data
let cards=[];   

// Show Modal, Focus on Input
function showModal(){
    modal.classList.add('show-modal');
    imageUrl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click' , () => modal.classList.remove('show-modal'));
window.addEventListener('click' , (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))


// Validate Form
function validate(urlValue, toptextValue, bottomtextValue) {
   // const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
   // const regex = new RegExp(expression);
    if (!toptextValue || !bottomtextValue || !urlValue) {
      alert('Please submit values for three fields.');
      return false;
    }

    // Valid
    return true;
  }


// Build Cards Dom
function buildCards() {
    // Remove all card elements
    cardsContainer.textContent = '';
    //build cards 
    cards.forEach((card) =>{
    const { url , toptext , bottomtext} = card;
    // Item ( parents tag) : <div class="item" >
    const item = document.createElement('div');
    item.classList.add('item');
    // Image  card-img-top
    const imgCard = document.createElement('img');
    imgCard.classList.add('card-img-top');
    imgCard.setAttribute('src', `${url}`);
    imgCard.setAttribute('alt', 'Card image');
    // Overlay for image ( include aTag & iTag): <div class="overlay">
    const imgOverlay = document.createElement('div');
    imgOverlay.classList.add('overlay');
    // Close Icon ( a tag)
    var aTag = document.createElement('a');
    aTag.classList.add('icon');
    aTag.setAttribute('alt', 'Card image');
    aTag.setAttribute('href', "#");
    // Close Icon ( i Tag )
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete item');
    closeIcon.setAttribute('onclick', 'deleteCard(toptext);');
    closeIcon.onclick = function(){deleteCard(toptext);};
    // div class="top-left"
    const topLeft = document.createElement('div');
    topLeft.classList.add('top-left');
    topLeft.textContent=toptext;
    // div class="bottom-left"
    const bottomLeft = document.createElement('div');
    bottomLeft.classList.add('bottom-left');
    bottomLeft.textContent=bottomtext;

     // Append to ImageCards Container container
     aTag.append(closeIcon)
     imgOverlay.append(aTag);
     item.append(imgCard,imgOverlay,topLeft, bottomLeft);
     cardsContainer.appendChild(item);
    });
}



// Fetch from LocalStorage
function fetchCards(){
     // Get Cards from localStorage if available
     if( localStorage.getItem('cards')){
         cards =JSON.parse(localStorage.getItem('cards'));
     } else {
         // Create Cards array in localStorage
         cards = [
             {
            url :"https://purepng.com/public/uploads/large/purepng.com-cupcupopen-containertablewarecarrying-drinksceramic-cup-1701528266193sfx1o.png",
            toptext : "Maryam",
            bottomtext : "Cup"
         },
        ];
        localStorage.setItem('cards' , JSON.stringify(cards));
     }
     buildCards();
}


// Delete Card
function deleteCard(toptext) {
    cards.forEach((card , i) => {
        if( card.toptext === toptext){
            cards.splice(i, 1);
       }
    });
  // update cards array in LocalStorage, re-populate Dom  
  localStorage.setItem('cards' , JSON.stringify(cards));
  fetchCards()
}



//Handle Data from Form
function storeCard(e){
    e.preventDefault();
    let urlValue = imageUrl.value;
    let toptextValue = topText.value;
    let bottomtextValue = bottomText.value;
    // Validate
    if (!validate(urlValue , toptextValue , bottomtextValue)) {
      return false;
    }

    const card  = {
       url :urlValue,
       toptext :toptextValue,
       bottomtext :bottomtextValue
    };
    cards.push(card);
    localStorage.setItem('cards' , JSON.stringify(cards));
    fetchCards();
    cardForm.reset();
    imageUrl.focus();
}


// Event Listener
cardForm.addEventListener('submit' , storeCard)

// On Load, Fetch Bookmarks
fetchCards();

