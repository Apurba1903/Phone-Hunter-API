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

    // Dispay show all button if there are more than 9 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 9) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }


    // display only first 9 phones
    phones = phones.slice(0, 9)

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
            <h2 class="card-title">${phone.brand}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        // Number 4: child guloke apppen korte hobe
        phoneContainer.appendChild(phoneCard);
    });

    // Hide Loading spinner
    toggleLoadingSpinner(false);


}

// Handle search button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spin');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}



// loadPhone();