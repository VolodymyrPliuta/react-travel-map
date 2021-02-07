# Travel Map
![map of North America](travel.png)
Travel Map is a Single Page Application built with React.js

## Table of Contents

- [Installation](#installation)
- [Installation with Back-End](#installation-with-back-end)
- [How to use](#how-to-use)
- [Sending Feedback](#sending-feedback)

## Installation

Run in your terminal:

```
git clone git@github.com:VolodymyrPliuta/react-travel-map.git
```

then

```
cd react-travel-map
npm install
npm start
```
## Installation with Back-End

I wrote back-end code as well to keep green markers - places <br>
I am going to on the map. To use that code you should switch to<br>
express branch

```
git checkout express
```

Clone express.js server

```
git@github.com:VolodymyrPliuta/travel-server.git
```
To run the server, run next command in your terminal

```
npm install
npm start
```

You will need to install MySQL database management system on your computer

```
sudo apt-get update
sudo apt-get install mysql-server
mysql_secure_installation
```
After MySQL is installed you should open it's CLI with

```
sudo -i mysql
```

Run next in MySQL CLI to create database and table with columns

```
CREATE DATABASE travel;
CREATE TABLE newLocation (
    id int,
    Name varchar
    Lat float(10, 6),
    Lng float(10, 6)
);
```


## How to use

Red markers on the map are places I have been to<br>
To add places where I am going to I have to type<br>
in the search box, a name of the place I am going to<br>
To learn more about place click on the marker and<br>
click on Learn more button. You will get a new page<br>
with first 10 from Unsplash.com which match the search<br>
word as well as first 10 articles from New York Times<br>
If a journey route is going to be changed, to delete<br>
green marker just double click on it<br>

## Sending Feedback

Always open to [your feedback](https://github.com/volodymyrpliuta/React-travel-map/issues).

