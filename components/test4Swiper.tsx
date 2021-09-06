import React, { useState, useMemo, useEffect } from "react";
import styles from "../styles/swipe.module.css";
import TinderCard from "react-tinder-card";
import homeStyles from "../styles/Home.module.css";
import {
  convertFullObjToTest4Type,
  Test4Questions,
} from "../scripts/test4_utils";
import {
  getAdversarialPairs,
  getTruePairs,
  randomlySample,
} from "../scripts/utils";

const trueSamples = getTruePairs();
const adversarialSamples = getAdversarialPairs();
const samplesForTest4 = convertFullObjToTest4Type(
  trueSamples,
  adversarialSamples
);
let questionsState = samplesForTest4;

const alreadyRemoved = [];
const csvArrayState = [];

interface SwiperProps {
  userName: string;
}
const Test4Swiper: React.FC<SwiperProps> = ({ userName }) => {
  const [questions, setquestions] = useState(samplesForTest4);
  const [isFinished, setIsFinished] = useState(false);
  const [csvDownloadState, setCsvDownloadState] = useState({
    encodedUri: "",
    filename: "",
  });

  const childRefs = useMemo<any>(
    () =>
      Array(samplesForTest4.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const outOfFrame = (direction: string, question: Test4Questions) => {
    const id = question.id;
    let chosenAnswer = "";
    if (direction === "left") {
      chosenAnswer = "false";
    } else if (direction === "right") {
      chosenAnswer = "true";
    }
    const csvString = [id.toString(), chosenAnswer, question.true_pair];

    csvArrayState.push(csvString);
    questionsState = questionsState.filter(
      (questionFromState) => questionFromState.id !== id
    );
    setquestions(questionsState);

    if (questionsState.length === 0) {
      setIsFinished(true);
      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvArrayState.map((e) => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      setCsvDownloadState({
        filename: userName + "_" + "test4.csv",
        encodedUri,
      });
    }
  };

  const swipe = (dir) => {
    const cardsLeft = questions.filter(
      (person) => !alreadyRemoved.includes(person.id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = questions.map((person) => person.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const performSwipeKeyPress = (keypress: string) => {
    if (keypress === "ArrowRight") {
      swipe("right");
    } else if (keypress === "ArrowLeft") {
      swipe("left");
    }
  };

  return (
    <div
      className={styles.app}
      onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) =>
        performSwipeKeyPress(e.key)
      }
      tabIndex={-1}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      {isFinished ? (
        <div className={homeStyles.container} style={{ minHeight: "auto" }}>
          <p className={homeStyles.description}>
            <span style={{ color: "#0070f3" }}>
              <b>
                <a
                  href={csvDownloadState.encodedUri}
                  download={csvDownloadState.filename}
                >
                  Click here to download the results CSV
                </a>
              </b>
            </span>
          </p>
          <p>and then...</p>
          <div className={homeStyles.card}>
            <p>
              You're done! Please zip your CSVs and send them across to me! :)
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.tinderCardContainerNoImage}>
          <p className={styles.activateKeyPress}>
            Please wait for all images to finish downloading before starting
            with the experiment. If the left/right keypress doesn't work, click{" "}
            <u>HERE</u> text to activate it{" "}
          </p>
          {questions.map((question, index) => {
            const random = Math.random(); // need to append a random number to the end of an image url otherwise some kind of caching kicks in and the image stays in the cache

            return (
              <TinderCard
                ref={childRefs[index]}
                // @ts-ignore
                className={styles.swipe}
                key={question.id}
                onCardLeftScreen={(dir) => outOfFrame(dir, question)}
                preventSwipe={["up", "down"]}
              >
                <div>
                  <div className={styles.tinderCardNoImage}>
                    <p>
                      <b>Objects:</b> {question.objects}
                    </p>

                    <p>
                      <b>Question:</b> {question.q}
                    </p>
                  </div>
                </div>
              </TinderCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Test4Swiper;
