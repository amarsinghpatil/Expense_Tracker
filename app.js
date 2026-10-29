

// Form and Inputs
const entryForm = document.getElementById("entry-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const cancelBtn = document.getElementById("cancel-btn");

// Display Containers
const entriesList = document.getElementById("entries-list");
const noEntriesMessage = document.getElementById("no-entries");

// Summary Cards
const netBalanceEl = document.getElementById("net-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");

// Filter Radio Buttons
const filterAll = document.getElementById("all-filter");
const filterIncome = document.getElementById("income-filter");
const filterExpense = document.getElementById("expense-filter");


let entries = JSON.parse(localStorage.getItem("entries")) || [];

let editid = null;

let currentFilter = 'all';

filterAll.addEventListener("change", function () {
  currentFilter = "all";
  renderEntries();
});

filterIncome.addEventListener("change", function () {
  currentFilter = "income";
  renderEntries();
});

filterExpense.addEventListener("change", function () {
  currentFilter = "expense";
  renderEntries();
});

entryForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 🛑 Stop the browser from refreshing the page!

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if(description === "" || isNaN(amount) || amount <=0 || type === ""){
    alert("Please enter all the fields correctly!");
    return;
  }

  if(editid !== null){
// update mode
    const exitingentries = entries.find(entry=> entry.id === editid);

    if(exitingentries){
      exitingentries.description = description;
      exitingentries.amount = amount;
      exitingentries.type = type;
      
    }

    editid = null;
    document.getElementById('submit-btn').innerText = 'Add Entry';
  
  }else { 
  const newEntry = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  entries.push(newEntry);

}

  localStorage.setItem("entries", JSON.stringify(entries));
  entryForm.reset()
  renderEntries(); 

  
});

cancelBtn.addEventListener("click", function(){
 entryForm.reset()
 editid = null;
 document.getElementById('submit-btn').innerText = 'Add Entry';

})

function renderEntries(){

  entriesList.innerHTML = '';

  // 1. FIRST: Create and populate filteredEntries
  let filteredEntries = [];

  if (currentFilter === "income") {
  // Go through every entry in our list
  entries.forEach(function (entry) {
    // If it's an income, put it into our basket!
    if (entry.type === "income") {
      filteredEntries.push(entry);
    }
  });
} else if (currentFilter === "expense") {
  entries.forEach(function (entry) {
    // If it's an expense, put it into our basket!
    if (entry.type === "expense") {
      filteredEntries.push(entry);
    }
  });
 
  } else { 
    filteredEntries = entries;
  }

  // 2. SECOND: Check if the filtered list is empty
  if (filteredEntries.length === 0) {
    noEntriesMessage.classList.remove("hidden");
    updateSummary();
    return;
  } else {
    noEntriesMessage.classList.add("hidden");

    // 3. THIRD: Loop through filteredEntries and render each item
    filteredEntries.forEach(entry => {
      const listItem = document.createElement("li");
      
          // 1. Check if Income or Expense
          const isIncome = entry.type === "income";
          const sign = isIncome ? "+" : "-";
          const colorClass = isIncome ? "text-emerald-600" : "text-rose-600";
          const borderClass = isIncome ? "border-l-emerald-500" : "border-l-rose-500";

          // 2. Style the row with Flexbox & border
          listItem.className = `flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 border-l-4 ${borderClass} rounded-lg shadow-xs`;

          // 3. Put left content (text) and right content (amount + Edit & Delete buttons)
          listItem.innerHTML = `

            <div>
              <h4 class="font-semibold text-slate-800">${entry.description}</h4>
              <span class="text-xs uppercase font-bold text-slate-400 tracking-wider">${entry.type}</span>
            </div>

            <div class="flex items-center gap-3">

              <span class="font-bold text-base ${colorClass}">
                ${sign}$${entry.amount.toFixed(2)}
              </span>

              <button class="text-slate-400 hover:text-indigo-600 p-1 transition cursor-pointer" onclick="editEntry(${entry.id})" title="Edit">
                ✏️
              </button>

              <button class="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer" onclick="deleteEntry(${entry.id})" title="Delete">
                🗑️
              </button>

            </div>
          `;

          entriesList.appendChild(listItem);
        });

    }
    updateSummary();
}

function updateSummary(){
  
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(entry => {

        if(entry.type === "income"){
        totalIncome +=entry.amount;
      }

      else if(entry.type === "expense"){
        totalExpense += entry.amount
    }
    
  })

  const netbalance = totalIncome - totalExpense;

//update the display element
totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;

  // Format Net Balance with minus sign first if negative (e.g. -$50.00 instead of $-50.00)
  if (netbalance < 0) {
    netBalanceEl.textContent = `-$${Math.abs(netbalance).toFixed(2)}`;
  } else {
    netBalanceEl.textContent = `$${netbalance.toFixed(2)}`;
  }

  // Color-code the Net Balance based on positive, negative or zero
  if (netbalance > 0) {
    netBalanceEl.className = 'text-2xl font-bold text-emerald-600';
  } else if (netbalance < 0) {
    netBalanceEl.className = 'text-2xl font-bold text-rose-600';
  } else {
    netBalanceEl.className = 'text-2xl font-bold text-blue-700';
  }
}

function deleteEntry(id){

    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
    updateSummary();
}

function editEntry(id){

  const item_to_edit = entries.find(entry => entry.id === id);

  if(item_to_edit){

   descriptionInput.value = item_to_edit.description;
   amountInput.value = item_to_edit.amount;
   typeSelect.value = item_to_edit.type;

   editid = id;

   document.getElementById("submit-btn").innerText='Update Entry'

  }
  
}

renderEntries();
updateSummary();

console.log(entries);
