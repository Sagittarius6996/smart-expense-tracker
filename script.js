const expenseForm = document.getElementById("expenseForm");
expenseForm.addEventListener("submit",()=>{
    event.preventDefault();
});


//Create
function createExpense(){
    const expense = {
    id: crypto.randomUUID(),
    title: prompt("Enter Title of expense"),
    category: prompt("Enter Expense Category"),
    amount: Number(prompt("Enter Amount")),
    date: prompt("Enter Date")
    };

    return expense;
}

const expenses = [];
expenses.push(createExpense());
let targetId = expenses[0].id;

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



