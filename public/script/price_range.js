let rangeMin = 0;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = Math.max(parseInt(rangeInput[0].value), rangeMin);
      let maxRange = Math.min(parseInt(rangeInput[1].value), rangeInput[1].max);
      if (maxRange - minRange < rangeMin) {     
        if (e.target.className === "min") {
          rangeInput[0].value = Math.max(maxRange - rangeMin, rangeMin);        
        } else {
          rangeInput[1].value = Math.min(minRange + rangeMin, rangeInput[1].max);        
        }
      } else {
        rangePrice[0].value = minRange;
        rangePrice[1].value = maxRange;
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = Math.max(parseInt(rangePrice[0].value), rangeMin);
      let maxPrice = Math.min(parseInt(rangePrice[1].value), rangeInput[1].max);
      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
        if (e.target.name === "min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });   