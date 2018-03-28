// run in command line using mongo < scripts/products/create-text-index-all-fields.js
use raindrop-api-development
db.products.createIndex({ "$**": "text" })
