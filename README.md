sdate
=====

Simple date formatter

```
d - Day of the month 01 to 31
D - A short textual representation of the day of the week Mon to Sun
j - Day of the month without leading zeros
l - A full textual representation of the day of the week
N - ISO-8601 numeric representation of the day of the week
S - English ordinal suffix for the day of the month, 2 characters st, nd, rd or th. Works well with j
w - Numeric representation of the day of the week
F - A full textual representation of a month, such as January or March
m - Numeric representation of a month, with leading zeros
M - A short textual representation of a month  Jan to Dec
n - Numeric representation of a month, without leading zeros 1 to 12
Y - full Year
y - A two digit representation of a year 99 or 03
a - Lowercase Ante meridiem and Post meridiem am or pm
A - Uppercase Ante meridiem and Post meridiem AM or PM
g - 12-hour format of an hour without leading zeros 1 to 12
h - 12-hour format of an hour with leading zeros 01 to 12
G - 24-hour format of an hour without leading zeros 0 to 23
H - 24-hour format of an hour with leading zeros 00 to 23
i - Minutes, with leading zeros 00 to 59
s - Seconds, with leading zeros 00 to 59
T - Timezone abbreviation of the machine running the code Examples: EST, MDT, PDT ...
```


```
var format = 'l M, j, Y H:i:s';
var date = new SDate().format(format);

console.log(date); // eg. Monday Apr, 28, 2014 19:58:58
```
