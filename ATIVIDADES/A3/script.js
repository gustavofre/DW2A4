
const Modal = {
    open(){
        // Abrir modal 
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        // Fechar o modal
        document
        .querySelector('.modal-overlay')
        .classList.remove('active');
    }
};

const transaction = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
},    
{
    id: 2,
    description: 'Website',
    amount: 50000,
    date: '23/01/2021'
},
{
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
},
{
    id: 4,
    description: 'Venda',
    amount: 20000,
    date: '23/01/2021'
}
];

const Transaction = {

    all:transaction,

    incomes(){
        let income = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        });
        return income;
    }, 
    expenses(){
        let expense = 0;

        add(transaction){
            Transaction.all.push(transaction);
        }

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                income += transaction.amount;
            }
        });
        return expense; 
    },
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
           const tr = document.createElement('tr'); 
           tr.innerHTML = DOM.innerHTMLTransaction(transaction);
           DOM.transactionContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount); 

        const html = ` 
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="/assets/minus.svg" alt="">
            </td>
        `
        return html;
    },

    upDateBalance(){
        document.getElementById('incomeDisplay').innerHTML = 
        Util.formatCurrency(Transaction.incomes()); 
        document.getElementById('expenseDisplay').innerHTML = 
        Util.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML = 
        Util.formatCurrency(Transaction.total());
    }

} ;


const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : " ";

        value = String(value).replace(/\D/g, "");
        value = Number (value) / 100 ;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
};

const App = {
    init(){

    }, 
    reload(){
        
    }
}

transaction.forEach(function(transaction){
    DOM.addTransaction(transaction)
});

DOM.upDateBalance();

Transaction.add({
    id:39,
    description: 'Alo',
    amount: 200,
    date: '23/10/2021'
})