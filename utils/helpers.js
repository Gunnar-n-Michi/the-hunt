export function conditionalRender(condition, content) {
  console.log ("In conditional render")
    if (condition) {
        return content;
    } else {
        return null;
    }
}

export class Monoflop {

    constructor(_callback, _time) {
      this.callback = _callback
      this.time = _time;
      this.handler = null
    }

    start = (_data, _time) => {

      this.data = _data
      // clearTimeout(this.handler)
      this.handler = setTimeout(() => {
         this.callback(this.data)
       }, _time);

    }

    stop = (_data) => {
      this.data = _data
      clearTimeout(this.handler)
      this.callback(this.data)
    }

    clear = () => {
      clearTimeout(this.handler)
    }

}
