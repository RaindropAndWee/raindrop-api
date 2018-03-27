# bulk load data
 mongoimport --db=raindrop-api-development --collection=products --mode=merge --upsertFields=name --type=csv --headerline --file=data/products.csv --ignoreBlanks
