// DOM ELEMENTS
const expenseForm = document.getElementById("expenseForm");
const expenseContainer = document.getElementById("expenses");
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const searchInput = document.getElementById("search");
const searchByInput = document.getElementById("searchBy");
const sortBy = document.getElementById("sortBy");
const sortOrder = document.getElementById("sortOrder");

const totalSpendingDisplay = document.getElementById("totalSpending");
const monthlySpendingDisplay = document.getElementById("monthlySpending");
const dashboardCategory = document.getElementById("dashboardCategory");
const categorySpendingDisplay = document.getElementById("categorySpending");
// DATA 
const expenses = [];

function updateDashboard() {
    const totalSpending = totalSumCalculation();
    totalSpendingDisplay.textContent = `₹${totalSpending}`;

    const monthlyTotals = monthlySumCalculation();
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    const monthlySpending = monthlyTotals[currentMonth] ?? 0;
    monthlySpendingDisplay.textContent = `₹${monthlySpending}`;

    const categoryTotals = categorySumCalculation();
    const selectedCategory = dashboardCategory.value;
    const categorySpending = categoryTotals[selectedCategory] ?? 0;
    categorySpendingDisplay.textContent = `₹${categorySpending}`;
}

dashboardCategory.addEventListener("change", () => {
    updateDashboard();
});

// EVENT LISTENERS
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const expense = createExpense();
    expenses.push(expense);
    renderExpense(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateDashboard();
});

const savedExpenses = localStorage.getItem("expenses");

if (savedExpenses) {
    const parsedExpenses = JSON.parse(savedExpenses);

    expenses.push(...parsedExpenses);

    parsedExpenses.forEach((expense) => {
        renderExpense(expense);
    });
}
updateDashboard();

// CREATE
function createExpense() {
    const expense = {
        id: crypto.randomUUID(),
        title: title.value,
        category: category.value,
        amount: amount.valueAsNumber,
        date: date.value
    };
    return expense;
}

// READ
function read(targetId) {
    let foundExpense = expenses.find(function (eachExpense) {
        return (targetId === eachExpense.id);
    });
    return foundExpense;
}

// UPDATE / EDIT
function edit(targetId, data, newValue) {
    const editExpense = read(targetId);
    editExpense[data] = newValue;
    return editExpense;
}

// DELETE
function del(targetId) {
    const indexToDelete = expenses.findIndex(function (eachExpense) {
        return (targetId === eachExpense.id);
    });
    if (indexToDelete === -1) {
        return;
    }
    expenses.splice(indexToDelete, 1);
}

function addCategoryOptions(select, value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.append(option);
}


sortOrder.addEventListener("change",()=>{
    
    const sorted = sortExpense(sortBy.value, sortOrder.value);
    renderExpenses(sorted);
})

sortBy.addEventListener("change",()=>{
    sortOrder.replaceChildren();
    if(sortBy.value === "Amount"){
        addCategoryOptions(sortOrder, "Low to High", "Low to High");
        addCategoryOptions(sortOrder, "High to Low", "High to Low");
    }
    else if(sortBy.value === "Date"){
        addCategoryOptions(sortOrder, "Old to New", "Old to New");
        addCategoryOptions(sortOrder, "New to Old", "New to Old");
    }
 })
    
