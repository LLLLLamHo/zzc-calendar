
import createDateArr from './createDateArr.js';

// 查找对应年月的数据
function findAssignDate( list, year, month ) {
    let leftData = list[0],
        rightData = list[1];
    for ( let i = 0, len = list.length; i < len; i++ ) { 
        if ( list[i].year == year && list[i].month == month ) { 
            leftData = list[i];
            rightData = list[i + 1];
        }
    }
    return {
        leftData: leftData,
        rightData: rightData
    }
}

//设置样式class
function setClass(data) { 
    let className = '';
    if ( data.isGone ) {
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

//创建元素
function createDateList( data ) {
    let list = JSON.parse(JSON.stringify(data.dayList)),
        row = list.length / 7,
        html = '',
        rowNo = 0;

    for ( let i = 0; i < row; i++ ) {
        let currRow = list.splice( 0, 7 );
        html += `
            <tr>
                <td class="${setClass(currRow[0])}">${currRow[0].content}</td>
                <td class="${setClass(currRow[1])}">${currRow[1].content}</td>
                <td class="${setClass(currRow[2])}">${currRow[2].content}</td>
                <td class="${setClass(currRow[3])}">${currRow[3].content}</td>
                <td class="${setClass(currRow[4])}">${currRow[4].content}</td>
                <td class="${setClass(currRow[5])}">${currRow[5].content}</td>
                <td class="${setClass(currRow[6])}">${currRow[6].content}</td>
            </tr>
        `;

        rowNo++;
    }

    return html;
}

// let arr = createDateArr( startTime, endTime, pickupDay, returnDay );
export default function ( options ) {

    let dateArr = createDateArr( options.startTime, options.endTime, options.pickupDate, options.returnDate );

    //默认用前两个月渲染
    let leftData = dateArr[0];
    let rightData = dateArr[1];

    // 如果有pickupDate和returnDate，则渲染对应的那两个月份，否则则渲染[0][1]这两个月份
    if ( options.pickupDate && options.returnDate ) {
        let year = new Date( options.pickupDate ).getFullYear();
        let month = new Date( options.pickupDate ).getMonth() + 1;
        let result = findAssignDate( dateArr, year, month );
        leftData = result.leftData;
        rightData = result.rightData;
    }
    console.log( dateArr );

    let calendarHTML = `
        <div class="picker-box">
            <div class="picker-content-box">
                <div class="picker-content picker-content-left">
                    <!-- 头部 -->
                    <div class="picker-header">
                        <div class="left-arrow arrow"></div>
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
                        <div class="right-arrow arrow"></div>
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

    return calendarHTML;
}