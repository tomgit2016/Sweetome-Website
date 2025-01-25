// Sample property data (in a real application, this would come from a backend)
const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "Downtown Vancouver",
        price: 2500,
        beds: 2,
        baths: 2,
        area: 850,
        type: "apartment",
        image: "../images/property-1.jpg",
        tag: "For Rent"
    },
    {
        id: 2,
        title: "Spacious Family Home",
        location: "Kitsilano",
        price: 3800,
        beds: 4,
        baths: 3,
        area: 2200,
        type: "house",
        image: "../images/property-2.jpg",
        tag: "For Rent"
    },
    // Add more properties as needed
];

// Function to render property cards
function renderProperties(propertiesArray) {
    const grid = document.getElementById('properties-grid');
    const template = document.getElementById('property-template');
    
    grid.innerHTML = '';
    
    propertiesArray.forEach(property => {
        const clone = template.content.cloneNode(true);
        
        // Set property image
        const img = clone.querySelector('.property-image img');
        img.src = property.image;
        img.alt = property.title;
        
        // Set property tag
        clone.querySelector('.property-tag').textContent = property.tag;
        
        // Set property details
        clone.querySelector('.property-title').textContent = property.title;
        clone.querySelector('.property-location span').textContent = property.location;
        clone.querySelector('.beds span').textContent = property.beds;
        clone.querySelector('.baths span').textContent = property.baths;
        clone.querySelector('.area span').textContent = property.area;
        clone.querySelector('.property-price').textContent = `$${property.price.toLocaleString()}`;
        
        grid.appendChild(clone);
    });
}

// Filter properties based on selected criteria
function filterProperties() {
    const type = document.getElementById('propertyType').value;
    const priceRange = document.getElementById('priceRange').value;
    const beds = document.getElementById('bedrooms').value;
    const location = document.getElementById('location').value;
    
    let filtered = properties;
    
    if (type) {
        filtered = filtered.filter(p => p.type === type);
    }
    
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => {
            if (max) {
                return p.price >= min && p.price <= max;
            } else {
                return p.price >= min;
            }
        });
    }
    
    if (beds) {
        if (beds === '4+') {
            filtered = filtered.filter(p => p.beds >= 4);
        } else {
            filtered = filtered.filter(p => p.beds === Number(beds));
        }
    }
    
    if (location) {
        filtered = filtered.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }
    
    renderProperties(filtered);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);
    
    // Add event listeners to filters
    const filters = document.querySelectorAll('#property-filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterProperties);
    });
}); 