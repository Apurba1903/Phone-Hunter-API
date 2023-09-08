const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones)
}

const displayPhones = phones => {
    // console.log(phones);


    // Number 1: jeikhane boshabo oikhane place korsi id diye
    const phoneContainer = document.getElementById('phones-container');
    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    phones.forEach(phone => {
        console.log(phone);

        // Number 2: div create korsi poshanor pore ei div e shob dekhabe
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;

        // Number 3: inner html set korte hobe shob kisu er vitore anar jonne
        phoneCard.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        // Number 4: child guloke apppen korte hobe
        phoneContainer.appendChild(phoneCard);

    });
}

// Handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}



// loadPhone();