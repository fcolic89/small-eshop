#!/usr/bin/env bash

set -m

/usr/bin/mongod --port 27017 --bind_ip_all &

sleep 5

/usr/bin/mongoimport -d products -c products --file products.json --jsonArray

/usr/bin/mongosh mongodb://mongo:27017/products --file init-data.js

fg %1
