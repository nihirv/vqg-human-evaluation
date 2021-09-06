import { FlatQuestionType } from "./utils";
import _ from "lodash";

export type Test4Questions = {
  id: string;
  q: string;
  objects: string;
  true_pair: boolean;
};

const convertFullObjToTest4Type = (
  truePairsObj: FlatQuestionType[],
  adversarialPairsObj: FlatQuestionType[]
) => {
  const truePairs = truePairsObj.map<Test4Questions>((obj) => ({
    id: obj.image_id,
    q: obj.generated_q,
    objects: obj.objects,
    true_pair: true,
  }));
  const adversarialPairs = adversarialPairsObj.map<Test4Questions>((obj) => ({
    id: obj.image_id,
    q: obj.generated_q,
    objects: obj.objects,
    true_pair: false,
  }));
  const allQuestions = _.shuffle([...truePairs, ...adversarialPairs]);
  return allQuestions;
};

export { convertFullObjToTest4Type };
