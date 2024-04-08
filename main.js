const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener('DOMContentLoaded', function() {
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-glyph')) {
      likeOrUnlike(e.target);
    }
  });
});

function likeOrUnlike(heart) {
  if (heart.innerText == EMPTY_HEART) {
    mimicServerCall()
      .then(() => {
        heart.innerText = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch((error) => {
        displayError(error);
      });
  } else {
    mimicServerCall()
      .then(() => {
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      })
      .catch((error) => {
        displayError(error);
      });
  }
}

function displayError(error) {
  const errorModal = document.getElementById('modal');
  const errorMessage = document.getElementById('modal-message');
  errorMessage.innerText = error;
  errorModal.classList.remove('hidden');
  setTimeout(() => {
    errorModal.classList.add('hidden');
  }, 3000);
}




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
