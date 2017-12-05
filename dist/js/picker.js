/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _calendar = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  if (!$) {
    throw new Error('请引入jquery都window');
  }

  $.fn.extend({
    picker: function picker(pickupDate, returnDate) {
      var $target = $(this);
      var startTime = new Date();
      var endDate = new Date();
      var options = {
        startTime: startTime,
        endTime: new Date(endDate.setFullYear(endDate.getFullYear() + 1)),
        pickupDate: pickupDate ? new Date(pickupDate).getTime() : null,
        returnDate: returnDate ? new Date(returnDate).getTime() : null //绑定打开事件

      };
      $(this).on('click', function (e) {
        var _this2 = this;

        var target = e.target || e.srcElement;

        if ($(target).closest($target).length > 0) {
          // 新打开
          if ($('.picker-box').length == 0) {
            //传入到this中
            showcalendar(this, options); // 切换显示
          } else {
            closeCalendar(e, function () {
              setTimeout(function () {
                var $target = $(_this2);
                showcalendar(_this2, options);
              }, 24);
            });
          }
        }
      }); // 显示日历

      function showcalendar(_this, options) {
        var calendar = (0, _calendar.default)(options);
        var calendarTop = $(_this).outerHeight();
        $(_this).addClass('show-picker');
        $(_this).append(calendar);
        $('.picker-box').css({
          top: calendarTop + 'px'
        }).addClass('show'); // 点击除target以外的都会关闭

        setTimeout(function () {
          $('body').on('click', closeCalendar);
        }, 24);
      } // 关闭日历


      function closeCalendar(e, callback) {
        var target = e.target || e.srcElement;

        if ($(target).closest($target).length == 0) {
          $('.picker-box').remove();
          $target.removeClass('show-picker');
        }

        $('body').off('click', closeCalendar);
        callback instanceof Function && callback();
      }
    }
  });
})(window.jQuery || window.Zepto || window.$);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createDateArr = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 查找对应年月的数据
function findAssignDate(list, year, month) {
  var leftData = list[0],
      rightData = list[1];

  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].year == year && list[i].month == month) {
      leftData = list[i];
      rightData = list[i + 1];
    }
  }

  return {
    leftData: leftData,
    rightData: rightData
  };
} //设置样式class


function setClass(data) {
  var className = '';

  if (data.isGone) {
    className += 'gone ';
  } else {
    if (data.isStart) {
      className += 'start ';
    }

    if (data.isActive) {
      className += 'active ';
    }

    if (data.isEnd) {
      className += 'end ';
    }
  }

  return className;
} //创建元素


function createDateList(data) {
  var list = JSON.parse(JSON.stringify(data.dayList)),
      row = list.length / 7,
      html = '',
      rowNo = 0;

  for (var i = 0; i < row; i++) {
    var currRow = list.splice(0, 7);
    html += "\n            <tr>\n                <td class=\"".concat(setClass(currRow[0]), "\">").concat(currRow[0].content, "</td>\n                <td class=\"").concat(setClass(currRow[1]), "\">").concat(currRow[1].content, "</td>\n                <td class=\"").concat(setClass(currRow[2]), "\">").concat(currRow[2].content, "</td>\n                <td class=\"").concat(setClass(currRow[3]), "\">").concat(currRow[3].content, "</td>\n                <td class=\"").concat(setClass(currRow[4]), "\">").concat(currRow[4].content, "</td>\n                <td class=\"").concat(setClass(currRow[5]), "\">").concat(currRow[5].content, "</td>\n                <td class=\"").concat(setClass(currRow[6]), "\">").concat(currRow[6].content, "</td>\n            </tr>\n        ");
    rowNo++;
  }

  return html;
} // let arr = createDateArr( startTime, endTime, pickupDay, returnDay );


