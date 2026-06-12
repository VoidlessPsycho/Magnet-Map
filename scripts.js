const countiesList = {
    "Santa Cruz" = {
        places: ["Mystery Spot"],
        img: "img/places/"
    }
}

fetch("img/california.svg")
    .then(res => res.text())
    .then(svg => {
        document.getElementById("map").innerHTML = svg;
        let counties = document.querySelectorAll('polyline[id^="_x"], path[id^="_x"]').forEach((county) => {
            let name = county.id.replace(/^_x\d+_\d+_/, "");
            name = name.replaceAll("_", " ");
            if (countiesList[name]) {
                county.classList.add("visited");
            }
            county.addEventListener("click", () => openCounty(county));
        });
    });

function openCounty(county) {
    
}
