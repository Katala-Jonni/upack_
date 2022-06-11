export interface MapStageInterface {
  readonly title?: string,
  readonly actions?: string[]
}

export type MapStagePartial<T, K> = {
  [F in keyof T]?: K;
};
