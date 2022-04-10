function loadData(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        //xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response); }
            else {
                reject({ status: this.status, statusText: xhr.statusText}); 
            };
        };
        xhr.onerror = function () { reject({ status: this.status, statusText: xhr.statusText }); }; 
        xhr.send();
    });
}

function randomfact() {
    loadData("GET", "./json/facts.json")
    .then(data => {
        const factP = document.getElementById("facts");
        if (factP !== null) {
            const factslist = JSON.parse(data);
            const factNo = Math.floor(Math.random() * factslist["facts"].length);
            factP.innerHTML = factslist["facts"][factNo];
        }
    })
}

function hotels() {
    loadData("GET", "./json/accomodation.json")
    .then(data => {
        const hotelGrid = document.getElementById("hotelGrid");

        if (hotelGrid !== null) {
            const hotelList = JSON.parse(data);

            hotelList.forEach(hotel => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                hname = document.createElement('h4');
                hname.innerHTML = hotel.accomodation;
                gridItem.appendChild(hname);

                haddress = document.createElement('p');
                haddress.className = 'Address';
                haddress.innerHTML = hotel.address;
                gridItem.appendChild(haddress);

                himg = document.createElement('img');
                himg.src = hotel.image;
                himg.alt = hotel.accomodation;
                gridItem.appendChild(himg);

                hdescription = document.createElement('p');
                hdescription.innerHTML = hotel.description;
                gridItem.appendChild(hdescription);

                hotelGrid.appendChild(gridItem);
            });
        }
    })
}

function events() {
    loadData("GET", "./json/events.json")
    .then(data => {
        console.log(data);
    })
}

function food() {
    loadData("GET", "./json/food.json")
    .then(data => {
        console.log(data);
    })
}

function histories() {
    loadData("GET", "./json/history.json")
    .then(data => {
        const historyGrid = document.getElementById("historyGrid");

        if (historyGrid !== null) {
            const historyList = JSON.parse(data);

            historyList.forEach(history => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                hname = document.createElement('h4');
                hname.innerHTML = history.name;
                gridItem.appendChild(hname);

                haddress = document.createElement('p');
                haddress.className = 'Address';
                haddressContent = history.address.replace(", ", "<br />")
                if (history.telephone !== "") {
                    haddressContent = haddressContent+'<br />Tel: '+history.telephone;
                }
                haddress.innerHTML = haddressContent;
                gridItem.appendChild(haddress);

                hstarDiv = document.createElement('div');
                hstarCount = (Math.round(history.stars * 2) / 2).toFixed(1);
                hstarWhole = Math.trunc(hstarCount);
                for (let i = 0; i < hstarWhole; i++) {
                    hstars = document.createElement('i');
                    hstars.className = 'fa-solid fa-star';
                    hstarDiv.appendChild(hstars);
                }
                if (hstarCount - hstarWhole > 0) {
                    hstars = document.createElement('i');
                    hstars.className = 'fa-solid fa-star-half';
                    hstarDiv.appendChild(hstars);
                }
                gridItem.appendChild(hstarDiv);

                if (history.review !== "") {
                    hreview = document.createElement('quote');
                    hreview.innerHTML = '"'+history.review+'"';
                    gridItem.appendChild(hreview);
                    historyGrid.appendChild(gridItem);
                }
            });
        }
    })
}