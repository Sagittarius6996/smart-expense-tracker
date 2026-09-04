const expenseForm = document.getElementById("expenseForm");
expenseForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const expense = createExpense();
    expenses.push(expense);
});

const expenseContainer = document.getElementById("expenses");
const edit = document.getElementById("edit");
const del = document.getElementById("delete");
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");

//Create
function createExpense(){
    const expense = {
    id: crypto.randomUUID(),
    title: title.value,
    category: category.value,
    amount:amount.valueAsNumber,
    date: date.value
    };   
    return expense;
}

const expenses = [];

//Read
function read(targetId){
    let foundExpense = expenses.find(function(eachExpense){
                return (targetId === eachExpense.id);
    });
    return foundExpense;
}
//Update/Edit
function edit(data){
    const editExpense = read(targetId);
    editExpense[data] = prompt(`Enter new ${data}`);
    return editExpense;
}
//Delete
function del(targetId){
    const indexToDelete = expenses.findIndex(function(eachExpense){
    return (targetId === eachExpense.id);
});
expenses.splice(indexToDelete,1);
}



