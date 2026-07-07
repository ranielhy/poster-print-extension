(() => {
    if (!chrome?.runtime?.id) {
        return;
    }

    console.debug("Poster Print: content script carregado.");
})();