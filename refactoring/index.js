import createStatementData from './createStatementData';

const plays = {
    'hamlet' : {'name': 'Hamlet', 'type': 'tragedy'},
    'as-like' : {'name': 'As You Like It', 'type': 'comedy'},
    'othello' : {'name': 'Othello', 'type': 'tragedy'},
};

const invoices =
    {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40
            }
        ]
    };

function statement (invoice, plays){
    return renderPlainText(createStatementData(invoice, plays));
}
function htmlStatement (invoice, plays){
    return renderHTML(createStatementData(invoice, plays));
}
function renderHTML (data){
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n";
    for (let perf of data.performances) {
        result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience} seats)</td>\n`;
        result += `<td>${usd(perf.amount)}</td></tr>`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>you earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}
function renderPlainText(data){
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `you earned ${data.totalVolumeCredits} credits\n`;
    return result;
}
function usd(aNumber){
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format(aNumber/100);
}

let refoctoringDiv = document.createElement("div");
refoctoringDiv.innerHTML = htmlStatement(invoices, plays);
document.getElementById('refactoring').append(refoctoringDiv);
console.log(statement(invoices, plays));
