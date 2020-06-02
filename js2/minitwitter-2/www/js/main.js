const form = document.querySelector("form");
const input = form.querySelector('input[name="tweet"]');
const list = document.querySelector("ul#tweets");

let tweets = [];

const localTweets = JSON.parse(window.localStorage.getItem("tweets"));

if (localTweets) {
  tweets = localTweets;
}

function updateTweetList() {
  list.innerHTML = "";

  const fragment = document.createDocumentFragment();

  let index = 0;

  for (const tweet of tweets) {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = tweet.text;

    const footer = document.createElement("footer");

    const time = document.createElement("time");
    time.textContent = tweet.date;

    const button = document.createElement("button");
    button.setAttribute("data-index", index);
    button.classList.add("action");
    button.textContent = "Borrar";

    footer.append(time);
    footer.append(button);

    li.append(p);
    li.append(footer);

    fragment.append(li);
    index++;
  }

  list.append(fragment);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const tweetText = input.value;

  if (tweetText.length === 0 || tweetText.length > 250) {
    alert("fuck you");
  } else {
    const now = new Date();

    tweets.unshift({
      text: tweetText,
      date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    });

    window.localStorage.setItem("tweets", JSON.stringify(tweets));

    input.value = "";
    updateTweetList();
  }
});

list.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches("button.action")) {
    const index = target.getAttribute("data-index");
    tweets.splice(index, 1);

    window.localStorage.setItem("tweets", JSON.stringify(tweets));

    updateTweetList();
  }
});

updateTweetList();
