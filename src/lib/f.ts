import { Collect } from "@supercharge/collections";
import { merge, keyBy, values, head, last } from "lodash";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import { maxDate, minDate } from "./utils";

import type { DeviceTelemetry } from "./types";

export const formatter = async (telemetry:DeviceTelemetry[][],metric = "realPower") => {
    console.time("charge");
  let m = await Collect(telemetry).reduce(
    (acc, item, index, array) => {
      const isLast = index === array.length - 1;
      if (item.length) {
        const first = head(item);
        const lastItem = last(item);
        acc.dates.push(first.eventTimeStamp);
        acc.dates.push(lastItem.eventTimeStamp);

        acc.maxDate = maxDate(acc.dates);
        acc.minDate = minDate(acc.dates);
      }

      if (isLast) {
        let checkDate = {
          max: dayjs(acc.maxDate),
          min: dayjs(acc.minDate),
        };
        while (checkDate.min.isSameOrBefore(checkDate.max, "minute")) {
          acc.minuteSeries.push({
            customdate: checkDate.min.format("DD-MM-YYYY HH:mm"),
            formatDate: checkDate.min,
          });
          checkDate.min = checkDate.min.add(1, "minute");
        }
      }

      return acc;
    },
    {
      dates: [],
      minuteSeries: [],
      minDate: new Date(),
      maxDate: new Date(),
    }
  );

  let all = await Collect(telemetry)
    .filter((d) => d.length > 0)
    .reduce(
      (acc, item) => {
        let arr = [...m.minuteSeries];
        let name = `${item[0].name} ${item[0].devId}`;
        var merged = merge(
          keyBy(arr, "customdate"),
          keyBy(item, function (o) {
            return dayjs(o.eventTimeStamp).format("DD-MM-YYYY HH:mm");
          })
        );

        var series = values(merged).map((d) => (d[metric] ? d[metric] : null));

        acc.legend.push(name);
        acc.series.push({
          name,
          type: "line",
          data: series,
        });
        return acc;
      },
      { series: [], legend: [], xAxis: {} }
    );

  all.xAxis = {
    type: "category",
    data: m.minuteSeries.map((date) =>
      date.formatDate.format("DD-MM-YYYY HH:mm")
    ),
  };
  console.timeEnd("charge");
  return all;
};
