// This function does the whole job: grab the JSON file, then build one
// "card" of HTML for every item in it, and drop those cards onto the page.
async function loadInventory() {

    // fetch() reaches out and grabs the contents of inventory.json.
    // "await" means: pause here until the file has actually finished loading.
    const response = await fetch('inventory.json');

    // The file comes back as raw text at first. .json() converts that text
    // into an actual JavaScript list of objects we can work with.
    const items = await response.json();

    // This grabs the <main class="catalog"> element from index.html —
    // it's the empty container we're about to fill with cards.
    const catalog = document.querySelector('.catalog');

    // .map() runs this block of code once for EVERY item in the list,
    // and builds one HTML card string per item.
    const cardsHTML = items.map(item => `
        <div class="item-card">
            <img src="${item.image}" alt="${item.title}" class="item-photo">
            <div class="item-info">
                <h2 class="item-title">${item.title}</h2>
                <p class="item-details">${item.details}</p>
                <p class="item-price">$${item.price}</p>
                <a href="${item.instagram}" class="inquire-btn">Message to claim</a>
            </div>
        </div>
    `).join(''); // .join('') glues all those individual card strings into one big string

    // Finally, drop that big string of HTML into the page.
    catalog.innerHTML = cardsHTML;
}

// Actually run the function above as soon as this script loads.
loadInventory();
