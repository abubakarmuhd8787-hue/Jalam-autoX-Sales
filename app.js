// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Load vehicles when on inventory page
    if (document.getElementById('inventory')) {
        loadVehicles();
        setupFilters();
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Load vehicles from API
async function loadVehicles() {
    try {
        const response = await fetch('/api/vehicles');
        const vehicles = await response.json();
        displayVehicles(vehicles);
    } catch (error) {
        console.error('Error loading vehicles:', error);
    }
}

// Display vehicles in the grid
function displayVehicles(vehicles) {
    const container = document.getElementById('vehicle-container');
    
    if (!container) return;
    
    if (vehicles.length === 0) {
        container.innerHTML = '<p>No vehicles found matching your criteria.</p>';
        return;
    }
    
    container.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card" data-type="${vehicle.type}" data-price="${vehicle.price}">
            <img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}">
            <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
            <p class="price">$${vehicle.price.toLocaleString()}</p>
            <p class="details">${vehicle.type} • ${vehicle.transmission} • ${vehicle.mileage.toLocaleString()} miles</p>
            <button class="view-details" onclick="viewVehicleDetails(${vehicle.id})">View Details</button>
        </div>
    `).join('');
}

// Setup filter event listeners
function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchBox = document.getElementById('search-box');
    
    if (typeFilter) typeFilter.addEventListener('change', filterVehicles);
    if (priceFilter) priceFilter.addEventListener('change', filterVehicles);
    if (searchBox) searchBox.addEventListener('input', filterVehicles);
}

// Filter vehicles based on selections
async function filterVehicles() {
    try {
        const response = await fetch('/api/vehicles');
        let vehicles = await response.json();
        
        // Apply type filter
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter && typeFilter.value !== 'all') {
            vehicles = vehicles.filter(v => v.type === typeFilter.value);
        }
        
        // Apply price filter
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter && priceFilter.value !== 'all') {
            const range = priceFilter.value;
            if (range === '0-20000') {
                vehicles = vehicles.filter(v => v.price < 20000);
            } else if (range === '20000-40000') {
                vehicles = vehicles.filter(v => v.price >= 20000 && v.price <= 40000);
            } else if (range === '40000+') {
                vehicles = vehicles.filter(v => v.price > 40000);
            }
        }
        
        // Apply search filter
        const searchBox = document.getElementById('search-box');
        if (searchBox && searchBox.value) {
            const searchTerm = searchBox.value.toLowerCase();
            vehicles = vehicles.filter(v => 
                v.make.toLowerCase().includes(searchTerm) || 
                v.model.toLowerCase().includes(searchTerm)
            );
        }
        
        displayVehicles(vehicles);
    } catch (error) {
        console.error('Error filtering vehicles:', error);
    }
}

// View vehicle details (placeholder function)
function viewVehicleDetails(vehicleId) {
    alert(`Viewing details for vehicle ID: ${vehicleId}\nIn a full implementation, this would show detailed vehicle information.`);
}

// Contact form handling
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this to your server
        console.log('Contact form submitted:', { name, email, phone, message });
        
        alert('Thank you for your inquiry! We will contact you soon.');
        this.reset();
    });
}
// Mobile Toggle Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    // Open mobile menu
    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile menu
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

console.log('AutoMax Sales website JavaScript loaded');