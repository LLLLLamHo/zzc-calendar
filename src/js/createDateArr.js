/**
 * Created by lamho on 2017/4/6.
 */

import reSetDay from "./reSetDay";
import checkDayIsActive from './checkDayIsActive';

//判断日期的状态
function setDayInfo( currDay, pickupDay, returnDay ) {

    

    let todayTime = reSetDay( new Date() ),
        todayDay = currDay.getDate(),
        pickupTime = pickupDay ? reSetDay( pickupDay ).getTime() : null,
        returnTime = returnDay ? reSetDay( returnDay ).getTime() : null,
        dateInfo = {
            isToday: false,//是否今天
            isTomorrow: false,//是否明天
            isGone: false,//是否已经过去的日期
            content: todayDay,//日期显示内容
            date: todayDay,//日期天
            isStart: currDay.getTime() == pickupTime ? true : false,//是否为选中的pickup日期
            isEnd: currDay.getTime() == returnTime ? true : false,//是否为选中的return日期
            isActive: pickupTime < currDay.getTime() && currDay.getTime() < returnTime ? checkDayIsActive( pickupTime, returnTime, currDay.getTime() ) : false//是否激活日期
        };
    
    //是否今天
    if ( todayTime.getTime() == currDay.getTime() ) {
        dateInfo.isToday = true;
        dateInfo.content = '今';
        //是否明天
    } else if ( new Date( todayTime.setDate( todayTime.getDate() + 1 ) ).getTime() == currDay.getTime() ) {
        dateInfo.isTomorrow = true;
        dateInfo.content = '明';
        //是否是今天之前的日期
    } else if ( todayTime > currDay ) {
        dateInfo.isGone = true;
        dateInfo.content = todayDay;
    }

    return dateInfo;

}

//设置占位符的状态
function setDatePlaceholder( currDay, pickupDay, returnDay, type ) {

    let obj = {
        isActive: false,
        isToday: false,
        isTomorrow: false,
        isGone: false,
        content: '',
        date: '',
        isStart: false,
        isEnd: false,
    };

    return obj;
}

//获取某月分的天数
function getMonthTotalDay( time ) {
    let starYear = new Date( time ).getFullYear(),
        starMonth = new Date( time ).getMonth() + 1;

    return new Date( starYear, starMonth, 0 ).getDate();
}

//获取对应月份的日期数组（做好缩进）
function getMonthDayArray( time, dayCount, pickupDay, returnDay ) {
    let year = time.getFullYear(),
        month = time.getMonth(),
        arr = [],
        cont = 0,
        i = dayCount % 8,
        n = Math.floor( dayCount / 8 );

    function _setDateInfo() {
        let currDay = new Date( year, month, cont + 1 ),
            week = currDay.getDay();
        let currDayInfo = setDayInfo( currDay, pickupDay, returnDay );


        //第一个日期需要做好星期的缩进
        if ( cont == 0 ) {

            let retractCount = 7 - ( 7 - week );
            for ( let k = 0; k < retractCount; k++ ) {
                //设置占位符状态
                arr.push( setDatePlaceholder( currDay, pickupDay, returnDay, 'previous' ) );
            }
            arr.push( currDayInfo );
            //最后一天如果不是星期天，后面要补占位符
        } else if ( cont == dayCount - 1 ) {
            arr.push( currDayInfo );
            let retractCount = 7 - week - 1;
            for ( let k = 0; k < retractCount; k++ ) {
                arr.push( setDatePlaceholder( currDay, pickupDay, returnDay, 'next' ) );
            }
        } else {
            arr.push( currDayInfo );
        }

        cont++;
    }

    while ( i ) {
        _setDateInfo();
        i--;
    }

    while ( n ) {
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
}

//创建日期数组
function createDayArr( starTime, endTime, pickupDay, returnDay ) {

    let starYear = parseInt( starTime.getFullYear() ),
        starMonth = parseInt( starTime.getMonth() ),
        endYear = parseInt( endTime.getFullYear() ),
        endMonth = parseInt( endTime.getMonth() ),
        dateArray = [],
        diffMonth = ( endYear - starYear ) * 12 + ( endMonth - starMonth ) + 1,
        currYear = starYear,
        currMonth = starMonth;

    for ( let i = 1; i <= diffMonth; i++ ) {
        let currDate = new Date( currYear, currMonth, 1 ),//当前月份
            currDayCount = getMonthTotalDay( currDate ),
            dayList = getMonthDayArray( currDate, currDayCount, pickupDay, returnDay );

        dateArray.push( {
            year: currDate.getFullYear().toString(),
            month: ( currDate.getMonth() + 1 ).toString(),
            dayList: dayList,
            isShow: _isShowMonth( dayList )//在渲染时时候显示出来，
        } );

        //如果月份到12月，就加1年，月份为1
        if ( currMonth == 12 ) {
            currMonth = 1;
            currYear += 1;
        } else {
            currMonth += 1;
        }

    }

    return dateArray;

}

//查看每个月份的日期中是否有选中的日期，如果有那么该月份在渲染时要显示
function _isShowMonth( dayList ) {
    for ( let i = 0; i < dayList.length; i++ ) {
        if ( dayList[i].isStart ) {
            return true;
        }
    }
    return false;
}

export default function ( starTime, endTime, pickupDay, returnDay ) {
    let dayArr = createDayArr( starTime, endTime, pickupDay, returnDay );
    return dayArr;
}