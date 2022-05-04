const fs = require("fs");
import _ from "underscore";

interface JSONType {
  image_id: {
    category: string;
    objects: string;
    generated_q: string;
    real_q: string;
    type: string;
    image_url: string;
  };
}

export interface FlatQuestionType {
  image_id: string;
  category: string;
  objects: string;
  generated_q: string;
  real_q: string;
  type: string;
  image_url: string;
}

const randomlySample = (
  type: "explicit" | "implicit" | "baseline",
  k: number
): FlatQuestionType[] => {
  let samples: JSONType;
  if (type === "explicit") {
    samples = require("./explicit_chosen_samples.json");
  } else if (type === "implicit") {
    samples = require("./nv-implicit_chosen_samples.json");
    // samples = require("./implicit_chosen_samples.json");
  } else if (type === "baseline") {
    samples = require("./baseline_chosen_samples.json");
  }
  const sampleKeys = _.sample(Object.keys(samples), k);
  const newObject = sampleKeys.map<FlatQuestionType>((image_id) => {
    return { image_id, ...samples[image_id] };
  });
  return newObject;
};

const getTruePairs = (k = 20): FlatQuestionType[] => {
  const samples = require("./true_pairs_samples.json");
  const sampleKeys = _.sample(Object.keys(samples), k);
  const newObject = sampleKeys.map<FlatQuestionType>((image_id) => {
    return { image_id, ...samples[image_id] };
  });
  return newObject;
};

const getAdversarialPairs = (k = 20): FlatQuestionType[] => {
  const samples = require("./adversarial_pairs_samples.json");
  const sampleKeys = _.sample(Object.keys(samples), k);
  const newObject = sampleKeys.map<FlatQuestionType>((image_id) => {
    return { image_id, ...samples[image_id] };
  });
  return newObject;
};

export { randomlySample, getTruePairs, getAdversarialPairs };
export type { JSONType };
