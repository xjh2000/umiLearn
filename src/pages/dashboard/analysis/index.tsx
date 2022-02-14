import { FC, useEffect, useState } from "react";
import moment from "moment";
import RcResizeObserver from "rc-resize-observer";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { DatePicker } from "antd";
import { useRequest } from "@@/plugin-request/request";
import { fakeChartData } from "@/pages/dashboard/analysis/service";
import { Line, LineConfig } from "@ant-design/charts";

const Analysis: FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: LineConfig = {
    data,
    autoFit: true,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  //TODO DayData fetch function
  const {
    data: oneDay,
    loading: loading,
    run: pickData,
  } = useRequest<any>(fakeChartData, {
    manual: true,
  });

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="数据概览"
        extra={
          <DatePicker
            onChange={(date: moment.Moment | null) => {
              pickData(date);
            }}
          />
        }
        split={responsive ? "horizontal" : "vertical"}
        headerBordered
        bordered
      >
        <StatisticCard loading={loading} chart={<Line {...config} />} />
      </ProCard>
    </RcResizeObserver>
  );
};

export default Analysis;
