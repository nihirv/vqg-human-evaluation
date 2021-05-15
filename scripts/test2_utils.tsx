import _ from "underscore";
import { FlatQuestionType } from "./utils";

export type Test2Questions = {
  id: string;
  q: string;
  type: string;
};

const convertFullObjToTest2Type = (sampleObj: FlatQuestionType[]) => {
  const shuffledSampleObj = _.shuffle(sampleObj);
  const test2Questions = shuffledSampleObj.map<Test2Questions>((obj) => {
    const question: Test2Questions = {
      id: obj.image_id,
      type: obj.type,
      q: obj.generated_q,
    };
    return question;
  });
  return test2Questions;
};

export { convertFullObjToTest2Type };
