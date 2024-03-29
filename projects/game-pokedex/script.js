const divImage = document.getElementById('image');
const buttonCheck = document.getElementById('check');
const buttonNext = document.getElementById('next');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal-close');
const modalContent = document.querySelector('.modal-content');
const input = document.getElementById('input');
const bg_background = document.querySelector('.modal-background');
const nameContainer = document.getElementById('name');

const getRandomIntInclusive = () => {
  const min = Math.ceil(1);
  const max = Math.floor(150);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createImagePokemon = ({ id, name }) => {
  const img = document.createElement('img');
  img.id = 'pokemon';
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  img.alt = name;
  img.classList.add('no-brightness', 'pokemon-image');
  return img;
};

const nextPokemon = (element) => {
  if (divImage.lastChild) {
    divImage.removeChild(divImage.lastChild);
  }
  divImage.appendChild(element);
};

const setUnderlineName = ({ name }) => {
  let underline = '';
  for (let i = 0; i < name.length; i += 1) {
    underline += '_';
  }
  nameContainer.innerText = underline;
};

const setName = (pokemonName) => (nameContainer.innerText = pokemonName);

const generateRandomPokemon = async () => {
  const randomId = getRandomIntInclusive();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const pokemon = await response.json();
  const imageElement = createImagePokemon(pokemon);
  nextPokemon(imageElement);
  setUnderlineName(pokemon);
};

const reset = () => {
  input.value = '';
  input.disabled = false;
  modal.classList.add('is-active');
  event.target.disabled = true;
};

bg_background.addEventListener('click', (event) => {
  modal.classList.remove('is-active');
});

closeModalButton.addEventListener('click', (event) => {
  modal.classList.remove('is-active');
});

const success = `
<article class="message is-success">
  <div class="message-header">
    <h3>Parabéns</h3>
  </div>
  <div class="message-body">
    <p class"paragraph is-primary"> Parabéns. Você acertou !!! <i class="fas fa-check-circle"></i></p>
  </div>
</article>`;

const failure = `
<article class="message is-danger">
  <div class="message-header">
    <p>Tente novamente</p>
  </div>
  <div class="message-body">
    <p class"paragraph is-primary"> Que pena. Você errou !!! <i class="fas fa-times-circle"></i></p>
  </div>
</article>`;

const isEmpty = `
<article class="message is-warning">
  <div class="message-header">
    <p class="has-text-black">OPS... </p>
  </div>
  <div class="message-body">
    <p class"paragraph is-primary"> Você precisa preencher o campo com o nome do pokemon. ;)</p>
  </div>
</article>`;

const setPoints = (event) => {
  const image = document.getElementById('pokemon');
  let points = parseInt(document.querySelector('.points').innerHTML, 10);
  console.log(input.value, image.alt);
  if (input.value === '') {
    input.focus();
    modalContent.innerHTML = isEmpty;
    modal.classList.add('is-active');
  } else if (input.value.toLowerCase() === image.alt.toLowerCase()) {
    points += 1;
    document.querySelector('.points').innerHTML = points;
    image.classList.remove('no-brightness');
    modalContent.innerHTML = success;
    reset();
    setName(image.alt);
  } else if (input.value.toLowerCase() !== image.alt.toLowerCase()) {
    modalContent.innerHTML = failure;
    image.classList.remove('no-brightness');
    reset();
    setName(image.alt);
  }
};

generateRandomPokemon();
buttonCheck.addEventListener('click', setPoints);
buttonNext.addEventListener('click', () => {
  generateRandomPokemon();
  if (buttonCheck.disabled) {
    buttonCheck.disabled = false;
  }
});
