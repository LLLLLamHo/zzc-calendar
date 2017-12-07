import { createCalendar, createPortionCalendar } from './createCalendar.js';

const hasEventListeners = !!window.addEventListener;

class Calender {

    //获取日历
    getCalendar( options ) {
        let data = createCalendar( options );
        return data;
    }

    //更新日历
    updateCalendar( options ) {
        let data = createPortionCalendar( options );
        return data;
    }

    //清除当前选择的日期样式
    clearCurrSelectClass(className = 'start active end hover') {
        $( '.picker-content-box td' ).removeClass( className );
    }

    //添加监听
    addEvent( el, e, callback, capture ) {
        if ( hasEventListeners ) {
            el.addEventListener( e, callback, !!capture );
        } else {
            el.attachEvent( 'on' + e, callback );
        }
    }

    removeEvent( el, e, callback, capture ) {
        if ( hasEventListeners ) {
            el.removeEventListener( e, callback, !!capture );
        } else {
            el.detachEvent( 'on' + e, callback );
        }
    }

}

export default Calender;