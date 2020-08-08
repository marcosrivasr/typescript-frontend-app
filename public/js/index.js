"use strict";
var bAdd = document.querySelector('#bAdd');
var inputTitle = document.querySelector('#title');
var inputCost = document.querySelector('#cost');
var inputCurrency = document.querySelector('#currency');
var expenses = new Expenses('USD');
loadAPI();
bAdd.addEventListener('click', function (e) {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = inputCost.value;
        var currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function loadAPI() {
    fetch('api/api.json')
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var items = json.items;
        items.forEach(function (item) {
            expenses.add(item);
        });
        render();
    });
}
function render() {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        html += "\n            <div class=\"item\">\n                <div><span class=\"currency\">" + cost.currency + "</span> " + cost.number + "</div>\n                <div>" + title + "</div>\n                <div><button class=\"bEliminar\" data-id=\"" + id + "\">Eliminar</button></div>\n            </div>\n        ";
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.bEliminar').forEach(function (bEliminar) {
        bEliminar.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
