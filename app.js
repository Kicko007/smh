function $(id) {
    return document.getElementById(id);
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const ctx = document.getElementById("profitChart").getContext("2d");

let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: months,
        datasets: [{
            label: "Profit",
            backgroundColor: "#4a90e2",
            data: Array(12).fill(0)
        }]
    }
});

function calc() {

    let occ = parseFloat($("occRate").value) / 100;
    let weekdayADR = parseFloat($("adrWeek").value);
    let weekendADR = parseFloat($("adrWeekend").value);

    let monthlyRevenue = (22 * weekdayADR * occ) + (8 * weekendADR * occ);
    let dailyProfit = monthlyRevenue / 30;

    let expenses = [
        parseFloat($("rent").value),
        parseFloat($("cleaning").value),
        parseFloat($("utilities").value),
        parseFloat($("internet").value),
        parseFloat($("maintenance").value),
        parseFloat($("supplies").value),
        parseFloat($("other").value)
    ].reduce((a,b) => a + b, 0);

    $("totalExpenses").innerHTML = "$" + expenses.toFixed(2);

    let netMonthly = monthlyRevenue - expenses;
    $("monthlyProfit").innerHTML = "$" + netMonthly.toFixed(2);
    $("dailyProfit").innerHTML = "$" + (netMonthly/30).toFixed(2);
    $("yearlyProfit").innerHTML = "$" + (netMonthly*12).toFixed(2);

    let partnerPercent = parseFloat($("partnerSplit").value) / 100;
    $("partnerShare").innerHTML = "$" + (netMonthly * partnerPercent).toFixed(2);
    $("yourShare").innerHTML = "$" + (netMonthly * (1 - partnerPercent)).toFixed(2);

    chart.data.datasets[0].data = Array(12).fill(netMonthly);
    chart.update();
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calc);
});

calc();
