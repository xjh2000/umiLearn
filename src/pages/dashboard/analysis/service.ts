import { request } from "umi";

export async function fakeChartData(): Promise<{ data: any }> {
  return request("/api/fake_analysis_chart_data");
}