// RENDER
function renderExpense(expense) {
    const expenseDiv = document.createElement("div");

    const expenseDivTitle = document.createElement("div");
    expenseDivTitle.classList.add("title");
    expenseDivTitle.textContent = expense.title;
    expenseDiv.append(expenseDivTitle);

    const expenseDivCategory = document.createElement("div");
    expenseDivCategory.classList.add("category");
    expenseDivCategory.textContent = expense.category;
    expenseDiv.append(expenseDivCategory);

    const expenseDivAmount = document.createElement("div");
    expenseDivAmount.classList.add("amount");
    expenseDivAmount.textContent = expense.amount;
    expenseDiv.append(expenseDivAmount);

    const expenseDivDate = document.createElement("div");
    expenseDivDate.classList.add("date");
    expenseDivDate.textContent = expense.date;
    expenseDiv.append(expenseDivDate);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.dataset.expenseId = expense.id;
    expenseDiv.append(editBtn);

    editBtn.addEventListener("click", () => {
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = expense.title;
        expenseDivTitle.replaceWith(titleInput);

        const amountInput = document.createElement("input");
        amountInput.type = "number";
        amountInput.value = expense.amount;
        expenseDivAmount.replaceWith(amountInput);

        const categorySelect = document.createElement("select");
        addCategoryOptions(categorySelect, "food", "Food");
        addCategoryOptions(categorySelect, "electronics", "Electronics");
        addCategoryOptions(categorySelect, "transport", "Transport");
        addCategoryOptions(categorySelect, "beauty", "Beauty");
        addCategoryOptions(categorySelect, "healthcare", "Healthcare");
        addCategoryOptions(categorySelect, "education", "Education");
        addCategoryOptions(categorySelect, "gift", "Gift");
        addCategoryOptions(categorySelect, "clothing", "Clothing");
        categorySelect.value = expense.category;
        expenseDivCategory.replaceWith(categorySelect);

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = expense.date;
        expenseDivDate.replaceWith(dateInput);

        const targetId = editBtn.dataset.expenseId;

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";

        editBtn.replaceWith(saveBtn, cancelBtn);

        saveBtn.addEventListener("click", () => {
            const newTitle = titleInput.value;
            const newCategory = categorySelect.value;
            const newAmount = amountInput.valueAsNumber;
            const newDate = dateInput.value;

            edit(targetId, "title", newTitle);
            edit(targetId, "category", newCategory);
            edit(targetId, "amount", newAmount);
            edit(targetId, "date", newDate);

            localStorage.setItem("expenses", JSON.stringify(expenses));
            updateDashboard();

            expenseDivTitle.textContent = newTitle;
            titleInput.replaceWith(expenseDivTitle);

            expenseDivCategory.textContent = newCategory;
            categorySelect.replaceWith(expenseDivCategory);

            expenseDivAmount.textContent = newAmount;
            amountInput.replaceWith(expenseDivAmount);

            expenseDivDate.textContent = newDate;
            dateInput.replaceWith(expenseDivDate);

            saveBtn.replaceWith(editBtn);
            cancelBtn.remove();
        });

        cancelBtn.addEventListener("click", () => {
            titleInput.replaceWith(expenseDivTitle);
            categorySelect.replaceWith(expenseDivCategory);
            amountInput.replaceWith(expenseDivAmount);
            dateInput.replaceWith(expenseDivDate);

            saveBtn.replaceWith(editBtn);
            cancelBtn.remove(); 
        });
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.dataset.expenseId = expense.id;
    expenseDiv.append(delBtn);

    delBtn.addEventListener("click", () => {
        del(expense.id);
        expenseDiv.remove();
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateDashboard();
    });

    
    expenseContainer.append(expenseDiv);
}

//Calculation
function totalSumCalculation() {

    const totalSum = expenses.reduce((accumulator, currentExpense) => {
        return accumulator + currentExpense.amount;
    }, 0)
    return totalSum;
}

function categorySumCalculation() {

    const categorySum = expenses.reduce((accumulator, currentExpense) => {
        return accumulator[currentExpense.category] = (accumulator[currentExpense.category] ?? 0) + currentExpense.amount;
    }, {})
    return categorySum;
}

function monthlySumCalculation() {

    const monthlySum = expenses.reduce((accumulator, currentExpense) => {
        const month = currentExpense.date.slice(0, 7);
        return accumulator[month] = (accumulator[month] ?? 0) + currentExpense.amount;
    }, {})
    return monthlySum;
}
function dailySumCalculation() {

    const dailySum = expenses.reduce((accumulator, currentExpense) => {
        const day = currentExpense.date;
        return accumulator[day] = (accumulator[day] ?? 0) + currentExpense.amount;
    }, {})
    return dailySum;
}

function searchExpense(searchTerm, searchBy) {
    const results = expenses.filter((currentExpense) => {

        return currentExpense[searchBy].toLowerCase().includes(searchTerm.toLowerCase());

    })
    return results;
}

function renderExpenses(expenseToRender) {

    expenseContainer.replaceChildren();

    expenseToRender.forEach((eachExpense) => {
        renderExpense(eachExpense)
    });
}

searchInput.addEventListener("input", () => {

    const searchTerm = searchInput.value;
    const searchBy = searchByInput.value;

    const search = searchExpense(searchTerm, searchBy);
    renderExpenses(search)

})

searchByInput.addEventListener("change", () => {

    const searchTerm = searchInput.value;
    const searchBy = searchByInput.value;

    const search = searchExpense(searchTerm, searchBy);
    renderExpenses(search)

})

function filterExpense(filterBy, filterValue) {
    if (filterBy === "Category") {
        const filter = expenses.filter((currentExpense) => {
            return (filterValue === currentExpense.category);
        });
        return filter;
    }
    else if (filterBy === "Amount") {
        const filter = expenses.filter((currentExpense) => {
            return (
                (!filterValue.min || currentExpense.amount >= filterValue.min) &&
                (!filterValue.max || currentExpense.amount <= filterValue.max)
            );
        });
        return filter;
    }
    else if (filterBy === "Period") {
        const range = getDateRange(
            filterValue.periodType,
            filterValue.customStart,
            filterValue.customEnd
        );
        return period(range.startDate, range.endDate);
    }
}

function period(startDate, endDate) {
    const dates = expenses.filter((currentExpense) => {
        return (
            startDate <= currentExpense.date &&
            endDate >= currentExpense.date)
    })
    return dates;
}

function getDateRange(periodType, customStart, customEnd) {
    const today = new Date();

    if (periodType === "Daily") {
        return {
            startDate: formatDate(today),
            endDate: formatDate(today)
        };
    }

    else if (periodType === "Weekly") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - ((today.getDay() + 6) % 7));

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return {
            startDate: formatDate(weekStart),
            endDate: formatDate(weekEnd)
        };
    }

    else if (periodType === "Monthly") {
        const monthStart = new Date(today);
        monthStart.setDate(1);

        const monthEnd = new Date(today);
        monthEnd.setMonth(today.getMonth() + 1);
        monthEnd.setDate(0);

        return {
            startDate: formatDate(monthStart),
            endDate: formatDate(monthEnd)
        };
    }

    else if (periodType === "Yearly") {
        const yearStart = new Date(today);
        yearStart.setMonth(0);
        yearStart.setDate(1);

        const yearEnd = new Date(today);
        yearEnd.setFullYear(today.getFullYear() + 1);
        yearEnd.setMonth(0);
        yearEnd.setDate(0);

        return {
            startDate: formatDate(yearStart),
            endDate: formatDate(yearEnd)
        };
    }

    else if (periodType === "Custom") {
        return {
            startDate: formatDate(new Date(customStart)),
            endDate: formatDate(new Date(customEnd))
        };
    }
}

function formatDate(date) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

   return `${year}-${month}-${day}`;
   
}

function sortExpense(sortBy, sortOrder){
    const sortedExpense = [...expenses];
    sortedExpense.sort((expenseA, expenseB)=>{
        if(sortBy === "Amount"){            
            if(sortOrder === "Low to High"){
                return expenseA.amount-expenseB.amount;                
            }
            if(sortOrder=== "High to Low"){
                return expenseB.amount-expenseA.amount;
            }
        }

        else if(sortBy === "Date"){
            if(sortOrder === "Old to New"){
                return expenseA.date.localeCompare(expenseB.date);
            }
            else{
                return expenseB.date.localeCompare(expenseA.date);
            }    
        }
        });
        return sortedExpense;
}

 