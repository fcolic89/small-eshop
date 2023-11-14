#!/usr/bin/env bash

set -m

/usr/bin/mongod --port 27017 --bind_ip_all &

sleep 5

mongoimport -d products -c products --file products.json --jsonArray

fg %1
