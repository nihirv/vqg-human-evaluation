import { FlatQuestionType } from "./utils";

export type Test3Questions = {
  id: string;
  q: string;
  objects: string;
  category: string;
  url: string;
};

const convertFullObjToTest3Type = (sampleObj: FlatQuestionType[]) => {
  const test3Questions = sampleObj.map<Test3Questions>((obj) => {
    const question: Test3Questions = {
      id: obj.image_id,
      q: obj.generated_q,
      objects: obj.objects,
      category: obj.category,
      url: obj.image_url,
    };
    return question;
  });
  return test3Questions;
};

export { convertFullObjToTest3Type };
