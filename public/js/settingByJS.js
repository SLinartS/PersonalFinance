let body = document.querySelector("body")
body.ondragstart = function() {
    return false;
}
body.ondrop = function() {
    return false;
}
