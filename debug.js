function debugGrid(){
    let cells = document.querySelectorAll('td');
    for (let x of cells) {
        if (x.onclick != null)
            x.style.border = '2px solid green';
        else
            x.style.border = '2px solid red';
    }
    return "NEON-DEBUG: Debug view of the grid enabled";
}