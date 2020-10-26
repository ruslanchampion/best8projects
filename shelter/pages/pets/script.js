const header__burger = document.querySelector('.burger-button')
const header_menu = document.querySelector('.header-nav')
const back = document.querySelector('body')

/* Toggle Burger-menu */
header__burger.onclick = toggleMenu = () => {
    header__burger.classList.toggle('active')
    header_menu.classList.toggle('active')
    back.classList.toggle('lock')
}

/* Close burger-menu by clicking outside the menu */
document.addEventListener('click', e => {
    const target = e.target
    const menu = target === header_menu || header_menu.contains(target)
    const burgerBtn = target === header__burger || header__burger.contains(target)
    const menuIsActive = header_menu.classList.contains('active')
    if (!menu && !burgerBtn && menuIsActive) {
        toggleMenu()
    }
})

/* Pet-cards */
const pagActivePage = document.querySelector('.pag-active-page')
let pets = []
fetch('../../pets.json').then(res => res.json()).then(list => {
    pets = list

    /* Random generation of pets */
    let fullPetsList = (() => {
        let tempArr = []

        for (let i = 0; i < 6; i++) {
            const newPets = pets

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j)
                const randElem = newPets.splice(randInd, 1)[0]
                newPets.push(randElem)
            }

            tempArr = [...tempArr, ...newPets]
        }
        return tempArr
    })()

    fullPetsList = sort863(fullPetsList)


    fullPetsList.forEach(item => {
        new PetCard(
            item.img,
            item.name,
            item.name,
            item.type,
            item.breed,
            item.description,
            item.age,
            item.inoculations,
            item.diseases,
            item.parasites
        ).renderPetCard()

        const btnForCallModal = document.querySelectorAll('.call-modal')
        const btnForCloseModal = document.querySelectorAll('.modal-close')
        const modalPetWindow = document.querySelectorAll('.modal-wrapper')

        btnForCallModal.forEach(btn => btn.addEventListener('click', (e) => {
            const target = e.target
            modalPetWindow.forEach(petItem => {
                if (target.classList.contains(item.name) && petItem.classList.contains(item.name)) {
                    petItem.style.display = 'flex'
                    back.classList.add('lock')
                }
            })

        }))

        btnForCloseModal.forEach(item => item.addEventListener('click', (e) => {
            const target = e.target
            modalPetWindow.forEach(item => {
                item.style.display = 'none'
            })
            back.classList.remove('lock')         
        }))

    })

    /* Slider */
    let slideIndex = 0
    const slides = document.querySelectorAll('.animal-single-card')


    /* Rendering slider on loading and resizing the window */
    function renderSlider(n) {
        window.addEventListener("load", () => {
            showSlides(n)
            // console.log('1')
        })
        window.addEventListener("resize", () => {
            showSlides(n)
        })
    }

    /* Shows slides depending on width of the window */
    function showSlides(n = 0) {

        let width = this.window.innerWidth

        if (width > 1279) {

            if (n > slides.length - 16) {
                makeNextBtnsDisabled()
            }
            if (n < 8) {
                makePreviousBtnsDisabled()
            }
            slides.forEach(item => item.style.display = 'none')

            for (let i = 0; i <= 7; i++) {
                slides[slideIndex + i].style.display = 'flex'
            }

        } else if (width > 767) {

            if (n > slides.length - 12) {
                makeNextBtnsDisabled()
            }
            if (n < 6) {
                makePreviousBtnsDisabled()
            }
            slides.forEach(item => item.style.display = 'none')

            for (let i = 0; i <= 5; i++) {
                slides[slideIndex + i].style.display = 'flex'
            }

        } else if (width > 0) {

            if (n > slides.length - 6) {
                makeNextBtnsDisabled()
            }
            if (n < 3) {
                makePreviousBtnsDisabled()
            }
            slides.forEach(item => item.style.display = 'none')

            for (let i = 0; i <= 2; i++) {
                slides[slideIndex + i].style.display = 'flex'
            }
        }

    }
    nextSlide.addEventListener('click', nextSlideMaxWidth = () => {        
        let width = this.window.innerWidth
        makePreviousBtnsActive()
        if (width > 1279) {
            showSlides(slideIndex += 8)
            pagActivePage.innerHTML = slideIndex / 8 + 1
        } else if (width > 767) {
            showSlides(slideIndex += 6)
            pagActivePage.innerHTML = slideIndex / 6 + 1
        } else {
            showSlides(slideIndex += 3)
            pagActivePage.innerHTML = slideIndex / 3 + 1
        }
    })

    prevSlide.addEventListener('click', prevSlideMaxWidth = () => {
        let width = this.window.innerWidth
        makeNextBtnsActive()
        if (width > 1279) {
            showSlides(slideIndex -= 8)
            pagActivePage.innerHTML = slideIndex / 8 + 1
        } else if (width > 767) {
            showSlides(slideIndex -= 6)
            pagActivePage.innerHTML = slideIndex / 6 + 1
        } else {
            showSlides(slideIndex -= 3)
            pagActivePage.innerHTML = slideIndex / 3 + 1
        }
    })
    /* First-page / last-page btns */
    firstPage.addEventListener('click', nextSlideMaxWidth = () => {
        slideIndex = 0
        showSlides()
        makePreviousBtnsDisabled()
        pagActivePage.innerHTML = 1
    })

    lastPage.addEventListener('click', nextSlideMaxWidth = () => {
        let width = this.window.innerWidth
        if (width > 1279) {
            slideIndex = slides.length - 8
            showSlides()
            makeNextBtnsDisabled()
            pagActivePage.innerHTML = slideIndex / 8 + 1
        } else if (width > 767) {
            slideIndex = slides.length - 6
            showSlides()
            makeNextBtnsDisabled()
            pagActivePage.innerHTML = slideIndex / 6 + 1
        } else {
            slideIndex = slides.length - 3
            showSlides()
            makeNextBtnsDisabled()
            pagActivePage.innerHTML = slideIndex / 3 + 1
        }
    })

    renderSlider(slideIndex)
    showSlides()

})

