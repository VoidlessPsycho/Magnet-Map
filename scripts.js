let placesList = {};
fetch("visitedPlaces.json")
    .then(res => res.json())
    .then(data => {
        placesList = data;
        return fetch("img/california.svg");
    })
    .then(res => res.text())
    .then(svg => {
        document.getElementById("map").innerHTML = svg;
        document.querySelectorAll(".county").forEach((county) => {
            const countyData = placesList.California[county.id];

            if (countyData && countyData.places.length > 0) {
                county.classList.add("visited");
            }

            county.addEventListener("click", () => {
                if (county.classList.contains("visited")) {
                    openCounty(county.id);
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

    let countyCard = document.createElement("div");
    countyCard.className = "countyCard";

    let countyName = document.createElement("h2");
    countyName.textContent = county;
    countyName.textContent = countyName.textContent.replaceAll("_", " ");
    countyCard.appendChild(countyName);

    for (let i = 0; i < placesList.California[county].places.length; i++) {
        let placeCard = document.createElement("div");
        placeCard.className = "placeCard";

        let placeName = document.createElement("h3");
        placeName.textContent = placesList.California[county].places[i].name;
        placeCard.appendChild(placeName);

        let placeImg = document.createElement("img");
        placeImg.setAttribute("src", placesList.California[county].places[i].img);
        placeCard.appendChild(placeImg);
        countyCard.append(placeCard);
    };
    sidebarContent.append(countyCard);
};

function scrollToMap() {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
}