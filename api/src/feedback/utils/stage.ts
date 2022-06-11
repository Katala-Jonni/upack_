import { FieldNameStageInterface } from '@app/feedback/types/fieldNameStage.interface';
import { StageEnum } from '@app/common/enum/stage.enum';
import { MapStageInterface, MapStagePartial } from '@app/feedback/types/mapStage.interface';

export const fieldNameStages: FieldNameStageInterface = {
  newS: StageEnum['новый'],
  read: StageEnum['прочитано'],
  // inwork: StageEnum['готовится'],
  // rejected: StageEnum['отменено'],
  // close: StageEnum['закрыто'],
};

// const { newS, read, inwork, rejected, close } = fieldNameStages;
const { newS, read } = fieldNameStages;

export const ignoreStages: readonly string[] = [newS, read];
export const mapStage: MapStagePartial<FieldNameStageInterface, MapStageInterface> = {
  newS: {
    title: newS,
  },
  read: {
    title: read,
    // actions: [inwork, rejected],
  },
  // inwork: {
  //   title: inwork,
  //   actions: [rejected, close],
  // },
  // close: {
  //   title: close,
  //   actions: [],
  // },
};
