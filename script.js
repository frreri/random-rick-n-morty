'use strict';

const imageEl = document.getElementById('character-img');
const nameEl = document.getElementById('character-name');
const statusEl = document.getElementById('character-status');
const speciesEl = document.getElementById('character-species');
const randBtn = document.querySelector('.btn');

const apiUrl = 'https://rickandmortyapi.com/api/character';

const getJsonData = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to get JSON-data.');
    }
  } catch (err) {
    throw err;
  }
};

const getCharacter = async id => {
  return await getJsonData(apiUrl + `/${id}`);
};

const getCharacterCount = async () => {
  const jsonData = await getJsonData(apiUrl);
  return jsonData.info.count;
};

const showCharacter = async id => {
  try {
    const character = await getCharacter(id);

    imageEl.src = character.image;
    nameEl.textContent = character.name;
    statusEl.textContent = 'Status: ' + character.status;
    speciesEl.textContent = 'Species: ' + character.species;
    imageEl.style.minWidth = `${nameEl.getClientRects()[0].width + 12}px`;
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};

const showRandChar = () => {
  getCharacterCount()
    .then(count => {
      const randId = Math.floor(Math.random() * count) + 1;
      showCharacter(randId);
    })
    .catch(err => alert(err.message));
};

randBtn.addEventListener('click', showRandChar);
showRandChar();
