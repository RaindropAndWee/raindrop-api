# bulk load data

mongoimport -h ds123129.mlab.com:23129 -d heroku_bkjflj85 -c products -u <user> -p <password> --mode=upsert --upsertFields=name --file data/products.csv  --type csv --headerline --ignoreBlanks
