import axios from "axios";
import { AnualReportApi } from "../../../infrastructure/Api/AnualReport/AnualReportApi";
import { URL_API } from "../../../utils/constans";

const anualreport = new AnualReportApi(
  axios.create({
    baseURL: URL_API,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
);


self.onmessage = async (event) => {
  const { task_id } = event.data;

  const checkTaskStatus = async () => {
    await anualreport.getTaskEndAnualReport(task_id).then((res) => {
      const task =  res;
      self.postMessage(task);

      if (
        task.data.task_status !== "SUCCESS" &&
        task.data.task_status !== "FAILURE"
      ) {
        setTimeout(checkTaskStatus, 10000);
      }
    }).catch((err) => {
      console.log(err);
    })
    
  };

  checkTaskStatus();
};
