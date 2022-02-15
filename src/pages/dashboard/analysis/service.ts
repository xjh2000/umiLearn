import { request } from "umi";
import { tcbGetTempFileURL } from "@/services/cloudbase/api";
import { DayData } from "@/pages/dashboard/analysis/data";
import moment from "moment";

export async function fakeChartData(): Promise<{ data: any }> {
  return request("/api/fake_analysis_chart_data");
}

function adaptData(day: DayData) {
  let data = day.data;
  let newData = data?.map((e) => {
    let t = moment.duration(e.time_continue).asMinutes();
    return { ...e, time_continue: t };
  });
  return { ...day, data: newData };
}

export async function getChartData(agr: any): Promise<DayData> {
  return new Promise(async (resolve, reject) => {
    try {
      let date = agr?.date?.toDate()?.toISOString().substring(0, 10);
      let baseUrl =
        "cloud://visual-time-5gdiwp6tb894caff.7669-visual-time-5gdiwp6tb894caff-1259747411/dayData/";
      let fileName = agr?.uid + "-" + date + ".json";
      let url = await tcbGetTempFileURL(baseUrl + fileName);
      let dayData = await request(url);
      dayData = adaptData(dayData);
      resolve(dayData);
    } catch (e) {
      reject(e);
    }
  });
}
