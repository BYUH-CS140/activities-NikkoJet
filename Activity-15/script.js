document.getElementById('changeColorButton').addEventListener('click', function() {
    document.body.style.backgroundImage = "none"; // remove the background image
    document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  });
  