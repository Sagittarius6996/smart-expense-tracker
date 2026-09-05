// DOM ELEMENTS

const expenseForm = document.getElementById("expenseForm");
const expenseContainer = document.getElementById("expenses");
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");


// DATA

const expenses = [];


// EVENT LISTENERS

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const expense = createExpense();
    expenses.push(expense);
    renderExpense(expense);
});


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
    
    if(indexToDelete === -1){
        return;
    }
    expenses.splice(indexToDelete, 1);

}


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
    editBtn.addEventListener("click", ()=>{
        const targetId = editBtn.dataset.expenseId;
        const expenses[data] = newValue;
    })

    
    const delBtn = document.createElement("button"); 
    delBtn.textContent = "Delete";
    delBtn.dataset.expenseId = expense.id;
    expenseDiv.append(delBtn);
    delBtn.addEventListener("click", ()=>{
        const del = del(expense.id);
    })


    expenseContainer.append(expenseDiv);

}

