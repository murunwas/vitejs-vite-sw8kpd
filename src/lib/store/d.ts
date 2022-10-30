import type {DataFrame,Series} from "danfojs"


export default class Danfo {

  df:DataFrame
  constructor() {
     this.df = new window.dfd.DataFrame();
  }

  f() {
    let data = window.dfd.dateRange({ start: "2000-01-01", end: "2000-01-01 23:59", freq: "m" });
    let sf = new window.dfd.Series(data);
    //print the series
    sf.print();
  }
}

new Danfo().f()
