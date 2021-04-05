import { ChartCommit, TemplateAlias } from 'src/types/slides';
import { User, UserId } from 'src/types/entities';

export type SlideConfigBase = {
  alias: TemplateAlias;
  title: string;
};

export type SlideConfigLeaders = SlideConfigBase & {
  emoji: string;
  valueText: (value: number) => string | number;
};

export type SlideConfigVote = SlideConfigBase & {
  emoji: string;
  valueText: (value: number) => string | number;
};

export type SlideConfigChart = SlideConfigBase & {
  valueText: (value: number) => string | number;
};

export type SlideConfigDiagram = SlideConfigBase & {
  totalText: (value: number) => string;
  differenceText: (value: number) => string;
  valueText: (value: number) => string | number;
  categories: {
    [key: string]: string;
  };
};

export type SlideConfigActivity = SlideConfigBase;

export type SlideConfig =
  | SlideConfigLeaders
  | SlideConfigVote
  | SlideConfigChart
  | SlideConfigDiagram
  | SlideConfigActivity;

export type SlideDataLeaders = {
  users: Map<UserId, User>;
  usersCommitsMap: Map<UserId, number>;
};

export type SlideDataVote = {
  users: Map<UserId, User>;
  usersLikesMap: Map<UserId, number>;
};

export type SlideDataChart = {
  users: Map<UserId, User>;
  usersCommitsMap: Map<UserId, number>;
  commits: ChartCommit[];
};

export type CommitCategory = 'extra' | 'max' | 'mid' | 'min';

export type SprintCommitStatisticsData = {
  stats: Map<CommitCategory, number>;
  total: number;
};

export type SlideDataDiagram = {
  currentSprint: SprintCommitStatisticsData;
  prevSprint: SprintCommitStatisticsData;
};

export type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type SlideDataActivity = {
  dailyCommitStatistics: Map<WeekDay, number[]>;
};

export type SlideData =
  | SlideDataLeaders
  | SlideDataVote
  | SlideDataChart
  | SlideDataDiagram
  | SlideDataActivity;
