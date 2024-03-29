class Countdown {
    elem: Element | null;
    seconds: number;
    totalTime: number;
    usedTime: number;
    startTime: number;
    timer: null | ReturnType<typeof setInterval>;
    finishCallback: () => void;
    isActive: boolean;

    constructor(elem: Element | null, seconds: number, finishCallback: () => void) {
        this.elem = elem;
        this.seconds = seconds;
        this.totalTime = seconds * 100;
        this.usedTime = 0;
        this.startTime = +new Date();
        this.timer = null;
        this.finishCallback = finishCallback;
        this.isActive = false;
    }

    count() {
        if (!this.isActive)  {
            clearInterval(this.timer as ReturnType<typeof setInterval>);
        }

        this.usedTime = Math.floor((+new Date() - this.startTime) / 10);

        const tt = this.totalTime - this.usedTime;
        if (tt <= 0) {
            if (this.isActive) {
                this.finishCallback();
            }
            clearInterval(this.timer as ReturnType<typeof setInterval>);
        } else {
            // const mi = Math.floor(tt / (60 * 100));
            // sessionStorage.setItem('time', `${tt - mi * 60 * 100}`);
            const ss = Math.floor((tt) / 100);
            // var ms = tt - Math.floor(tt / 100) * 100;
            if (this.elem) {
                this.elem.innerHTML = `${ss}`;
            }
        }
    }
    init(){
        if(this.timer){
            clearInterval(this.timer);
            if (this.elem) {
                this.elem.innerHTML = `${this.seconds}`;
            }
            this.totalTime = this.seconds * 100;
            this.usedTime = 0;
            this.startTime = +new Date();
            this.timer = null;
        }
    }
    start(){
        if(!this.timer){
            this.timer = setInterval(this.count.bind(this), 1);
            this.isActive = true;
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.isActive = false;
        this.finishCallback();
    }
}
export default Countdown;
