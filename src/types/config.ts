import { ChartCommit, TemplateAlias } from 'src/types/slides';
import { User, UserId } from './entities';

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

export type DiagramCategories = 'extra' | 'max' | 'mid' | 'min';

export type SlideConfigDiagram = SlideConfigBase & {
  totalText: (value: number) => string | number;
  differenceText: (value: number) => string | number;
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

export type SlideDataDiagram = {};

export type SlideDataActivity = {};

export type SlideData =
  | SlideDataLeaders
  | SlideDataVote
  | SlideDataChart
  | SlideDataDiagram
  | SlideDataActivity;
