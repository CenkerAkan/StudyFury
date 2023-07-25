export default class timerHelper{
    constructor(root){
        console.log(root);
        root.innerHTML=timerHelper.getHTML();   


        this.el={
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            constrol: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--clear"),
            clearTimer: root.querySelector(".timer__btn--clear")

        };
        console.log(this.el);
    }
    static getHTML(){
        return `<span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        <button type="button" class="timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
        </button>   
    
        <button type="button" class="timer__btn timer__btn--clear">
            <span class="material-icons">stop_circle</span>
        </button> 
    
        <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer</span>
        </button> `;
    }
}
