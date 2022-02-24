const submitButton = document.getElementById('submitbutton');
const colorSeed = document.getElementById('selectedcolor');
const selectedOption = document.getElementById('coloroptions');
const colorBoxContainer = document.getElementById('colorcontainer');

const getThemes = () => {
  const chosenColor = colorSeed.value;
  const chosenOption = selectedOption.value;
  
  
  console.log('Color Seed: ' + chosenColor);
  console.log('Selected Option: ' + chosenOption);

  fetch (`https://www.thecolorapi.com/scheme?hex=${chosenColor.slice(1,7)}&mode=${chosenOption}&count=5`)
    .then(response => response.json())
    .then(data => {
      
        colorBoxContainer.innerHTML = '';
        console.log(data);
        data.colors.forEach((color, index) => {
          colorBoxContainer.innerHTML += `<div class="box box${index}" style="background-color: ${color.hex.value}"><span class="colorval">${color.hex.value}</span><span class="copiedtxt">Copied to Clipboard!!</span></div>`;
        });
    });
}

submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Fetch Color Scheme
  getThemes();

  //Short delay for the fetch to complete
  setTimeout(() => {
    copyColor()
  }, 2000);
});

const copyColor = () => {
  document.querySelectorAll('.box').forEach(color => {
    color.addEventListener('click', function(event) {
      event.preventDefault();
      const copiedPlaceholder = this.querySelector('.copiedtxt');
      const copiedVal = this.querySelector('.colorval').textContent;

      console.log(copiedVal);
      //Copy to Clipboard
      navigator.clipboard.writeText(copiedVal);
      copiedPlaceholder.classList.add('show');
      
      //Show copied text for a short time
      setTimeout(() => {
        copiedPlaceholder.classList.remove('show');
      }, 700);
    });
  });
}

/* Handle Default Coolor Copy, 
there should be an easier solution but I couldn't work it out
*/
function copyColorDefault (id) {
  const copiedPlaceholder = document.getElementById(id).querySelector('.copiedtxt');
  const copiedVal = document.getElementById(id).querySelector('.colorval').textContent;
  console.log(copiedVal);
  navigator.clipboard.writeText(copiedVal);
  copiedPlaceholder.classList.add('show');
  setTimeout(() => {
    copiedPlaceholder.classList.remove('show');
  }, 700);
}