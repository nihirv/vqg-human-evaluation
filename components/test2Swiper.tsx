import React, { useState, useMemo, useEffect } from "react";
import styles from "../styles/swipe.module.css";
import TinderCard from "react-tinder-card";
import homeStyles from "../styles/Home.module.css";
import Link from "next/link";
import { randomlySample } from "../scripts/utils";
import {
  convertFullObjToTest2Type,
  Test2Questions,
} from "../scripts/test2_utils";

const lenEach = 35;
const totalLen = lenEach * 3;
const explicitSamples = randomlySample("explicit", lenEach);
const implicitSamples = randomlySample("implicit", lenEach);
const baselineSamples = randomlySample("baseline", lenEach);
const samplesForTest2 = convertFullObjToTest2Type([
  ...explicitSamples,
  ...implicitSamples,
  ...baselineSamples,
]);
let questionsState = samplesForTest2;

const alreadyRemoved = [];
const csvArrayState = [];

interface SwiperProps {
  userName: string;
}

const Test2Swiper: React.FC<SwiperProps> = ({ userName }) => {
  const [questions, setquestions] = useState(samplesForTest2);
  const [isFinished, setIsFinished] = useState(false);
  const [csvDownloadState, setCsvDownloadState] = useState({
    encodedUri: "",
    filename: "",
  });

  const childRefs = useMemo<any>(
    () =>
      Array(totalLen)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const outOfFrame = (direction: string, question: Test2Questions) => {
    const id = question.id;
    let chosenAnswer = "";
    if (direction === "left") {
      chosenAnswer = "false";
    } else if (direction === "right") {
      chosenAnswer = "true";
    }
    const csvString = [id.toString(), chosenAnswer, question.type];

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
        filename: userName + "_" + "test2.csv",
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
          <Link
            href={{ pathname: "/test3", query: { name: userName } }}
            passHref
          >
            <a className={homeStyles.card}>
              <h2>Test 3 &rarr;</h2>
              <p>
                Whether a generated question is relevant to the image and
                objects
              </p>
            </a>
          </Link>
        </div>
      ) : (
        <div className={styles.tinderCardContainerNoImage}>
          <p className={styles.activateKeyPress}>
            (If the keypress doesn't work, click on this text to activate it)
          </p>
          {questions.map((question, index) => (
            <TinderCard
              ref={childRefs[index]}
              className={styles.swipe}
              key={question.id}
              onCardLeftScreen={(dir) => outOfFrame(dir, question)}
              preventSwipe={["up", "down"]}
            >
              <div>
                <div className={styles.tinderCardNoImage}>
                  <p>
                    <b>Question:</b> {question.q}
                  </p>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test2Swiper;
