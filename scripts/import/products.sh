# bulk load data
mongoimport --db=mongo-crud --collection=products --type=csv --headerline --file=data/products.csv
