//#region -- //! SLIDER

let header = document.getElementsByTagName('header')[0];
let slider = document.getElementById('slider');
let button_container = document.getElementById('button_container');
let slide_list = document.getElementsByClassName('slide');

let sliderValue = 0;
let sliderWidthValue = 0;

button_container.children[0].addEventListener('click', function () {
    if (sliderValue == 0) {
        sliderValue = 2;
        sliderWidthValue = -slide_list[0].offsetWidth * 2;

    } else {
        sliderWidthValue += slide_list[0].offsetWidth;
        sliderValue -= 1
    }
    slider.style.transform = `translateX(${sliderWidthValue}px)`;
});

button_container.children[1].addEventListener('click', function () {
    if (sliderValue == 2) {
        sliderValue = 0;
        sliderWidthValue = 0;
    } else {
        sliderWidthValue -= slide_list[0].offsetWidth;
        sliderValue += 1
    }
    slider.style.transform = `translateX(${sliderWidthValue}px)`;
});

//#endregion

//#region -- //! FETCH FOR CARDS

let editors_pick_cards = document.getElementsByClassName('e_card');

fetch('http://127.0.0.1:8000/api/editorspicks/')
    .then(res => res.json())
    .then(data => {
        console.log(editors_pick_cards[0].children);
        console.log(data);
        for (let i = 0; i < editors_pick_cards.length; i++) {
            if (i < data.length) {
                if (typeof (data[i].tag) == "string") {
                    const tag = document.createElement('div');
                    tag.className = 'tag entertainment';
                    tag.innerText = data[0].tag
                    editors_pick_cards[i].children[2].appendChild(tag);
                } else {
                    for (let k = 0; k < data[i].tag.length; k++) {
                        const tag = document.createElement('div');
                        tag[k].className = 'tag entertainment';
                        tag[k].innerText = data[i].tag[k];
                        editors_pick_cards[i].children[2].appendChild(tag[k])
                    }
                }
                editors_pick_cards[i].children[3].innerText = data[i].title
                editors_pick_cards[i].children[4].innerText = data[i].description
            }
        }
    })
//#endregion
