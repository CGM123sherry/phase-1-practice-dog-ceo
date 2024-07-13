 //console.log('%c HI', 'color: firebrick')

//ensure DOM loads after html
document.addEventListener("DOMContentLoaded", () => {
    //url to fetch the dog image
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    //Container element to append the images
    const imageContainer = document.getElementById("dog-image-container");
    // url to fetch the list of the dogs
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    //element where to append the list
    const breedList = document.getElementById("dog-breeds");
    //adds event listener to dropdown
    const breedDropdown = document.getElementById("breed-dropdown");
    let allBreeds = {};


    // Fetch the images from the API
    fetch(imgUrl)
    //a promise for the response
        .then(response => response.json())
        //handling of the parsed JSON
        .then(data => {
            //data has parsed json which is images.
            //The array of image URLs
            const images = data.message; 
            //iterate over each image
            images.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Dog Image";
                imageContainer.appendChild(img);
            });
        })
        //catch any error
        .catch(error => {
            //console log the error
            console.error("Error fetching images:", error);
        });

        // Fetch the list of breeds from the API
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        // Extract the breeds object
        allBreeds = data.message; 
        renderBreeds(allBreeds);
    })
    .catch(error => {
        console.error("Error fetching breeds:", error);
    });

// Function to render breeds
function renderBreeds(breeds) {
    // Clear the existing list
    breedList.innerHTML = ""; 
    for (const breed in breeds) {
        const li = document.createElement("li");
        li.textContent = breed;
        breedList.appendChild(li);

        // Add click event listener to change font color
        li.addEventListener("click", () => {
            li.style.color = "purple"; 
        });
    }
}

// Add event listener to the dropdown
breedDropdown.addEventListener("change", (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = {};
    
    // Filter breeds based on the selected letter
    for (const breed in allBreeds) {
        if (selectedLetter === "" || breed.startsWith(selectedLetter)) {
            filteredBreeds[breed] = allBreeds[breed];
        }
    }

    // Render the filtered breeds
    renderBreeds(filteredBreeds);
});
});