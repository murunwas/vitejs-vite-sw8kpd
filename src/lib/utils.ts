import * as echarts from 'echarts';

export const maxDate = (arr: any = []) => {
  return new Date(
    Math.max(
      ...arr.map((element) => {
        return new Date(element);
      })
    )
  );
};

// ✅ Get Min date
export const minDate = (arr: any = []) => {
  return new Date(
    Math.min(
      ...arr.map((element) => {
        return new Date(element);
      })
    )
  );
};


export const initChart=(elem,options)=>{
    var myChart = echarts.init(elem);
    myChart.setOption(options);
}