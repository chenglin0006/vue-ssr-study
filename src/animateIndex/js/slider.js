export default {
    pageTouchStart(e) {
        let {targetTouches} = e;
        let {clientY} = targetTouches[0];
        this.startY = clientY;
    },
    pageTouchMove(e) {
    },
    pageTouchEnd(e) {
        let {changedTouches} = e;
        let {clientY} = changedTouches[0];
        let touchMoveDistance = clientY - this.startY;
        
        if (touchMoveDistance < 0 && Math.abs(touchMoveDistance) > 50 && this.curIndex < this.leng - 1) {
            this.curIndex++;
        } else if (touchMoveDistance > 0 && Math.abs(touchMoveDistance) > 50 && this.curIndex > 0) {
            this.curIndex--;
        }
        
        console.log(this.curIndex);
    }
}