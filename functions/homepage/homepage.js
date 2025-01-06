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

//#region -- //! FOR LENGTH LIMIT
let t_descs_for_limit = document.getElementsByClassName('t_desc');
let maxLength = 800

function lengthLimit(whichValue) {
    for (let i = 0; i < whichValue.length; i++) {
        realValue = whichValue[i].innerText;
        if (whichValue[i].innerText.length > maxLength) {
            prev_value = "";
            for (let j = 0; j < maxLength; j++) {
                prev_value += whichValue[i].innerText[j];
            }
            whichValue[i].innerHTML = `${prev_value} <span style="cursor:pointer" class="t_dect_dots">...</span>`;
            localStorage.setItem('refix', true);
        }
    }
    return realValue;
}

lengthLimit(t_descs_for_limit);

//#endregion

//#region -- //! FETCH FOR ECARDS

let editors_pick_cards = document.getElementsByClassName('e_card');
let e_views_counts = document.getElementsByClassName('e_views_count');

fetch('http://127.0.0.1:8000/api/ecards/')
    .then(res => res.json())
    .then(data => {
        try {
            for (let i = 0; i < editors_pick_cards.length; i++) {
                const tag_list = data[i].e_tag;
                if (i < data.length) {
                    if (editors_pick_cards[i] != undefined) {
                        for (let k = 0; k < tag_list.length; k++) {
                            const tag = document.createElement('div');
                            tag.className = `tag ${tag_list[k].toLowerCase()}`;
                            tag.innerText = tag_list[k];
                            editors_pick_cards[i].children[2].appendChild(tag);
                        }
                        editors_pick_cards[i].children[3].innerText = data[i].e_title;
                        editors_pick_cards[i].children[4].innerText = data[i].e_desc;
                        e_views_counts[i].innerText = data[i].e_views_count;
                    }
                }
            }
        }
        catch {
            console.error("API ERROR");
        }
    });

//#endregion

//#region -- //! FETCH FOR TCARDS

let weeks_hottest_cards = document.getElementsByClassName('t_card');
let t_views_counts = document.getElementsByClassName('t_views_count');
let t_card_tags = document.getElementsByClassName('t_card_tag');
let t_titles = document.getElementsByClassName('t_title');
let t_descs = document.getElementsByClassName('t_desc');
let t_card_imgs = document.getElementsByClassName('t_card_img');


fetch('http://127.0.0.1:8000/api/tcards/')
    .then(res => res.json())
    .then(data => {
        try {
            for (let i = 0; i < weeks_hottest_cards.length; i++) {
                const tag_list = data[i].t_tag;
                const t_urls = data[i].url;

                if (i < data.length) {
                    if (weeks_hottest_cards[i] != undefined) {
                        for (let k = 0; k < tag_list.length; k++) {
                            const tag = document.createElement('div');
                            tag.className = `tag ${tag_list[k].toLowerCase() == "food & drinks" ? "food_drinks" : tag_list[k].toLowerCase()}`;
                            tag.innerText = tag_list[k];
                            t_card_tags[i].appendChild(tag);
                        }
                        t_titles[i].innerText = data[i].t_title;
                        t_descs[i].innerText = data[i].t_desc;
                        t_views_counts[i].innerText = data[i].t_views_count;
                        t_card_imgs[i].style.backgroundImage = `url(${t_urls})`;
                    }
                }
            }
        }
        catch {
            console.error("API ERROR");
        }
    });


//#endregion

//#region -- //! FOR CARDS
let e_cards = document.getElementsByClassName('e_card');
let e_cards_video = document.getElementsByClassName('e_card_video');
let play_buttons = document.getElementsByClassName('play_button');

for (let i = 0; i < e_cards.length; i++) {
    e_cards[i].style.height = `${e_cards_video[0].clientHeight}px`;
}

for (let i = 0; i < play_buttons.length; i++) {
    e_cards_video[i].addEventListener('ended', () => {
        e_cards_video[i].play();
        const fetchAndUpdateViews = async (cardId) => {
            const getUrl = `http://127.0.0.1:8000/api/ecards/${cardId}/`;
            const patchUrl = `http://127.0.0.1:8000/api/ecards/${cardId}/`;

            try {
                const getResponse = await fetch(getUrl);
                const cardData = await getResponse.json();

                if (getResponse.ok) {
                    const currentViewsCount = cardData.e_views_count;
                    const updatedViewsCount = currentViewsCount + 1;

                    const data = { e_views_count: updatedViewsCount };

                    const patchResponse = await fetch(patchUrl, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    const patchResult = await patchResponse.json();
                    if (patchResponse.ok) {
                        console.log('Card updated successfully:', patchResult); //! Bu silinecek
                        e_views_counts[i].innerText = updatedViewsCount;
                    } else {
                        console.error('Error updating card:', patchResult);
                    }
                } else {
                    console.error('Error fetching card data:', cardData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchAndUpdateViews(i + 1);
    });
}

//#endregion