function _default(options) {
  var dateArr = (0, _createDateArr.default)(options.startTime, options.endTime, options.pickupDate, options.returnDate); //默认用前两个月渲染

  var leftData = dateArr[0];
  var rightData = dateArr[1]; // 如果有pickupDate和returnDate，则渲染对应的那两个月份，否则则渲染[0][1]这两个月份

  if (options.pickupDate && options.returnDate) {
    var year = new Date(options.pickupDate).getFullYear();
    var month = new Date(options.pickupDate).getMonth() + 1;
    var result = findAssignDate(dateArr, year, month);
    leftData = result.leftData;
    rightData = result.rightData;
  }

  console.log(dateArr);
  var calendarHTML = "\n        <div class=\"picker-box\">\n            <div class=\"picker-content-box\">\n                <div class=\"picker-content picker-content-left\">\n                    <!-- \u5934\u90E8 -->\n                    <div class=\"picker-header\">\n                        <div class=\"left-arrow arrow\"></div>\n                        <h5>".concat(leftData.year, "-").concat(leftData.month < 10 ? "0".concat(leftData.month) : leftData.month, "</h5>\n                    </div>\n                    <!-- \u4E3B\u4F53 -->\n                    <div class=\"picker-body\">\n                        <!-- \u661F\u671F -->\n                        <table cellspacing=\"0px\">\n                            <thead>\n                                <tr>\n                                    <th>\u65E5</th>\n                                    <th>\u4E00</th>\n                                    <th>\u4E8C</th>\n                                    <th>\u4E09</th>\n                                    <th>\u56DB</th>\n                                    <th>\u4E94</th>\n                                    <th>\u516D</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ").concat(createDateList(leftData), "\n                            </tbody>\n                        </table>\n                    </div>\n    \n                </div>\n                <div class=\"picker-content picker-content-right\">\n                    <!-- \u5934\u90E8 -->\n                    <div class=\"picker-header\">\n                        <div class=\"right-arrow arrow\"></div>\n                        <h5>").concat(rightData.year, "-").concat(rightData.month < 10 ? "0".concat(rightData.month) : rightData.month, "</h5>\n                    </div>\n                    <!-- \u4E3B\u4F53 -->\n                    <div class=\"picker-body\">\n                        <!-- \u661F\u671F -->\n                        <table cellspacing=\"0px\">\n                            <thead>\n                                <tr>\n                                    <th>\u65E5</th>\n                                    <th>\u4E00</th>\n                                    <th>\u4E8C</th>\n                                    <th>\u4E09</th>\n                                    <th>\u56DB</th>\n                                    <th>\u4E94</th>\n                                    <th>\u516D</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ").concat(createDateList(rightData), "\n                            </tbody>\n                        </table>\n                    </div>\n    \n                </div>\n            </div>\n            <div class=\"picker-tips\">\n                <p>\n                    <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAm1JREFUSA21Vj1s00AUvnd2nEqFCaaIoagDCGYWRiYQEh0Y6Z8qJgaQAnSAgXQoQwFLMDBV0JJ2ZAgSohNjF2ZADBEgoUww0FIpduw83nexjUPspKTE0ume7333vfPde9+ZVJ+Hry4ea3nBFDNfVESTirlk4EQNsetE9LpQtGu0uvItj4ayHLywWPL8YEmcs6x4W8hrFtP7tmU3gNdhUAqJT0uQKVJ0lpV6UXTse/RsxfjTnD0BmnPlSxRyVUBbjmXfofUH9fSEv22euz3ph8F9WcQF1mp6bN19lcZ0BWjOlK8T87JSNF/ccF+mgYNsb7p8WSleY6K7Y1X3SYxPAkQr3yRbn3PWHr2LAf/S+/M3z3DQfssWXYm/xATAnvt+66OsfCFv5Txza9wnvoGADtNjqj7cywpuvoTUc6dgn8SZaIBwoNJt5ZEbjApdbreX0TyxMZb1GA7mNxGnspGKfjOYlQM9lTXhzxgdlz2OXmHnP0gOPww/CPeSNnkuqTgoWyxWFdnCr2gdOz8AuJDe4LajIqrlwzuewoa7LdbEIFzil9oBt0aFoogSRx+Dr1UOofWBJC7DKdwa5R9XaOLNMEDs7/784u3sfN5PEMMp3CaLMvh6hlp7uyeY1RE56KOwewA5A9iiBrQlxz/0sOEEN1TRCNfQVNkTIzGsa0guVDEbdoBRKK1wa6PnkFxRxQPQdU0FF2Qc3BqXBfTcSG4XbPgXcIET3CaLcFkI3fmO5GYTF8YPfyJSP6SSv8PORomuQbblbog4FcXA/ch1nP/0tPIrnpfuc+U6Bo30wkmCjPLKjIOM9NKPg6D/H78tvwFLXGokZbzqrgAAAABJRU5ErkJggg==\"/>\n                    \u79DF\u671F\u4EE5\u5929\u4E3A\u5355\u4F4D\uFF0C24\u5C0F\u65F6\u4E3A\u4E00\u5929\uFF0C\u4E0D\u6EE124\u5C0F\u65F6\u7684\u63091\u5929\u8BA1\u7B97\n                </p>\n            </div>\n        </div>");
  return calendarHTML;
}

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _reSetDay = _interopRequireDefault(__webpack_require__(8));

var _checkDayIsActive = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by lamho on 2017/4/6.
 */
