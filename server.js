const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/vehicles', (req, res) => {
    // This will later connect to database
    const vehicles = [
        {
            id: 1,
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            price: 28500,
            type: 'Car',
            transmission: 'Automatic',
            mileage: 12000,
            image: 'https://via.placeholder.com/300x200?text=Toyota+Camry',
            description: 'Reliable sedan with excellent fuel economy'
        },
        {
            id: 2,
            make: 'Honda',
            model: 'Civic',
            year: 2023,
            price: 25900,
            type: 'Car',
            transmission: 'Automatic',
            mileage: 8000,
            image: 'https://via.placeholder.com/300x200?text=Honda+Civic',
            description: 'Sporty compact car with modern features'
        },
        {
            id: 3,
            make: 'Harley-Davidson',
            model: 'Street 750',
            year: 2022,
            price: 12500,
            type: 'Motorcycle',
            transmission: 'Manual',
            mileage: 3500,
            image: 'https://via.placeholder.com/300x200?text=Harley+Street+750',
            description: 'Iconic motorcycle with classic styling'
        }
    ];
    res.json(vehicles);
});

// Main Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/inventory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inventory.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Admin Routes (placeholder)
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.get('/admin/dashboard', (req, res) => {
    // This would later require authentication
    res.sendFile(path.join(__dirname, 'public', 'admin', 'dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});