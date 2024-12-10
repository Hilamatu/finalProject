const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/add-product', (req, res) => {
    const newProduct = req.body;
    
    fs.readFile(path.join(__dirname, 'public', 'products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products.json:', err);
            return res.status(500).json({ success: false });
        }
        
        const products = JSON.parse(data);
        products.push(newProduct);
        
        fs.writeFile(path.join(__dirname, 'public', 'products.json'), JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to products.json:', err);
                return res.status(500).json({ success: false });
            }
            
            res.json({ success: true });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});