function start() {
    let cards = Array.from(document.getElementsByClassName('list-card-details'));
    cards.forEach(element => modify(element));

    const links = Array.from(document.getElementsByClassName('card-title-hyperlink'));
    links.forEach(link => link.addEventListener('click', listener, false));
}

function modify(element) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    const text = element.innerText || element.textContent;

    const matches = text.match(regex) || Array();
    matches.forEach(match => replace(element, match));
}

function replace(element, match) {
    const linked = `<span class="card-title-hyperlink">${match}</span>`
    const inner = element.innerHTML.replace(match, linked);
    element.innerHTML = inner;
}

function listener(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = event.target.innerText;
    return false;
}

function refresh(mutation) {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        const card = Array.from(mutation.addedNodes).some(element => element.classList.contains('list-card'));
        if (card) {
            start();
        }
    } else if (mutation.target.tagName == 'P') {
        start();
    }
}

const observer = new MutationObserver(mutations => mutations.forEach(mutation => refresh(mutation)));
observer.observe(document.body, { attributes: true, childList: true, characterData: true, subtree: true });