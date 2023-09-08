const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    // Number 1: jeikhane boshabo oikhane place korsi id diye
    const phoneContainer = document.getElementById('phones-container');

    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // Dispay show all button if there are more than 9 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // display only first 9 phones if there is no Show All
    if (!isShowAll) {
        phones = phones.slice(0, 9)
    }

    phones.forEach(phone => {
        // console.log(phone);

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
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // Number 4: child guloke apppen korte hobe
        phoneContainer.appendChild(phoneCard);
    });
    // Hide Loading spinner
    toggleLoadingSpinner(false);
}
// 
const handleShowDetail = async (id) => {
    // Load Single Phone Data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);


    const showDetailContainer = document.getElementById('shob_details_container');
    showDetailContainer.innerHTML = `
        
        <img src="${phone.image}" alt="">
        <h3 class="font-bold text-2xl">${phone.name}</h3>
        <p><span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size :  </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">GPS : </span>${phone?.others?.GPS || 'No GPS'}</p>
    `

    // Show the Modal
    shob_details_modal.showModal()
}

// Handle Search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}
// Spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spin');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}
// Handle Show All Button
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();