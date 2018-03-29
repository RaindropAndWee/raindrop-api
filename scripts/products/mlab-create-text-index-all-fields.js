// copy code in the console to run mLab console:
// mongo ds123129.mlab.com:23129/heroku_bkjflj85 -u <user> -p <password>

// copy and paste code to create a text index, which allows us to pass a search
// query for text:
use heroku_bkjflj85
db.products.createIndex({ "$**": "text" })
