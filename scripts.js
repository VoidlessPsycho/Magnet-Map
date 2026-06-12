import { countiesList } from "countiesList.js";


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
    let sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = "";

    let countyName = document.createElement("h2");
    countyName.textContent = county;
    sidebar.append(countyName);

    let placeName = document.createElement("h3");
    placeName.textContent = countiesList[county].places.name;
    sidebar.append(placeName);

    let placeImg = document.createElement("img");
    placeImg.setAttribute("src", countiesList[county].places.img);
    sidebar.append(placeImg)

}
