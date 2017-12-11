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

        this.initEvent();
    }

    

    
}