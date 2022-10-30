export const chartData=({
    series={},
    legendData=[],
    title="",
    subTitle="",
    xAxis={}
})=>{
    let options: any = {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {},
                dataView: { readOnly: true },
                magicType: { type: ["line", "bar"] },
            },
        },
        title: {
            text: title||"",
            show: true,
            textStyle: {
                fontSize: 14,
                align: "center",
            },
        },
        xAxis,
        yAxis: { type: "value", name: subTitle },
        series,
        legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 40,
            bottom: 20,
            data: legendData,
        },
    };

    options.dataZoom = [
        {
            show: true,
            realtime: true,
            type: "slider",
            start: true ? 40 : 0,
            end: 100,
            xAxisIndex: [0, 1],
        },
        {
            type: "inside",
            realtime: true,
            start: true ? 40 : 0,
            end: 100,
            xAxisIndex: [0, 1],
        },
    ];

    return options
}