
import createDateArr from './createDateArr.js';

// 查找对应年月的数据
function findAssignDate( list, year, month ) {
    let leftData = list[0],
        rightData = list[1],
        leftIndex = 0,
        rightIndex = 1;
    for ( let i = 0, len = list.length; i < len; i++ ) {
        if ( list[i].year == year && list[i].month == month ) {
            leftData = list[i];
            rightData = list[i + 1];
            leftIndex = i;
            rightIndex = i + 1;
        }

        //当到最后，检查是否出现undefined，当出现的话，代表当前选择时间是12月，但是dateArr最后也是12月，需要往前移动一位
        if ( i == len - 1 && !rightData ) {
            leftData = list[i - 1];
            rightData = list[i];
            leftIndex = i - 1;
            rightIndex = i;
        }
    }
    return { leftData, rightData, leftIndex, rightIndex }
}

//设置样式class
function setClass( data ) {
    let className = '';
    if ( data.date == '' ) {
        className += 'perch ';
    }
    else if ( data.isGone ) {
        className += 'gone ';
    } else {
        if ( data.isStart ) {
            className += 'start ';
        }
        if ( data.isActive ) {
            className += 'active ';
        }
        if ( data.isEnd ) {
            className += 'end ';
        }
    }
    return className;
}

//创建对应的日期元素
function createTD( data, currRow, index ) {
    let html = `<td data-perch=${currRow[index].content == "" ? true : false} data-date="${data.year}-${data.month}-${currRow[index].date}" class="${setClass( currRow[index] )}">${currRow[index].content}</td>`;
    return html;
}

//创建元素
function createDateList( data ) {
    let list = JSON.parse( JSON.stringify( data.dayList ) ),
        row = list.length / 7,
        html = '',
        rowNo = 0;
    for ( let i = 0; i < row; i++ ) {
        let currRow = list.splice( 0, 7 );
        html += `
            <tr>
                ${createTD( data, currRow, 0 )}
                ${createTD( data, currRow, 1 )}
                ${createTD( data, currRow, 2 )}
                ${createTD( data, currRow, 3 )}
                ${createTD( data, currRow, 4 )}
                ${createTD( data, currRow, 5 )}
                ${createTD( data, currRow, 6 )}
            </tr>
        `;

        rowNo++;
    }

    return html;
}

//局部渲染
export function createPortionCalendar( options ) {

    let dateArr = createDateArr( options.startTime, options.endTime, options.pickupDate, options.returnDate );
    //默认用前两个月渲染
    let leftData = options.leftData,
        rightData = options.rightData,
        leftIndex = options.leftIndex ? options.leftIndex : 0,
        rightIndex = options.rightIndex ? options.rightIndex : 0;

    let year = new Date( options.pickupDate ).getFullYear();
    let month = new Date( options.pickupDate ).getMonth() + 1;
    let result = findAssignDate( dateArr, year, month );

    leftData = options.leftIndex ? dateArr[options.leftIndex] : result.leftData;
    leftIndex = options.leftIndex ? options.leftIndex : result.leftIndex;

    rightData = options.rightIndex ? dateArr[options.rightIndex] : result.rightData;
    rightIndex = options.rightIndex ? options.rightIndex : result.rightIndex;

    let calendarHTML = `
        <div class="picker-content-box">
            <div class="picker-content picker-content-left">
                <!-- 头部 -->
                <div class="picker-header">
                    <div data-direction="left" class="left-arrow arrow ${leftIndex <= 1 && 'disable'}"></div>
                    <h5>${leftData.year}-${leftData.month < 10 ? `0${leftData.month}` : leftData.month}</h5>
                </div>
                <!-- 主体 -->
                <div class="picker-body">
                    <!-- 星期 -->
                    <table cellspacing="0px">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${createDateList( leftData )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="picker-content picker-content-right">
                <!-- 头部 -->
                <div class="picker-header">
                    <div data-direction="right" class="right-arrow arrow ${rightIndex >= dateArr.length - 1 && 'disable'}"></div>
                    <h5>${rightData.year}-${rightData.month < 10 ? `0${rightData.month}` : rightData.month}</h5>
                </div>
                <!-- 主体 -->
                <div class="picker-body">
                    <!-- 星期 -->
                    <table cellspacing="0px">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${createDateList( rightData )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="picker-tips">
            <p>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAm1JREFUSA21Vj1s00AUvnd2nEqFCaaIoagDCGYWRiYQEh0Y6Z8qJgaQAnSAgXQoQwFLMDBV0JJ2ZAgSohNjF2ZADBEgoUww0FIpduw83nexjUPspKTE0ume7333vfPde9+ZVJ+Hry4ea3nBFDNfVESTirlk4EQNsetE9LpQtGu0uvItj4ayHLywWPL8YEmcs6x4W8hrFtP7tmU3gNdhUAqJT0uQKVJ0lpV6UXTse/RsxfjTnD0BmnPlSxRyVUBbjmXfofUH9fSEv22euz3ph8F9WcQF1mp6bN19lcZ0BWjOlK8T87JSNF/ccF+mgYNsb7p8WSleY6K7Y1X3SYxPAkQr3yRbn3PWHr2LAf/S+/M3z3DQfssWXYm/xATAnvt+66OsfCFv5Txza9wnvoGADtNjqj7cywpuvoTUc6dgn8SZaIBwoNJt5ZEbjApdbreX0TyxMZb1GA7mNxGnspGKfjOYlQM9lTXhzxgdlz2OXmHnP0gOPww/CPeSNnkuqTgoWyxWFdnCr2gdOz8AuJDe4LajIqrlwzuewoa7LdbEIFzil9oBt0aFoogSRx+Dr1UOofWBJC7DKdwa5R9XaOLNMEDs7/784u3sfN5PEMMp3CaLMvh6hlp7uyeY1RE56KOwewA5A9iiBrQlxz/0sOEEN1TRCNfQVNkTIzGsa0guVDEbdoBRKK1wa6PnkFxRxQPQdU0FF2Qc3BqXBfTcSG4XbPgXcIET3CaLcFkI3fmO5GYTF8YPfyJSP6SSv8PORomuQbblbog4FcXA/ch1nP/0tPIrnpfuc+U6Bo30wkmCjPLKjIOM9NKPg6D/H78tvwFLXGokZbzqrgAAAABJRU5ErkJggg=="/>
                租期以天为单位，24小时为一天，不满24小时的按1天计算
            </p>
        </div>`;

    return {
        calendarHTML,
        dateArr,
        leftIndex,
        rightIndex
    }
}

