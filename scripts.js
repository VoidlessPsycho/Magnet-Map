const countiesList = {
    "Santa Cruz": {
        places: [
            {
                name: "Mystery Spot",
                img: "img/places/mystery-spot.png"
            }
        ]
    },
    "Sonoma": {
        places: [
            {
                name: "Peanuts Museum",
                img: "img/places/peanuts-museum.png"
            }
        ]
    },
    "Santa Clara": {
        places: [
            {
                name: "The Tech Interactive",
                img: "img/places/the-tech-interactive.png"
            }
        ]
    },
    "Napa": {
        places: [
            {
                name: "Old Faithful Geyser",
                img: "img/places/old-faithful-geyser.png"
            }
        ]
    }
}

fetch("img/california.svg")
    .then(res => res.text())
    .then(svg => {
        document.getElementById("map").innerHTML = svg;
        document.querySelectorAll('polyline[id^="_x"], path[id^="_x"]').forEach((county) => {
            let name = county.id.replace(/^_x\d+_\d+_/, "");
            name = name.replaceAll("_", " ");
            if (countiesList[name]) {
                county.classList.add("visited");
            }
            county.addEventListener("click", function () {
                if (county.classList.contains("visited")) {
                    openCounty(name);
                }
            });
        });
    });

function openCounty(county) {
    let sidebarContent = document.getElementById("sidebarContent");
    sidebarContent.innerHTML = "";

    let sidebar = document.getElementById("sidebar");

    let closeBtn = document.getElementById("toggleSidebar");
    closeBtn.style.display = "inline-block";
    closeBtn.addEventListener("click", () => {
        sidebarContent.innerHTML = "";
        closeBtn.style.display = "none";
    });

    sidebar.append(closeBtn);

    let infoCard = document.createElement("div");
    infoCard.className = "infoCard";

    let countyName = document.createElement("h2");
    countyName.textContent = county;
    infoCard.appendChild(countyName);

    for (let i = 0; i < countiesList[county].places.length; i++) {
        let placeName = document.createElement("h3");
        placeName.textContent = countiesList[county].places[i].name;
        infoCard.appendChild(placeName);

        let placeImg = document.createElement("img");
        placeImg.setAttribute("src", countiesList[county].places[i].img);
        infoCard.appendChild(placeImg);
    };
    sidebarContent.append(infoCard);
};

function scrollToMap() {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
}