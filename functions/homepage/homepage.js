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

let card_play_buttons = document.getElementsByClassName('play_button');
let about_tag_list = document.getElementsByClassName('about_tag');

for (let i = 0; i < card_play_buttons.length; i++) {
    card_play_buttons[i].addEventListener('click', function (e) {

        if (e.target.className.includes('fa-circle-play')) {
            e.target.className = "play_button fa-solid fa-circle-pause";
            e.target.parentNode.children[0].play();

            for (let j = 0; j < card_play_buttons.length; j++) {
                if (i != j) {
                    card_play_buttons[j].className = "play_button fa-solid fa-circle-play";
                    card_play_buttons[j].parentNode.children[0].pause();
                }
            }
        }

        else {
            e.target.className = "play_button fa-solid fa-circle-play";
            e.target.parentNode.children[0].pause();

            for (let j = 0; j < card_play_buttons.length; j++) {
                if (i != j) {
                    card_play_buttons[j].className = "play_button fa-solid fa-circle-pause";
                }
            }
        }
    });
}