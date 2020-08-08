"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.expenses = new ArrayList();
        this.finalCurrency = currency;
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.get(index);
    };
    Expenses.prototype.getItems = function () {
        return this.expenses.getAll();
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.expenses.getAll().reduce(function (acc, item) {
            return acc += _this.convertCurrency(item, _this.finalCurrency);
        }, 0);
        return this.finalCurrency + " $" + total.toFixed(2).toString();
    };
    Expenses.prototype.remove = function (id) {
        var items = this.getItems().filter(function (item) {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'MXN':
                        return item.cost.number * 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'MXN':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    };
    return Expenses;
}());
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.get = function (index) {
        var item = this.items.filter(function (x, i) {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    };
    ArrayList.prototype.createFrom = function (value) {
        this.items = __spreadArrays(value);
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
