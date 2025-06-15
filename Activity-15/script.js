<script>
// Generate a random hex color with padding
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Change background color and adjust text contrast
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('changeColorButton');

  if (button) {
    button.addEventListener('click', function () {
      const color = getRandomColor();
      document.body.style.backgroundColor = color;

      // Optional: Adjust text color for contrast
      const isDark = parseInt(color.slice(1), 16) < 0x888888;
      document.body.style.color = isDark ? '#ffffff' : '#000000';
    });
  }
});
</script>