class PetCard {
    constructor(
        src, alt, petName, type,
        breed, description, age,
        inoculations, diseases, parasites
    ) {
        this.src = src
        this.alt = alt
        this.petName = petName
        this.type = type
        this.breed = breed
        this.description = description
        this.age = age
        this.inoculations = inoculations
        this.diseases = diseases
        this.parasites = parasites
        this.petCardParent = document.querySelector('.pet-cards-wrapper')
        this.petModalParent = document.querySelector('body')
    }
    renderPetCard() {
        const newPetCard = document.createElement('div')
        newPetCard.classList.add('animal-single-card')
        newPetCard.classList.add(this.petName)
        newPetCard.classList.add('call-modal')

        newPetCard.innerHTML = `
        <img class="call-modal ${this.petName}" src=${this.src} alt=${this.alt}>
        <h3 class="pet-name">
            ${this.petName}
        </h3>
        <button class="main-btn slider-btn-resp-320 call-modal ${this.petName}">
            Learn more
        </button>     
        `
        this.petCardParent.append(newPetCard)

        /* *******************renderPetModals**************** */
        const newPetModal = document.createElement('div')
        newPetModal.classList.add('modal-wrapper')
        newPetModal.classList.add(this.petName)

        newPetModal.innerHTML = `
        <div class="modal">
        <div class="pet-image-modal"><img src=${this.src} alt=${this.alt}></div>
        <div class="pet-info">
            <div class="pet-name-modal">${this.petName}</div>
            <div class="pet-breed-modal">${this.type} - ${this.breed}</div>
            <div class="pet-desc-modal">${this.description}</div>
            <ul class="pet-features-list">
                <li class="pet-features-item"><span>Age: </span>${this.age}</li>
                <li class="pet-features-item"><span>Inoculations: </span>${this.inoculations}</li>
                <li class="pet-features-item"><span>Diseases: </span>${this.diseases}</li>
                <li class="pet-features-item"><span>Parasites: </span>${this.parasites}</li>
            </ul>
            <button class="modal-close"><img src="../../assets/icons/modal-close.svg" alt="modal-close"></button>
        </div> 
        </div>    
        `
        this.petModalParent.append(newPetModal)
    }
}

const sort863 = (list) => {

    let unique8List = []
    let length = list.length

    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = []

        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break
            }

            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name
            })

            if (isUnique) {
                uniqueStepList.push(list[j])
                list.splice(j, 1)
                j--
            }
        }
        unique8List = [...unique8List, ...uniqueStepList]
    }
    list = unique8List

    list = sort6recursively(list)

    return list
}


const sort6recursively = (list) => {
    const length = list.length

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6)

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j)
            })

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j
                const which8OfList = Math.trunc(ind / 8)

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0])

                sort6recursively(list)
            }
        }
    }

    return list
}

/* Btns logic */
const prevSlide = document.querySelector('.pag-btn-prev')
const nextSlide = document.querySelector('.pag-btn-next')
const firstPage = document.querySelector('.pag-btn-first')
const lastPage = document.querySelector('.pag-btn-last')

function makeBtnDisabled(button) {
    button.classList.add('disabled')
    button.disabled = true
}
function makeBtnActive(button) {
    button.classList.remove('disabled')
    button.disabled = false
}
function makeNextBtnsDisabled() {
    makeBtnDisabled(lastPage)
    makeBtnDisabled(nextSlide)
    makeBtnActive(firstPage)
    makeBtnActive(prevSlide)
}
function makePreviousBtnsDisabled() {
    makeBtnDisabled(firstPage)
    makeBtnDisabled(prevSlide)
    makeBtnActive(lastPage)
    makeBtnActive(nextSlide)
}
function makePreviousBtnsActive(){
    makeBtnActive(prevSlide)
    makeBtnActive(firstPage)
}
function makeNextBtnsActive(){
    makeBtnActive(nextSlide)
    makeBtnActive(lastPage)
}


