# Suarecipe

Simple Proof of concept for loading itineraries.

## Dependencies

```
git clone git@github.com:unflores/suarecipe.git
docker-compose up
docker-compose exec dev bash
pushd front; yarn install
popd
pushd back; yarn install
popd
```

## DB

```
cd back
yarn run seed
```

## Run

```
yarn run build:watch
yarn run dev
```

## TODO

* How do I validate incoming data? Currently it's not a problem but I should probably start using joi.
* How do I deal with typescript and incoming api data?
* Test my controllers directly
* get localhost:9090/api/*/recipes/search=recipe => returns 200, should be 404. what to do on 404 on front
