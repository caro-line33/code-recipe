const container = document.getElementById('container');
const sortbutton = document.getElementById('SortButton');
const speedbar = document.getElementById('speedbar');
let speedDivisor = speedbar.value;
const reset = document.getElementById('reset');
const options = document.getElementById('SortingOptions');
let freshArray = false;

reset.addEventListener('click', reset => {
    container.innerHTML = '';
    randomArray = generateRandomArray(10, 100);
    renderArray(randomArray);
    freshArray = true;
})

options.addEventListener('change', updateSortingMethod => {
  container.innerHTML = '';
    let randomArray = generateRandomArray(10, 100);
    renderArray(randomArray);
  reset.disabled=false;
  sortbutton.disabled=false;
    console.log(options.value);})

speedbar.addEventListener('change', updateSpeed => {
    speedDivisor = speedbar.value;
    console.log(speedDivisor);})

const randomArray = generateRandomArray(10, 100);
console.log("Initial Array:", randomArray);
renderArray(randomArray);

const sortingAlgorithms = {
    BubbleSort: BubbleSort,
    SelectionSort: SelectionSort,
    InsertionSort: InsertionSort,
}

function generateRandomArray(length, max) {
    const arr = [];
    for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * max);
    arr.push(randomNum);
    }
    return arr;
}

function renderArray(array) {
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const arrayElement = document.createElement('span');
        arrayElement.textContent = array[i];
        arrayElement.id = `element${i}`;
        container.appendChild(arrayElement);
    }
}


function renderFinishedArray(array) {
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const arrayElement = document.createElement('span');
        arrayElement.textContent = array[i];
        arrayElement.id = `element${i}`;
        arrayElement.className = 'done';
        container.appendChild(arrayElement);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function BubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            renderArray(array);
            if (i > 0) {
                for (let k = n - i; k < n; k++) {
                  let el = document.getElementById(`element${k}`);
                  if (el) {
                    el.classList.add('done');
                  }
                }
              }
            let el1 = document.getElementById(`element${j}`);
            let el2 = document.getElementById(`element${j + 1}`);
            if (array[j] > array[j + 1]) {
                el1.style.backgroundColor = 'tomato';
                el2.style.backgroundColor  = 'tomato';
                await wait(500/speedDivisor);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                renderArray(array);
                if (i > 0) {
                    for (let k = n - i; k < n; k++) {
                      let el = document.getElementById(`element${k}`);
                      if (el) {
                        el.classList.add('done');
                      }
                    }
                  }
                el1 = document.getElementById(`element${j}`);
                el2 = document.getElementById(`element${j + 1}`);
                el1.style.backgroundColor = 'palegreen';
                el2.style.backgroundColor = 'palegreen';
                await wait(500/speedDivisor);
            } else {
            el1.style.backgroundColor = 'palegreen';
            el2.style.backgroundColor = 'palegreen';
            await wait(1000/speedDivisor);
            }
        }

    if (!swapped) break;
    }
    renderFinishedArray(array)
    return array;
    sortbutton.disabled=false;
}

async function SelectionSort(array) {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    renderArray(array);
    for (let k = 0; k < i; k++) {
      let doneEl = document.getElementById(`element${k}`);
      doneEl.className = 'done';
    }

    let firstEl = document.getElementById(`element${i}`);
    firstEl.style.backgroundColor = 'orange';
    await wait(1000 / speedDivisor);

    for (let j = i + 1; j < n; j++) {
      let testEl = document.getElementById(`element${j}`);
      testEl.style.backgroundColor = 'orange';
      await wait(500 / speedDivisor);

      if (array[j] < array[min]) {
        min = j;
        testEl.style.backgroundColor = 'gold';
        await wait(1000 / speedDivisor);
      }
      testEl.style.backgroundColor = '';
      
    }

    if (min !== i) {
      firstEl.style.backgroundColor = 'palegreen';
      let minEl = document.getElementById(`element${min}`);
      minEl.style.backgroundColor = 'palegreen';
      await wait(1000 / speedDivisor);
      [array[i], array[min]] = [array[min], array[i]];

      renderArray(array);

      let newFirstEl = document.getElementById(`element${i}`);
      let newMinEl   = document.getElementById(`element${min}`);

      for (let k = 0; k < i; k++) {
        let doneEl = document.getElementById(`element${k}`);
        doneEl.className = 'done';
      }

      newFirstEl.style.backgroundColor = 'palegreen';
      newMinEl.style.backgroundColor   = 'palegreen';
      await wait(1000 / speedDivisor);

    }

  }
  renderFinishedArray(array);
  return array;
}


async function InsertionSort(array) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    renderArray(array);    
    // Possibly mark [0..i-1] as done
    for (let k = 0; k < i; k++) {
      document.getElementById(`element${k}`).className = 'done';
    }
    
    let current = array[i];
    let j = i - 1;

    // Highlight the element we're about to insert
    let currentEl = document.getElementById(`element${i}`);
    currentEl.style.backgroundColor = 'orange';
    await wait(500 / speedDivisor);

    // Move left while elements are bigger than `current`
    while (j >= 0 && array[j] > current) {
      // Highlight the comparison
      let prevEl = document.getElementById(`element${j}`);
      prevEl.style.backgroundColor = 'khaki';
      await wait(300 / speedDivisor);

      // Shift array[j] one step right
      array[j + 1] = array[j];

      // Rerender and re-highlight
      renderArray(array);
      prevEl = document.getElementById(`element${j}`);       // re-fetch after rerender
      let shiftEl = document.getElementById(`element${j+1}`);
      shiftEl.style.backgroundColor = 'palegreen';           // show the shifted item
      await wait(300 / speedDivisor);

      // Clean up highlights if desired
      prevEl.style.backgroundColor = '';
      shiftEl.style.backgroundColor = '';

      j--;
    }

    // Now place `current` into its correct spot
    array[j + 1] = current;

    // Rerender to show final insertion
    renderArray(array);
    let insertedEl = document.getElementById(`element${j+1}`);
    insertedEl.style.backgroundColor = 'palegreen';
    await wait(500 / speedDivisor);

    // Clear highlight or mark as done
    insertedEl.style.backgroundColor = '';
  }

  // Final call
  renderArray(array);
  for (let k = 0; k < n; k++) {
    document.getElementById(`element${k}`).className = 'done';
  }

  return array;
}


async function MergeSort(array){

}
sortbutton.addEventListener('click', async () => {
  sortbutton.disabled=true;
  reset.disabled = true;
  options.disabled = true;
  if (freshArray === false){
    container.innerHTML = '';
    randomArray = generateRandomArray(10, 100);
    renderArray(randomArray);    
  }
  const chosenAlgorithm = options.value;
  const sortFunction = sortingAlgorithms[chosenAlgorithm];
  await sortFunction(randomArray);
  freshArray = false;
  console.log("Final sorted array:", randomArray);
  sortbutton.disabled=false;
  reset.disabled = false;
  options.disabled = false;
});

