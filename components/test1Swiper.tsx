import React, { useState, useMemo, useEffect } from "react";
import styles from "../styles/swipe.module.css";
import homeStyles from "../styles/Home.module.css";
import TinderCard from "react-tinder-card";
import Link from "next/link";
import { randomlySample } from "../scripts/utils";
import {
  convertFullObjToTest1Type,
  Test1Questions,
} from "../scripts/test1_utils";
import Head from "next/head";

const lenEach = 35;
const totalLen = lenEach * 3;
const explicitSamples = randomlySample("explicit", lenEach);
const implicitSamples = randomlySample("implicit", lenEach);
const baselineSamples = randomlySample("baseline", lenEach);
const samplesForTest1 = convertFullObjToTest1Type([
  ...explicitSamples,
  ...implicitSamples,
  ...baselineSamples,
]);
let questionsState = samplesForTest1;

const alreadyRemoved = [];
const csvArrayState = [];
let totalCorrect = 0;
const correctPerType = {
  explicit: 0,
  implicit: 0,
  baseline: 0,
};

interface SwiperProps {
  userName: string;
}
const Test1Swiper: React.FC<SwiperProps> = ({ userName }) => {
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", (event) => {
      console.log("DOMContentLoaded!");
    });
    return () => {
      window.removeEventListener("DOMContentLoaded", (event) => {});
    };
  }, []);
  const [questions, setQuestions] = useState<Test1Questions[]>(questionsState);
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

  const outOfFrame = (direction: string, question: Test1Questions) => {
    console.log("Removed Question:", question.id, typeof question.id);
    let chosenAnswer = "";
    if (direction === "left") {
      chosenAnswer = question.q1;
    } else if (direction === "right") {
      chosenAnswer = question.q2;
    }
    const csvString = [
      question.id.toString(),
      chosenAnswer,
      question.gt,
      question.type,
      (chosenAnswer === question.gt).toString(),
    ];

    csvArrayState.push(csvString);
    // not equals, because we ask them to pick the model generated, not the gt
    if (chosenAnswer !== question.gt) {
      totalCorrect += 1;
      correctPerType[question.type] += 1;
    }

    questionsState = questionsState.filter(
      (questionFromState) => questionFromState.id !== question.id
    );
    setQuestions(questionsState);

    if (questionsState.length === 0) {
      setIsFinished(true);
      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvArrayState.map((e) => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      setCsvDownloadState({
        filename: userName + "_" + "test1.csv",
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
    if (keypress === "ArrowLeft") {
      swipe("left");
    } else if (keypress === "ArrowRight") {
      swipe("right");
    }
  };

  return (
    <>
      <Head>
        {" "}
        <meta httpEquiv="Cache-control" content="no-cache" />
      </Head>
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
            <p>
              You got {totalCorrect}/{totalLen} correct! (
              {(100 * totalCorrect) / totalLen}%)
              <br />
              {Object.keys(correctPerType).map((type) => {
                return (
                  <>
                    {type}: {correctPerType[type]}/{lenEach} (
                    {(100 * correctPerType[type]) / lenEach}%)
                    <br />
                  </>
                );
              })}
            </p>
            <p>and then...</p>
            <Link
              href={{ pathname: "/test2", query: { name: userName } }}
              passHref
            >
              <a className={homeStyles.card}>
                <h2>Test 2 &rarr;</h2>
                <p>
                  The grammatic/linguistic plausibility of the generated
                  question
                </p>
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.tinderCardContainer}>
            <p className={styles.activateKeyPress}>
              Please wait for all images to finish downloading before starting
              with the experiment (ETA ~1min). If the keypress doesn't work,
              click on this text to activate it
            </p>
            {questions.map((question, index) => {
              const random = Math.random(); // need to append a random number to the end of an image url otherwise some kind of caching kicks in and the image stays in the cache
              return (
                <TinderCard
                  ref={childRefs[index]}
                  className={styles.swipe}
                  key={question.id}
                  onCardLeftScreen={(dir) => outOfFrame(dir, question)}
                  preventSwipe={["up", "down"]}
                >
                  <div>
                    <div className={styles.tinderCard}>
                      <img
                        style={{
                          padding: 30,
                          maxWidth: "100vw",
                          height: "auto",
                        }}
                        src={question.url + "?" + random}
                      />
                      <p>
                        <b>&larr; Question A:</b> {question.q1}
                      </p>
                      <p>
                        <b>&rarr; Question B:</b> {question.q2}
                      </p>
                    </div>
                  </div>
                </TinderCard>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Test1Swiper;
