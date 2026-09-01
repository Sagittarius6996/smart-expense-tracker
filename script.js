const expense= {
    id: "adaw",
    title: "Mongnis",
    category: "Food",
    amount: 200,
    date: "29/8/2026",
};
const expense2 = {
    id: "ajefbibiu",
    title: "Headphones",
    category: "Electronics",
    amount: 200,
    date: "29/8/2026",
};

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


let targetId = expense2.id;
//Read
function read(targetId){
    let foundExpense = expenses.find(function(eachExpense){
                return (targetId === eachExpense.id);
    });
}

//Update/Edit

function edit(data){
    foundExpense[data] = prompt(`Enter new ${data}`);
    return ;
}

 
//Delete
function del(targetId){
const indexToDelete = expenses.findIndex(function(eachExpense){
    return (targetId === eachExpense.id);
});
expenses.splice(indexToDelete,1);
}



