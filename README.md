# Suarecipe

Simple Proof of concept for loading itineraries.

## Dependencies

```
apt-get install mongodb
git clone git@github.com:unflores/suarecipe.git
cd suarecipe
pushd front; yarn install
popd
pushd back; yarn install
popd
```

## Run

```
yarn run build:watch
yarn run dev
```

## TODO

How do I validate incoming data? Currently it's not a problem but I should probably start using joi.
How do I deal with typescript and incoming api data?
