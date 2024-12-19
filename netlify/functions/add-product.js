const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Only POST requests are allowed.' }),
        };
    }

    try {
        const data = JSON.parse(event.body);
        const filePath = path.join(__dirname, '..', 'public', 'products.json');

        const fileContent = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(fileContent);

        products.push(data);

        await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error processing product submission:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
        };
    }
};
