// d - Day of the month 01 to 31
// D - A short textual representation of the day of the week Mon to Sun
// j - Day of the month without leading zeros
// l - A full textual representation of the day of the week
// N - ISO-8601 numeric representation of the day of the week
// S - English ordinal suffix for the day of the month, 2 characters st, nd, rd or th. Works well with j
// w - Numeric representation of the day of the week
// F - A full textual representation of a month, such as January or March
// m - Numeric representation of a month, with leading zeros
// M - A short textual representation of a month  Jan to Dec
// n - Numeric representation of a month, without leading zeros 1 to 12
// Y - full Year
// y - A two digit representation of a year 99 or 03
// a - Lowercase Ante meridiem and Post meridiem am or pm
// A - Uppercase Ante meridiem and Post meridiem AM or PM
// g - 12-hour format of an hour without leading zeros 1 to 12
// h - 12-hour format of an hour with leading zeros 01 to 12
// G - 24-hour format of an hour without leading zeros 0 to 23
// H - 24-hour format of an hour with leading zeros 00 to 23
// i - Minutes, with leading zeros 00 to 59
// s - Seconds, with leading zeros 00 to 59
// T - Timezone abbreviation of the machine running the code Examples: EST, MDT, PDT ...

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define("SDate", function(dependencies, templates) {
        return factory();
      });
    } else {
      root.SDate = factory();
    }
}(this, function () {
  'use strict';
  var MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  DAY_ENDS = [
    'th',
    'st',
    'nd',
    'rd',
    'th',
    'th',
    'th',
    'th',
    'th',
    'th'
  ],
  formater = {
    j: function () {
      return this.date.getDate();
    },
    d: function () {
      var date = this.date.getDate();
        if (date < 10) {
          return '0' + date;
        }
      return date;
    },
    D: function () {
      return WEEK_DAYS[this.date.getDay()].substring(0, 3);
    },
    l: function () {
      return WEEK_DAYS[this.date.getDay()];
    },
    N: function () {
      var day = this.date.getDay();
      if (day == 0) {
        return 7;
      }
      return day;
    },
    S: function () {
      var day = this.date.getDate();
      if ((day % 100) >= 11 && (day % 100) <= 13) {
        return day + 'th';
      } else {
        return '' + day + DAY_ENDS[day % 10];
      }
    },
    w: function () {
      return this.date.getDay();
    },
    F: function () {
      return MONTHS[this.date.getMonth()];
    },
    m: function () {
      var month = this.date.getMonth();
      month++;
      if (month < 10) {
        return '0' + month;
      }

      return this.date.getMonth();
    },
    M: function () {
      return MONTHS[this.date.getMonth()].substring(0, 3);
    },
    n: function () {
      var month = this.date.getMonth();
      return ++month;
    },
    Y: function () {
      // full Year
      return this.date.getFullYear();
    },
    y: function () {
      return ('' + this.date.getFullYear()).substring(2);
    },
    a: function () {
      var time = this.date.getHours();
      if (time >= 0 && time < 12) {
        return 'am';
      } else {
        return 'pm';
      }
    },
    A: function () {
      var time = this.date.getHours();
      if (time >= 0 && time < 12) {
        return 'AM';
      } else {
        return 'PM';
      }
    },
    g: function () {
      var hour = this.date.getHours();
      if (hour <= 12) {
        return hour;
      } else {
        return hour - 12;
      }
    },
    h: function () {
      var g = formater.g.call(this);
      if (g < 10) {
        return '0' + g;
      }
      return g;
    },
    G: function () {
      return this.date.getHours();
    },
    H: function () {
      var g = this.date.getHours();
      if (g < 10) {
        return '0' + g;
      }
      return g;
    },
    i: function () {
      var d = this.date.getMinutes();
      if (d < 10) {
        return '0' + d;
      }
      return d;
    },
    s: function () {
      var s = this.date.getSeconds();
      if (s < 10) {
        return '0' + s;
      }
      return s;
    },
    T: function () {

    }
  };
  function SDate(arg, format) {
    var date;

    if (!(date instanceof Date)) {
      format = arg;
      date = date || new Date();
    } else {
      date = arg;
    }
    if (!(this instanceof SDate)) {
      // create new instance
      return new SDate(date, format);
    }

    this.date = date;

    if (format) {
      return this.format(format);
    } else {
      return this;
    }

  }
  SDate.prototype.format = function (format) {
    // return date in specific format
    var fn, c, skip = false,
      formatDate = '';

    for (var i = 0; i < format.length; i++) {
      c = format[i];
      fn = formater[c];
      if (!skip && fn) {
        formatDate += fn.call(this);
      } else {
        if (c === '\\') {
          // skip next chat
          skip = true;
        } else {
          formatDate += format[i];
          skip = false;
        }
      }
    };

    return formatDate;
  };
  return SDate;
}));
