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
expenses.push(expense);
expenses.push(expense2);

//Read
let targetId = expense2.id;
let foundExpense = expenses.find(function(eachExpense){
            return (targetId === eachExpense.id);
});

//Update/Edit
foundExpense.amount = Number(prompt("Enter new amount"));
console.log(foundExpense);
console.log(expense2);
 
//Delete
const indexToDelete = expenses.findIndex(function(eachExpense){
    return (targetId === eachExpense.id);
});
console.log(indexToDelete);

expenses.splice(indexToDelete,1);
console.log(expenses);


