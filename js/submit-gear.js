import { saveNewGear, toggleMenu } from './utils.mjs';

window.toggleMenu = toggleMenu;

function submitNewGear(event) {
    event.preventDefault();
    const name = document.getElementById('gear-name').value;
    const description = document.getElementById('gear-description').value;
    const price = document.getElementById('gear-price').value;

    const newGear = {
        id: Date.now(),
        name,
        description,
        price
    };

    saveNewGear(newGear);
}