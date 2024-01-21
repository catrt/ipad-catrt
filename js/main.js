import ipads from "../data/ipads.js"
import navigations from "../data/navigations.js"

// BASKET
const basketStarterEl = document.querySelector(".basket-starter")
const basketEl = basketStarterEl.querySelector(".basket")

basketStarterEl.addEventListener("click",function (event) {
    event.stopPropagation()
    if(basketEl.classList.contains("show")) {
        hideBasket()
    } else {
        showBasket()
    }  
})
basketEl.addEventListener("click", function (event) {
    event.stopPropagation()
})
window.addEventListener("click", function () {
    if(basketEl.classList.contains("show")) {
        hideBasket()
    }
})

function showBasket() {
    basketEl.classList.add("show")
}
function hideBasket() {
    basketEl.classList.remove("show")
}

// SEARCHING
const headerEl = document.querySelector("header")
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]
const searchStarterEl = document.querySelector(".search-starter")
const searchWrapEl = document.querySelector(".search-wrap")
const searchCloserEl = searchWrapEl.querySelector(".search-closer")
const searchShadowEl = searchWrapEl.querySelector(".shadow")
const searchInputEl = searchWrapEl.querySelector("input")
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")]

searchStarterEl.addEventListener("click", showSearch)
searchCloserEl.addEventListener("click", hideSearch)
searchShadowEl.addEventListener("click", hideSearch)

function showSearch() {
    headerEl.classList.add("searching")
    document.documentElement.classList.add("fixed")
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = .4 / headerMenuEls.length * index + "s"
    })
    searchDelayEls.forEach(function (el, index) {
        el.style.transitionDelay = .4 / searchDelayEls.length * index + "s"
    })
    setTimeout(function () {
        searchInputEl.focus()
    }, 800)
}
function hideSearch() {
    headerEl.classList.remove("searching")
    document.documentElement.classList.remove("fixed")
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = .4 / headerMenuEls.length * index + "s"
    })
    searchDelayEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = .4 / searchDelayEls.length * index + "s"
    })
    searchDelayEls.reverse()
    searchInputEl.value = ""
}

// INTERSECTION OBSERVER
const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if(!entry.isIntersecting) {
            return
        }
        entry.target.classList.add("show")
    })
})

const infoEls = document.querySelectorAll(".info")
infoEls.forEach(function (el) {
    io.observe(el)
})

// VIDEO CONTROLLER
const video = document.querySelector(".stage video")
const playBtn = document.querySelector(".stage .controller--play")
const pauseBtn = document.querySelector(".stage .controller--pause")
playBtn.addEventListener("click", function () {
    video.play()
    playBtn.classList.add("hide")
    pauseBtn.classList.remove("hide")
})
pauseBtn.addEventListener("click", function () {
    video.pause()
    playBtn.classList.remove("hide")
    pauseBtn.classList.add("hide")
})

// COMPARE SECTION ITEMS RENDERING
const itemEls = document.querySelector("section.compare .items")
ipads.forEach(function (ipad) {
    const itemEl = document.createElement("div")
    itemEl.classList.add("item")

    let colorList = ""
    ipad.colors.forEach(function (color) {
        colorList += `<li style="background-color: ${color}"></li>`
    })

    itemEl.innerHTML = /* html */ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}">
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString()}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `

    itemEls.append(itemEl)
})

// FOOTER NAVIGATIONS RENDERING
const navigationsEl = document.querySelector("footer .navigations")
navigations.forEach(function (nav) {
    const mapEl = document.createElement("div")
    mapEl.classList.add("map")

    let mapList = ""
    nav.maps.forEach(function (map) {
        mapList += /* html */ `
            <li>
                <a href="${map.url}">${map.name}</a>
            </li>
        `
    })

    mapEl.innerHTML = /* html */ `
        <h3>
            <div class="text">${nav.title}</div>
        </h3>
        <ul>
            ${mapList}
        </ul>
    `

    navigationsEl.append(mapEl)
})

// THIS-YEAR
const thisYearEl = document.querySelector(".this-year")
thisYearEl.textContent = new Date().getFullYear()