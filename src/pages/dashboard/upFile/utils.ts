import _ from "lodash";
import { read, utils } from "xlsx";
import { DayData, DayItem } from "@/pages/dashboard/analysis/data";
import moment from "moment";
import { tcbUpLoadFile } from "@/services/cloudbase/api";

const xlsxToArray = async (file: File) => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  return utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
    header: 1,
    raw: false,
  });
};

/**
 *  convert A 2DArray To A SpecificObject (DayData)
 *  <p>
 *      moment : convert string to utc std time
 *  </p>
 * @param array 2DArray
 */
const convertStdDayData = (array: [][]) => {
  // filter empty element
  let temp: any = _.filter(array, (o) => {
    return o.at(1);
  });

  // date format
  let target: DayData = {};
  let date = moment.parseZone(temp[1][0] + "+08:00", "MMDDYYZZ"); // timeZone deal
  target.date = date.toISOString();

  // dataItem format
  let data = new Array<DayItem>(temp.length - 1);
  for (let i = 0; i < temp.length - 1; i++) {
    let start_time = date.clone().add(moment.duration(temp[i + 1][1]));
    let continue_time = moment.duration(temp[i + 1][5]);
    let end_time = start_time.clone().add(continue_time);
    data[i] = {
      ...data[i],
      order: i,
      time_start: start_time.toISOString(),
      matter: temp[i + 1][2],
      type: temp[i + 1][3],
      status: temp[i + 1][4],
      time_continue: continue_time.toISOString(),
      describe: temp[i + 1][6],
      ratio: temp[i + 1][7],
      time_end: end_time.toISOString(),
    };
  }
  target.data = data;
  return target;
};

const xlsxToJson = async (file: File) => {
  let array = await xlsxToArray(file);
  let dayData = convertStdDayData(array as any);
  let content = JSON.stringify(dayData);
  let blob = new Blob([content], { type: "text/plain;charset=utf-8" }); // 把数据转化成blob对象

  return new File([blob], file.name.replace(/.\w*$/, ".json"), {
    lastModified: Date.now(),
  }); // blob转file
};

export const myBeforeUpload = (file: File, fileList: File[]) => {
  return new Promise<File>(async (resolve, reject) => {
    try {
      let newFile = await xlsxToJson(file);
      let position = fileList.indexOf(file);
      fileList[position] = newFile;
      resolve(newFile);
    } catch (e) {
      reject(e);
    }
  });
};

export const myCustomRequest = async (
  uid: string,
  file: File,
  onError: (event: Error, body?: Object) => void,
  onProgress: (event: { percent: number }) => void,
  onSuccess: (body: Object) => void
) => {
  // prepare variable
  let onUploadProgress = (progressEvent: ProgressEvent) => {
    let percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    onProgress({ percent: percentCompleted });
  };

  // concat cloud Path
  let cloudPath = "dayData/";
  let fileName = file.name;
  fileName = uid + "-" + fileName;
  cloudPath = cloudPath + fileName;

  // upload file
  try {
    let result = await tcbUpLoadFile(cloudPath, file, onUploadProgress);
    onSuccess(result);
  } catch (e) {
    onError(e as any);
  }
};
