//#region --  //! FOR SEARCH BAR

let search_cont = document.getElementsByClassName('search_cont')[0];
let search_input = document.getElementsByClassName('search_input')[0];
let search_button = document.getElementById('search_button');
let toggle = true;

search_button.addEventListener('click', function () {
    if (toggle) {
        search_input.className += ' active_search_input';
        search_cont.className += ' active_search_cont';
        toggle = !toggle;
    } else {
        if (search_input.value == "") {
            search_input.className = 'search_input';
            search_cont.className = 'search_cont';
            toggle = !toggle;
        } else {
        }
    }
});

//#endregion

//#region //! FOR SEARCH WORDS

const bodyContent = document.body; // Arama yapılacak alan


//#endregion