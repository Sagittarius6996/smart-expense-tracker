const expense= {
    id: "adaw",
    title: "Mongnis",
    category: "Food",
    amount: 200,
    date: "29/8/2026",
};
const expense2 = {
    id: "ajef",
    title: "Headphones",
    category: "Electronics",
    amount: 200,
    date: "29/8/2026",
};

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
expenses.push(createExpense());

console.log(expenses);