//渲染全部
export function createCalendar( options ) {

    let dateArr = createDateArr( options.startTime, options.endTime, options.pickupDate, options.returnDate );
    //默认用前两个月渲染
    let leftData = dateArr[0],
        rightData = dateArr[1],
        leftIndex = 0,
        rightIndex = 0;

    let year = new Date( options.pickupDate ).getFullYear();
    let month = new Date( options.pickupDate ).getMonth() + 1;
    let result = findAssignDate( dateArr, year, month );
    leftData = result.leftData;
    rightData = result.rightData;
    leftIndex = result.leftIndex;
    rightIndex = result.rightIndex;

    let calendarHTML = `
        <div class="picker-box">
            <div class="picker-content-box">
                <div class="picker-content picker-content-left">
                    <!-- 头部 -->
                    <div class="picker-header">
                        <div data-direction="left" class="left-arrow arrow ${leftIndex <= 1 && 'disable'}"></div>
                        <h5>${leftData.year}-${leftData.month < 10 ? `0${leftData.month}` : leftData.month}</h5>
                    </div>
                    <!-- 主体 -->
                    <div class="picker-body">
                        <!-- 星期 -->
                        <table cellspacing="0px">
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${createDateList( leftData )}
                            </tbody>
                        </table>
                    </div>
    
                </div>
                <div class="picker-content picker-content-right">
                    <!-- 头部 -->
                    <div class="picker-header">
                        <div data-direction="right" class="right-arrow arrow ${rightIndex >= dateArr.length - 1 && 'disable'}"></div>
                        <h5>${rightData.year}-${rightData.month < 10 ? `0${rightData.month}` : rightData.month}</h5>
                    </div>
                    <!-- 主体 -->
                    <div class="picker-body">
                        <!-- 星期 -->
                        <table cellspacing="0px">
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${createDateList( rightData )}
                            </tbody>
                        </table>
                    </div>
    
                </div>
            </div>
            <div class="picker-tips">
                <p>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAm1JREFUSA21Vj1s00AUvnd2nEqFCaaIoagDCGYWRiYQEh0Y6Z8qJgaQAnSAgXQoQwFLMDBV0JJ2ZAgSohNjF2ZADBEgoUww0FIpduw83nexjUPspKTE0ume7333vfPde9+ZVJ+Hry4ea3nBFDNfVESTirlk4EQNsetE9LpQtGu0uvItj4ayHLywWPL8YEmcs6x4W8hrFtP7tmU3gNdhUAqJT0uQKVJ0lpV6UXTse/RsxfjTnD0BmnPlSxRyVUBbjmXfofUH9fSEv22euz3ph8F9WcQF1mp6bN19lcZ0BWjOlK8T87JSNF/ccF+mgYNsb7p8WSleY6K7Y1X3SYxPAkQr3yRbn3PWHr2LAf/S+/M3z3DQfssWXYm/xATAnvt+66OsfCFv5Txza9wnvoGADtNjqj7cywpuvoTUc6dgn8SZaIBwoNJt5ZEbjApdbreX0TyxMZb1GA7mNxGnspGKfjOYlQM9lTXhzxgdlz2OXmHnP0gOPww/CPeSNnkuqTgoWyxWFdnCr2gdOz8AuJDe4LajIqrlwzuewoa7LdbEIFzil9oBt0aFoogSRx+Dr1UOofWBJC7DKdwa5R9XaOLNMEDs7/784u3sfN5PEMMp3CaLMvh6hlp7uyeY1RE56KOwewA5A9iiBrQlxz/0sOEEN1TRCNfQVNkTIzGsa0guVDEbdoBRKK1wa6PnkFxRxQPQdU0FF2Qc3BqXBfTcSG4XbPgXcIET3CaLcFkI3fmO5GYTF8YPfyJSP6SSv8PORomuQbblbog4FcXA/ch1nP/0tPIrnpfuc+U6Bo30wkmCjPLKjIOM9NKPg6D/H78tvwFLXGokZbzqrgAAAABJRU5ErkJggg=="/>
                    租期以天为单位，24小时为一天，不满24小时的按1天计算
                </p>
            </div>
        </div>`;

    return { calendarHTML, leftData, rightData, dateArr, leftIndex, rightIndex };
}