import { createCalendar, createPortionCalendar } from './createCalendar.js';

class Calender {

    //初始事件
    initEvent() {
        let self = this;
        if ( this.pickerElem ) {
            this.pickerElem.on( 'click', function () {
                event.stopPropagation();
                self.createCalender.call( this, self );
            } )
        }
        if ( this.returnElem ) {
            this.returnElem.on( 'click', function () {
                event.stopPropagation();
                self.createCalender.call( this, self );
            } )
        }
    }

    //创建日历
    createCalender( self ) {
        let $pickerBox = $( '.zzc-calendar-box' );
        let $this = $( this );

        // 新打开
        if ( $pickerBox.length == 0 && !$this.hasClass( 'J-zzc-show-calendar' ) ) {
            //传入到this中
            self.getCalendar.call( $this, self );
        }
        //再次点击关闭
        else if ( $this.hasClass( 'J-zzc-show-calendar' ) ) {
            $pickerBox.remove();
            $this.removeClass( 'J-zzc-show-calendar' );
        }
        // 切换显示
        else {
            self.closeCalendar( () => {
                self.getCalendar.call( $this, self );
            } );
        }
    }

    //获取日历
    getCalendar( self ) {
        let data = createCalendar( self.options );

        //保存数据
        self.calendar = data.calendarHTML;
        self.leftData = data.leftData;
        self.rightData = data.rightData;
        self.dateArr = data.dateArr;
        self.leftIndex = data.leftIndex;;
        self.rightIndex = data.rightIndex;
        self.currOpenTarget = this;

        //渲染
        self.render( this, self.calendar, function () {
            //定位
            self.setPickerIndex( self.currOpenTarget );

            self.$pickerBox = $( '.zzc-calendar-box' );

            // 点击除target以外的都会关闭
            $( 'body' ).on( 'click', self.closeCalendar.bind( self ) );
            // 绑定picker内部点击事件
            self.$pickerBox.on( 'click', function ( event ) {
                event.stopPropagation();
                let target = event.target || event.srcElement;
                self.calenderEvent.call(target,self);
            } );
        } );
    }

    //picker内部事件
    calenderEvent( self ) {
        if ( this.tagName == 'TD' ) {
            self.selectDate.call(this,self);
        }
        else if ( $( this ).hasClass( 'arrow' ) && !$( this ).hasClass( 'disable' ) ) {
            let direction = $( this ).attr( 'data-direction' );
            if ( direction == 'left' ) {
                self.leftIndex = --self.leftIndex;
                self.rightIndex = --self.rightIndex;
            } else {
                self.leftIndex = ++self.leftIndex;
                self.rightIndex = ++self.rightIndex;
            }

            self.updateCalender( self.currPickupDate, self.currReturnDate, self.leftIndex, self.rightIndex );
        }
    }

    //点击日期
    selectDate( self ) {
        let $this = $( this );
        //如果点击占位符则跳过
        let isPerch = $this.attr( 'data-perch' );
        if ( isPerch == 'false' ) {
            let data = $this.attr( 'data-date' );
            //当前选择的取还日期都有，则全部清除样式
            if ( self.currPickupDate != null && self.currReturnDate != null ) {
                self.clearCurrSelectClass();
                //记录取日期
                self.currPickupDate = new Date( data ).getTime();
                self.currReturnDate = null;
                $this.addClass( 'start' );
                self.moveToReturnElem();
                self.$pickerBox.on( 'mousemove', self.mousemoveEvent );
            }
            //当有选择取时间，没有还的时候
            else if ( self.currPickupDate != null && self.currReturnDate == null ) {

                //如果当前还的时间比取还早那么这次选择改为选中取时间
                if ( new Date( data ).getTime() < this.currPickupDate ) {
                    self.clearCurrSelectClass();
                    //记录取日期
                    self.currPickupDate = new Date( data ).getTime();
                    self.currReturnDate = null;
                    $this.addClass( 'start' );
                }
                //设置还时间
                else {
                    self.currReturnDate = new Date( data ).getTime();
                    //设置active
                    self.updateCalender( self.currPickupDate, self.currReturnDate );
                    //保存记录选择的日期
                    self.updateDate();
                    self.closeCalendar();
                }
                //默认设置取    
            } else {
                self.currPickupDate = new Date( data ).getTime();
                self.currReturnDate = null;
                $this.addClass( 'start' );
            }
        }
    }

