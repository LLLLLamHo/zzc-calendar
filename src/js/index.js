import '../scss/index.scss';
import createCalendar from './calendar.js';

( ( $ ) => {

    if ( !$ ) {
        throw new Error( '请引入jquery都window' );
    }

    $.fn.extend( {
        picker: function (pickupDate,returnDate) {
            let $target = $( this );
            let startTime = new Date();
            let endDate = new Date();
            let options = {
                startTime: startTime,
                endTime: new Date( endDate.setFullYear( endDate.getFullYear() + 1 ) ),
                pickupDate: pickupDate ? new Date(pickupDate).getTime() : null,
                returnDate: returnDate ? new Date(returnDate).getTime() : null
            }

            //绑定打开事件
            $( this ).on( 'click', function ( e ) {
                let target = e.target || e.srcElement;
                if ( $( target ).closest( $target ).length > 0 ) {
                    // 新打开
                    if ( $( '.picker-box' ).length == 0 ) {
                        //传入到this中
                        showcalendar( this, options );
                    // 切换显示
                    } else {
                        closeCalendar( e, () => {
                            setTimeout( () => {
                                let $target = $( this );
                                showcalendar( this, options );
                            }, 24 );

                        } );
                    }
                }

            } );


            // 显示日历
            function showcalendar(_this, options) { 
                let calendar = createCalendar(options);
                let calendarTop = $( _this ).outerHeight();
                $( _this ).addClass( 'show-picker' );
                $( _this ).append( calendar );
                $( '.picker-box' ).css( { top: calendarTop + 'px' } ).addClass( 'show' );
                // 点击除target以外的都会关闭
                setTimeout( () => {
                    $( 'body' ).on( 'click', closeCalendar );
                }, 24 );
            }

            // 关闭日历
            function closeCalendar( e, callback ) {
                let target = e.target || e.srcElement;
                if ( $( target ).closest( $target ).length == 0 ) {
                    $( '.picker-box' ).remove();
                    $target.removeClass( 'show-picker' );
                }
                $( 'body' ).off( 'click', closeCalendar );
                callback instanceof Function && callback();
            }
        }
    } );

} )( window.jQuery || window.Zepto || window.$ )