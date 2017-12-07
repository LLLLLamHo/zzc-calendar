import '../scss/index.scss';
import Calender from './Calender';
export class Picker extends Calender {
    constructor( opt ) {

        super( opt );

        this.pickerElem = opt.pickerElem ? opt.pickerElem : null;
        this.returnElem = opt.returnElem ? opt.returnElem : null;
        this.success = opt.success ? opt.success : function () { };

        let startTime = new Date();
        let endDate = new Date();

        this.calendar = null;
        this.leftData = null;
        this.rightData = null;
        this.dateArr = null;
        this.leftIndex = 0;
        this.rightIndex = 1;

        //选择的时间
        this.currPickupDate = opt.pickupDay ? new Date( opt.pickupDay ).getTime() : null;
        this.currReturnDate = opt.returnDay ? new Date( opt.returnDay ).getTime() : null;

        this.options = {
            startTime: startTime,
            endTime: new Date( endDate.setFullYear( endDate.getFullYear() + 1 ) ),
            pickupDate: this.currPickupDate,
            returnDate: this.currReturnDate
        }

        this.initEvent( { pickerElem: this.pickerElem, returnElem: this.returnElem } );
    }

    //初始事件
    initEvent( elems ) {
        let _this = this;
        for ( let key in elems ) {
            elems[key] && $( elems[key] ).on( 'click', function ( event ) {
                event.stopPropagation();
                let $pickerBox = $( '.picker-box' );
                let $this = $( this );

                // 新打开
                if ( $pickerBox.length == 0 && !$this.hasClass( 'show-picker' ) ) {
                    //传入到this中
                    _this.showcalendar( $this );
                }
                //再次点击关闭
                else if ( $this.hasClass( 'show-picker' ) ) {
                    $pickerBox.remove();
                    $this.removeClass( 'show-picker' );
                }
                // 切换显示
                else {
                    _this.closeCalendar( () => {
                        _this.showcalendar( $this );
                    } );
                }
            } );
        }
    }

    //picker内部事件
    pickerEvent( target ) {
        if ( target.tagName == 'TD' ) {
            this.clickDate( target );
        }
        else if ( $( target ).hasClass( 'arrow' ) && !$( target ).hasClass( 'disable' ) ) {
            let direction = $( target ).attr( 'data-direction' );
            if ( direction == 'left' ) {
                this.leftIndex = --this.leftIndex;
                this.rightIndex = --this.rightIndex;
            } else {
                this.leftIndex = ++this.leftIndex;
                this.rightIndex = ++this.rightIndex;
            }

            this.updateCalender( this.currPickupDate, this.currReturnDate, this.leftIndex, this.rightIndex );
        }
    }

    //打开picker
    showcalendar( target ) {
        let data = this.getCalendar( this.options );

        //保存数据
        this.calendar = data.calendarHTML;
        this.leftData = data.leftData;
        this.rightData = data.rightData;
        this.dateArr = data.dateArr;
        this.leftIndex = data.leftIndex;;
        this.rightIndex = data.rightIndex;
        this.currOpenTarget = target;

        let _this = this;
        
        //插入到dom中
        this.render( target, this.calendar, function () {
            //定位
            this.setPickerIndex( target );

            this.$pickerBox = $( '.picker-box' );


            // 点击除target以外的都会关闭
            this.addEvent( $( 'body' )[0], 'click', this.closeCalendar.bind( this ) );
            // 绑定picker内部点击事件
            this.addEvent( this.$pickerBox[0], 'click', function ( event ) {
                event.stopPropagation();
                let target = event.target || event.srcElement;
                _this.pickerEvent( target );
            } );
        } );
    }

    //设置picker的位置
    setPickerIndex( target ) {
        let calendarTop = $( target ).outerHeight();
        $( target ).addClass( 'show-picker' );
        let $pickerBox = $( '.picker-box' );
        $pickerBox.css( { top: calendarTop + 'px' } ).addClass( 'show' );
    }

    //点击日期
    clickDate( target ) {
        let $target = $( target );
        //如果点击占位符则跳过
        let isPerch = $target.attr( 'data-perch' );
        if ( isPerch == 'false' ) {
            let data = $target.attr( 'data-date' );
            //当前选择的取还日期都有，则全部清除样式
            if ( this.currPickupDate != null && this.currReturnDate != null ) {
                this.clearCurrSelectClass();
                //记录取日期
                this.currPickupDate = new Date( data ).getTime();
                this.currReturnDate = null;
                $target.addClass( 'start' );
                this.moveToReturnElem();
                this.addEvent( this.$pickerBox[0], 'mousemove', this.mousemoveEvent);
            }
            //当有选择取时间，没有还的时候
            else if ( this.currPickupDate != null && this.currReturnDate == null ) {

                //如果当前还的时间比取还早那么这次选择改为选中取时间
                if ( new Date( data ).getTime() < this.currPickupDate ) {
                    this.clearCurrSelectClass();
                    //记录取日期
                    this.currPickupDate = new Date( data ).getTime();
                    this.currReturnDate = null;
                    $target.addClass( 'start' );
                }
                //设置还时间
                else {
                    this.currReturnDate = new Date( data ).getTime();
                    //设置active
                    this.updateCalender( this.currPickupDate, this.currReturnDate );
                    //保存记录选择的日期
                    this.updateDate();
                    this.closeCalendar();
                }
                //默认设置取    
            } else {
                this.currPickupDate = new Date( data ).getTime();
                this.currReturnDate = null;
                $target.addClass( 'start' );
            }
        }
    }

    //鼠标移动
    mousemoveEvent( e ) { 
        let target = e.target || e.srcElement;
        if ( target.tagName == 'TD' && !$(target).hasClass('perch') && !$(target).hasClass('gone')) { 

            let startElem = $( this ).find( '.start' )[0],
                startTime = new Date($( startElem ).attr('data-date')).getTime(),   
                endElem = $( target )[0],
                endETime = new Date($( endElem ).attr('data-date')).getTime(),
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
                if ( tdList[index] == startElem) { 
                    isHover = true;
                }
                if ( tdList[index] == endElem) { 
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
        if ( this.returnElem && !$( this.returnElem ).hasClass( 'show-picker' ) ) {
            $( this.pickerElem ).removeClass( 'show-picker' );
            let calendarTop = $( this.returnElem ).outerHeight();
            let $pickerBox = $( '.picker-box' );
            $( this.returnElem ).append( $pickerBox ).addClass( 'show-picker' );
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
        $( '.picker-box' ).html( data.calendarHTML )
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
        this.currOpenTarget.removeClass( 'show-picker' );
        //还远设定
        this.currPickupDate = this.options.pickupDate;
        this.currReturnDate = this.options.returnDate;
        $( '.picker-box' ).remove();
        this.removeEvent( $( 'body' )[0], 'click', this.closeCalendar);
        this.removeEvent( this.$pickerBox[0], 'mousemove', this.mousemoveEvent);
        callback instanceof Function && callback();
    }

    //渲染
    render( target, elem, callback ) {
        $( target ).append( elem );
        callback instanceof Function && callback.call(this);
    }
}