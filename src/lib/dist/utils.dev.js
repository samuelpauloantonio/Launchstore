"use strict";

module.exports = {
  date: function date(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = "0".concat(date.getMonth() + 1).slice(-2);
    var day = "0".concat(date.getDate()).slice(-2);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return {
      hour: hour,
      minutes: minutes,
      day: day,
      month: month,
      year: year,
      iso: "".concat(year, "-").concat(month, "-").concat(day),
      birthday: "".concat(day, "/").concat(month),
      format: "".concat(day, "/").concat(month, "/").concat(year)
    };
  },
  formatPrice: function formatPrice(price) {
    return new Intl.NumberFormat("AOA", {
      style: "currency",
      currency: "AKZ"
    }).format(price / 100);
  }
};