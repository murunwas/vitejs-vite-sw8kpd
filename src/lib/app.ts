import { merge, keyBy, values } from "lodash";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import { maxDate, minDate } from "./utils";

export const merge1 = (multipleDeviceEvents=[],metric="realPower") => {
    const dates = [];

    for (let index = 0; index < multipleDeviceEvents.length; index++) {
        const element = multipleDeviceEvents[index];
        if (element.length) {
            const [first, ...rest] = element;
            dates.push(first.eventTimeStamp);
            dates.push(rest.pop().eventTimeStamp);
        }
    }

    let checkDate = {
        max: dayjs(maxDate(dates)),
        min: dayjs(minDate(dates)),
    };

    const minuteSeries = [];
    while (checkDate.min.isSameOrBefore(checkDate.max, "minute")) {
        minuteSeries.push({
            customdate: checkDate.min.format("DD-MM-YYYY HH:mm"),
            formatDate: checkDate.min,
        });
        checkDate.min = checkDate.min.add(1, "minute");
    }

    let valuesResults = multipleDeviceEvents.reduce(
        (acc, curr) => {
            if (curr.length == 0) return acc;
            let arr = [...minuteSeries];
            var merged = merge(
                keyBy(arr, "customdate"),
                keyBy(curr, function (o) {
                    return dayjs(o.eventTimeStamp).format("DD-MM-YYYY HH:mm");
                })
            );
            let event = curr[0];
            var series = values(merged).map((d) =>
                d[metric] ? d[metric] : null
            );
            acc.legend.push(`${event.name} (${event.devId})`);
            acc.data.push({
                name: `${event.name} (${event.devId})`,
                type: "line",
                data: series,
            });

            return acc;
        },
        {
            name: "",
            data: [],
            legend: [],
            type: "line",
            markArea: {},
        }
    );

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
            text: "title",
            show: true,
            textStyle: {
                fontSize: 14,
                align: "center",
            },
        },
        xAxis: {
            type: "category",
            data: minuteSeries.map((date) =>
                date.formatDate.format("DD-MM-YYYY HH:mm")
            ),
        },
        yAxis: { type: "value", name: "RealPower" },
        series: valuesResults.data,
        legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 40,
            bottom: 20,
            data: valuesResults.legend,
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

    return options;
};
