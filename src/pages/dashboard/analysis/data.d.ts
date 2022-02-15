export type DayData = {
  date?: string;
  data?: DayItem[];
};

export type DayItem = {
  order: number;
  time_start: string;
  time_end: string;
  time_continue: string;
  ratio: string;
  matter: string;
  type: string;
  status: string;
  describe: string;
};
