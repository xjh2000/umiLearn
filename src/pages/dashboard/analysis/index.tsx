import { FC, useState } from "react";
import moment from "moment";
import RcResizeObserver from "rc-resize-observer";
import ProCard, { StatisticCard } from "@ant-design/pro-card";
import { DatePicker } from "antd";
import { useRequest } from "@@/plugin-request/request";
import { getChartData } from "@/pages/dashboard/analysis/service";
import { Column, ColumnConfig } from "@ant-design/charts";
import { useModel } from "@@/plugin-model/useModel";

const Analysis: FC = () => {
  const [responsive, setResponsive] = useState(false);
  const { initialState } = useModel("@@initialState") as any;

  const {
    data: oneDay,
    loading: loading,
    run: pickData,
  } = useRequest<any>(getChartData, {
    manual: true,
  });

  const config: ColumnConfig = {
    data: oneDay,
    autoFit: true,
    padding: "auto",
    xField: "order",
    yField: "time_continue",
    meta: {
      order: {
        formatter: (value) => {
          return oneDay[value].matter;
        },
      },
      time_continue: {
        alias: "duration",
        type: "linear",
      },
    },
    xAxis: {
      tickCount: 5,
    },
    slider: {},
  };

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
              pickData({ date: date, uid: initialState.currentUser.uid });
            }}
          />
        }
        split={responsive ? "horizontal" : "vertical"}
        headerBordered
        bordered
      >
        <StatisticCard
          loading={loading}
          chart={oneDay && <Column {...config} />}
        />
      </ProCard>
    </RcResizeObserver>
  );
};

export default Analysis;