    //鼠标移动
    mousemoveEvent( e ) {
        let target = e.target || e.srcElement;
        if ( target.tagName == 'TD' && !$( target ).hasClass( 'perch' ) && !$( target ).hasClass( 'gone' ) ) {

            let startElem = $( this ).find( '.start' )[0],
                startTime = new Date( $( startElem ).attr( 'data-date' ) ).getTime(),
                endElem = $( target )[0],
                endETime = new Date( $( endElem ).attr( 'data-date' ) ).getTime(),
                tdList = $( this ).find( 'td' ),
                len = tdList.length,
                index = 0,
                isHover = startElem ? false : true;//当没有开始元素，代表可能跨多个月份，则默认一开始未true

            //开始时间大于结束时间跳出循环
            if ( startElem && endElem && startTime > endETime ) {
                $( '.picker-content-box td' ).removeClass( 'hover' );
                return false;
            }

            for ( index; index < len; index++ ) {
                if ( tdList[index] == startElem ) {
                    isHover = true;
                }
                if ( tdList[index] == endElem ) {
                    isHover = false;
                }
                if ( isHover ) {
                    $( tdList[index] ).addClass( 'hover' );
                } else {
                    $( tdList[index] ).removeClass( 'hover' );
                }

            }

        }
    }

    //移动到还时间出发元素上
    moveToReturnElem() {
        if ( this.returnElem && !$( this.returnElem ).hasClass( 'J-zzc-show-calendar' ) ) {
            $( this.pickerElem ).removeClass( 'J-zzc-show-calendar' );
            let calendarTop = $( this.returnElem ).outerHeight();
            let $pickerBox = $( '.zzc-calendar-box' );
            $( this.returnElem ).append( $pickerBox ).addClass( 'J-zzc-show-calendar' );
            $pickerBox.css( { top: calendarTop + 'px' } );
            this.currOpenTarget = this.returnElem;
        }
    }

    //更新日历
    updateCalender( pDate, rDate, leftIndex, rightIndex ) {
        let data = this.updateCalendar( {
            startTime: this.options.startTime,
            endTime: this.options.endTime,
            pickupDate: this.currPickupDate,
            returnDate: this.currReturnDate,
            leftData: this.leftData,
            rightData: this.rightData,
            leftIndex: leftIndex ? leftIndex : null,
            rightIndex: rightIndex ? rightIndex : null
        } );

        //记录数据
        this.dateArr = data.dateArr;
        this.leftIndex = data.leftIndex;;
        this.rightIndex = data.rightIndex;
        this.$pickerBox.html( data.calendarHTML )
    }

    //更新日期
    updateDate() {
        this.options.pickupDate = this.currPickupDate;
        this.options.returnDate = this.currReturnDate;
        this.success( {
            pickupDate: this.currPickupDate,
            returnDate: this.currReturnDate
        } );
    }

    //关闭picker
    closeCalendar( callback ) {
        this.currOpenTarget.removeClass( 'J-zzc-show-calendar' );
        //还远设定
        this.currPickupDate = this.options.pickupDate;
        this.currReturnDate = this.options.returnDate;
        $( '.zzc-calendar-box' ).remove();
        $( 'body' ).off('click', this.closeCalendar );
        this.$pickerBox.off('mousemove', this.mousemoveEvent );
        callback instanceof Function && callback();
    }

    //设置picker的位置
    setPickerIndex( target ) {
        let calendarTop = $( target ).outerHeight();
        $( target ).addClass( 'J-zzc-show-calendar' );
        let $pickerBox = $( '.zzc-calendar-box' );
        $pickerBox.css( { top: calendarTop + 'px' } ).addClass( 'show' );
    }

    //更新日历
    updateCalendar( options ) {
        let data = createPortionCalendar( options );
        return data;
    }

    //清除当前选择的日期样式
    clearCurrSelectClass( className = 'start active end hover' ) {
        $( '.zzc-calendar-content-box td' ).removeClass( className );
    }

    //渲染
    render( parent, elem, callback ) {
        $( parent ).append( elem );
        callback instanceof Function && callback();
    }

}

export default Calender;