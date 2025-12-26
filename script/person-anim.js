fetch('images/person.svg')
    .then(response => response.text())
    .then(svg => {
        document.getElementById('svgContainer').innerHTML = svg;
    });