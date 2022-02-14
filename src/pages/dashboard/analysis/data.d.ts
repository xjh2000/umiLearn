export type DayData = {
  date: string;
  data: DayItem[];
};

export type DayItem = {
  order: number;
  start_time: string;
  end_time: string;
  continue_time: string;
  matter: string;
  type: string;
  status: string;
  describe: string;
};
