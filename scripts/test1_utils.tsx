import _ from "underscore";
import { FlatQuestionType } from "./utils";

export type Test1Questions = {
  id: string;
  q1: string;
  q2: string;
  gt: string;
  type: string;
  url: string;
};

const convertFullObjToTest1Type = (sampleObj: FlatQuestionType[]) => {
  const shuffledSampleObj = _.shuffle(sampleObj);
  const test1Questions = shuffledSampleObj.map<Test1Questions>((obj) => {
    let q1 = "";
    let q2 = "";
    if (Math.random() > 0.5) {
      q1 = obj.generated_q;
      q2 = obj.real_q;
    } else {
      q1 = obj.real_q;
      q2 = obj.generated_q;
    }
    const question: Test1Questions = {
      id: obj.image_id,
      q1,
      q2,
      type: obj.type,
      gt: obj.real_q,
      url: obj.image_url,
    };
    return question;
  });
  return test1Questions;
};

export { convertFullObjToTest1Type };
