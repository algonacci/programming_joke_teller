const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const bubble = document.getElementById('speech');

function toggleButton() {
  button.disabled = !button.disabled;
}

function renderJoke(joke) {
  bubble.textContent = joke;
}

async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }

    renderJoke(joke);
    tellMeAJoke(joke);
    toggleButton();
  } catch (error) {
    console.log('Ooops, there was an error: ' + error);
  }
}

function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: '',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
