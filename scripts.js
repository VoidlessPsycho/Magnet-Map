let placesList = {};
let numPlacesVisited = 0;

const { name, svg, data } = window.MAP_CONFIG;
fetch(data)
    .then(res => res.json())
    .then(data => {
        placesList = data;
        return fetch(svg);
    })
    .then(res => res.text())
    .then(svg => {
        document.getElementById("map").innerHTML = svg;
        document.querySelectorAll(".region, .land, .circle").forEach((region) => {
            const regionData = placesList[region.id];

            if (regionData && regionData.places.length > 0) {
                region.classList.add("visited");
                numPlacesVisited++;
            }

            region.addEventListener("click", () => {
                if (region.classList.contains("visited")) {
                    openRegion(region.id);
                }
            });
        });

        let newsHeader = document.getElementById("sidebarHeader");
        newsHeader.innerText = "The " + name + " Times";

        let numPlacesVisitedDisplay = document.getElementById("numPlacesVisited");
        numPlacesVisitedDisplay.innerText = numPlacesVisited;
    })

function openRegion(region) {
    if (region == "California") {
        window.location.href = "index.html";
        return;
    }
    if (region == "United_States") {
        window.location.href = "usa.html";
        return;
    }
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

    let regionCard = document.createElement("div");
    regionCard.className = "regionCard";

    let regionName = document.createElement("h2");
    regionName.textContent = region;
    regionName.textContent = regionName.textContent.replaceAll("_", " ");
    regionCard.appendChild(regionName);

    for (let i = 0; i < placesList[region].places.length; i++) {
        let placeCard = document.createElement("div");
        placeCard.className = "placeCard";

        let placeName = document.createElement("h3");
        placeName.textContent = placesList[region].places[i].name;
        placeCard.appendChild(placeName);

        let placeImg = document.createElement("img");
        placeImg.setAttribute("src", placesList[region].places[i].img);
        placeCard.appendChild(placeImg);
        regionCard.append(placeCard);
    };
    sidebarContent.append(regionCard);
};

function scrollToMap() {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
}