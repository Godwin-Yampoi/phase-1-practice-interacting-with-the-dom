// Get DOM elements
const counterEl = document.getElementById("counter");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const likeBtn = document.getElementById("heart");
const likesEl = document.querySelector(".likes");
const pauseBtn = document.getElementById("pause");
const restartBtn = document.getElementById("restart");
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("list");

// Counter variable and interval ID
let count = 0;
let intervalID = setInterval(incrementCounter, 1000);

// Event listeners
minusBtn.addEventListener("click", decrementCounter);
plusBtn.addEventListener("click", incrementCounter);
likeBtn.addEventListener("click", addLike);
pauseBtn.addEventListener("click", pauseCounter);
restartBtn.addEventListener("click", restartCounter);
commentForm.addEventListener("submit", addComment);

// Functions
function incrementCounter() {
  count++;
  counterEl.innerText = count;
}

function decrementCounter() {
  count--;
  counterEl.innerText = count;
}

function addLike() {
  const currentCount = counterEl.innerText;
  const existingLike = likesEl.querySelector(`[data-count="${currentCount}"]`);
  if (existingLike) {
    existingLike.dataset.likes++;
    existingLike.innerText = `${currentCount} has ${existingLike.dataset.likes} likes`;
  } else {
    const newLike = document.createElement("li");
    newLike.dataset.count = currentCount;
    newLike.dataset.likes = 1;
    newLike.innerText = `${currentCount} has 1 like`;
    likesEl.appendChild(newLike);
  }
}

function pauseCounter() {
  clearInterval(intervalID);
  minusBtn.disabled = true;
  plusBtn.disabled = true;
  likeBtn.disabled = true;
  pauseBtn.innerText = "Resume";
  pauseBtn.removeEventListener("click", pauseCounter);
  pauseBtn.addEventListener("click", resumeCounter);
}

function resumeCounter() {
  intervalID = setInterval(incrementCounter, 1000);
  minusBtn.disabled = false;
  plusBtn.disabled = false;
  likeBtn.disabled = false;
  pauseBtn.innerText = "Pause";
  pauseBtn.removeEventListener("click", resumeCounter);
  pauseBtn.addEventListener("click", pauseCounter);
}

function restartCounter() {
  count = 0;
  counterEl.innerText = count;
  likesEl.innerHTML = "";
}

function addComment(event) {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input");
  const newComment = document.createElement("li");
  newComment.innerText = commentInput.value;
  commentsList.appendChild(newComment);
  commentInput.value = "";
}
