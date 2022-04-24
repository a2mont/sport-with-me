# React native client

This client runs using React Native and expo.

## Requirements

- Node.js
- Expo
- Expo Go app (optional)
- Google Places API key (optional, locations search will not work without it)

## Installation

```
npm install
```

## Starting the app

### Before starting

For the app to function fully, you need to have the related [RESTapi](../../backend/README.md) running. If you want to use the complete functionalities, you also have to have a Google Places API key with its corresponding billing account. These informations need to be stored in a _.env_ file with the structure :

```
# Google places
PLACES_API=xxxxxx
# Host
HOST=http://address:port/

```

### To start

```
expo start
```

Expo will then give alternatives on where to open the project.

### Once started

A short explanation on how to use the app is included inside of it.