//判断日期的状态
function setDayInfo(currDay, pickupDay, returnDay) {
  var todayTime = (0, _reSetDay.default)(new Date()),
      todayDay = currDay.getDate(),
      pickupTime = pickupDay ? (0, _reSetDay.default)(pickupDay).getTime() : null,
      returnTime = returnDay ? (0, _reSetDay.default)(returnDay).getTime() : null,
      dateInfo = {
    isToday: false,
    //是否今天
    isTomorrow: false,
    //是否明天
    isGone: false,
    //是否已经过去的日期
    content: todayDay,
    //日期显示内容
    date: todayDay,
    //日期天
    isStart: currDay.getTime() == pickupTime ? true : false,
    //是否为选中的pickup日期
    isEnd: currDay.getTime() == returnTime ? true : false,
    //是否为选中的return日期
    isActive: pickupTime < currDay.getTime() && currDay.getTime() < returnTime ? (0, _checkDayIsActive.default)(pickupTime, returnTime, currDay.getTime()) : false //是否激活日期

  }; //是否今天

  if (todayTime.getTime() == currDay.getTime()) {
    dateInfo.isToday = true;
    dateInfo.content = '今'; //是否明天
  } else if (new Date(todayTime.setDate(todayTime.getDate() + 1)).getTime() == currDay.getTime()) {
    dateInfo.isTomorrow = true;
    dateInfo.content = '明'; //是否是今天之前的日期
  } else if (todayTime > currDay) {
    dateInfo.isGone = true;
    dateInfo.content = todayDay;
  }

  return dateInfo;
} //设置占位符的状态


function setDatePlaceholder(currDay, pickupDay, returnDay, type) {
  var obj = {
    isActive: false,
    isToday: false,
    isTomorrow: false,
    isGone: false,
    content: '',
    date: '',
    isStart: false,
    isEnd: false
  };
  return obj;
} //获取某月分的天数


function getMonthTotalDay(time) {
  var starYear = new Date(time).getFullYear(),
      starMonth = new Date(time).getMonth() + 1;
  return new Date(starYear, starMonth, 0).getDate();
} //获取对应月份的日期数组（做好缩进）


function getMonthDayArray(time, dayCount, pickupDay, returnDay) {
  var year = time.getFullYear(),
      month = time.getMonth(),
      arr = [],
      cont = 0,
      i = dayCount % 8,
      n = Math.floor(dayCount / 8);

  function _setDateInfo() {
    var currDay = new Date(year, month, cont + 1),
        week = currDay.getDay();
    var currDayInfo = setDayInfo(currDay, pickupDay, returnDay); //第一个日期需要做好星期的缩进

    if (cont == 0) {
      var retractCount = 7 - (7 - week);

      for (var k = 0; k < retractCount; k++) {
        //设置占位符状态
        arr.push(setDatePlaceholder(currDay, pickupDay, returnDay, 'previous'));
      }

      arr.push(currDayInfo); //最后一天如果不是星期天，后面要补占位符
    } else if (cont == dayCount - 1) {
      arr.push(currDayInfo);

      var _retractCount = 7 - week - 1;

      for (var _k = 0; _k < _retractCount; _k++) {
        arr.push(setDatePlaceholder(currDay, pickupDay, returnDay, 'next'));
      }
    } else {
      arr.push(currDayInfo);
    }

    cont++;
  }

  while (i) {
    _setDateInfo();

    i--;
  }

  while (n) {
    n--;

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();

    _setDateInfo();
  }

  return arr;
} //创建日期数组


function createDayArr(starTime, endTime, pickupDay, returnDay) {
  var starYear = parseInt(starTime.getFullYear()),
      starMonth = parseInt(starTime.getMonth()),
      endYear = parseInt(endTime.getFullYear()),
      endMonth = parseInt(endTime.getMonth()),
      dateArray = [],
      diffMonth = (endYear - starYear) * 12 + (endMonth - starMonth) + 1,
      currYear = starYear,
      currMonth = starMonth;

  for (var i = 1; i <= diffMonth; i++) {
    var currDate = new Date(currYear, currMonth, 1),
        //当前月份
    currDayCount = getMonthTotalDay(currDate),
        dayList = getMonthDayArray(currDate, currDayCount, pickupDay, returnDay);
    dateArray.push({
      year: currDate.getFullYear().toString(),
      month: (currDate.getMonth() + 1).toString(),
      dayList: dayList,
      isShow: _isShowMonth(dayList) //在渲染时时候显示出来，

    }); //如果月份到12月，就加1年，月份为1

    if (currMonth == 12) {
      currMonth = 1;
      currYear += 1;
    } else {
      currMonth += 1;
    }
  }

  return dateArray;
} //查看每个月份的日期中是否有选中的日期，如果有那么该月份在渲染时要显示


function _isShowMonth(dayList) {
  for (var i = 0; i < dayList.length; i++) {
    if (dayList[i].isStart) {
      return true;
    }
  }

  return false;
}

function _default(starTime, endTime, pickupDay, returnDay) {
  var dayArr = createDayArr(starTime, endTime, pickupDay, returnDay);
  return dayArr;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Created by lamho on 2017/4/11.
 */
function _default(time) {
  var newTime = new Date(time);
  newTime.setHours(0);
  newTime.setMinutes(0);
  newTime.setSeconds(0);
  newTime.setMilliseconds(0);
  return newTime;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Created by lamho on 2017/4/11.
 */
function _default(pickupTime, returnTime, currTime) {
  if (pickupTime < currTime && currTime < returnTime) {
    return true;
  } else {
    return false;
  }
}

/***/ })
/******/ ]);