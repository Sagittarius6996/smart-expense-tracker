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
    });

    expenseContainer.append(expenseDiv);
}