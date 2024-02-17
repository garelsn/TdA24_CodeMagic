function myFunction(){
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var output = document.getElementById("output");

    if(a.checked && b.checked){
        output.innerHTML=a.value +", "+ b.value;
    }
    else if(a.checked){
        output.innerHTML=a.value;
    }
    else if(b.checked){
        output.innerHTML=b.value;
    }
    else{
        output.innerHTML="Nic jsi nevybral";
    }
}



// async function loadData() {
//     try {
//       const response = await fetch('URL_API');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Chyba při načítání dat:', error);
//     }
//   }
  

// async function createCheckboxes() {
//     const items = await loadData();
//     const checkboxesContainer = document.querySelector('.checkboxes-container');
  
//     items.forEach(item => {
//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.className = 'myCheckbox';
//       checkbox.value = item.id;
//       checkbox.textContent = item.name;
//       checkboxesContainer.appendChild(checkbox);
  
//       const label = document.createElement('label');
//       label.textContent = item.name;
//       checkboxesContainer.appendChild(label);
  
//       checkboxesContainer.appendChild(document.createElement('br'));
//     });
//   }

//   document.addEventListener('change', async function(event) {
//     if (event.target.classList.contains('myCheckbox')) {
//       const checkedCheckboxes = document.querySelectorAll('.myCheckbox:checked');
//       const selectedIds = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
  
//       try {
//         const response = await fetch(`URL_API?id=${selectedIds.join(',')}`);
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Chyba při načítání dat:', error);
//       }
//     }
//   });
  
  createCheckboxes();