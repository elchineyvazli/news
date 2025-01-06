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

const bodyContent = document.body;

if (localStorage.getItem('searchBox')) {
    const infoPanel = document.querySelector("#search_info");
    const infoText = document.querySelector("#info_text");
    const upButton = document.querySelector("#up_btn");
    const downButton = document.querySelector("#down_btn");
}

let currentIndex = 0;
let highlights = [];

function removeHighlights(element) {
    const highlighted = element.querySelectorAll("mark");
    highlighted.forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
    highlights = [];
    infoPanel.style.display = "none";
}

search_button.addEventListener("click", function () {
    const query = search_input.value.toLowerCase().trim();
    removeHighlights(bodyContent);
    highlights = [];
    currentIndex = 0;

    if (query) {
        highlightMatches(bodyContent, query);
        if (highlights.length > 0) {
            currentIndex = 0;
            updateInfoPanel();
            scrollToHighlight();
        } else {
            infoPanel.style.display = "none";
        }
    }
});

if (localStorage.setItem('searchBox', true)) {
    upButton.addEventListener("click", function () {
        if (highlights.length > 0) {
            currentIndex = (currentIndex - 1 + highlights.length) % highlights.length;
            scrollToHighlight();
            updateInfoPanel();
        }
    });

    downButton.addEventListener("click", function () {
        if (highlights.length > 0) {
            currentIndex = (currentIndex + 1) % highlights.length;
            scrollToHighlight();
            updateInfoPanel();
        }
    });
}


function highlightMatches(element, query) {
    if (element.nodeType === 3) {
        const text = element.textContent;
        const regex = new RegExp(query, "gi");

        let match;
        let lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
            const span = document.createElement("mark");
            span.textContent = match[0];

            const before = document.createTextNode(text.substring(lastIndex, match.index));
            const after = document.createTextNode(text.substring(match.index + match[0].length));

            const parent = element.parentNode;
            parent.replaceChild(after, element);
            parent.insertBefore(span, after);
            parent.insertBefore(before, span);

            highlights.push(span);
            lastIndex = match.index + match[0].length;
        }
    } else if (element.nodeType === 1 && element.childNodes) {
        element.childNodes.forEach((child) => highlightMatches(child, query));
    }
}

function scrollToHighlight() {
    if (highlights[currentIndex]) {
        highlights[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
        highlights.forEach((mark) => mark.classList.remove("current"));
        highlights[currentIndex].classList.add("current");
    }
}

function updateInfoPanel() {
    infoPanel.style.display = "block";
    infoText.textContent = `Result: ${currentIndex + 1}/${highlights.length}`;
}

//#endregion