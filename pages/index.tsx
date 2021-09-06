import { Button, TextField } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";
import Test1 from "./test1";

export default function Home() {
  const [name, setName] = React.useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Guided VQG Qualitative Results</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <br />
          <span style={{ color: "#0070f3" }}>
            Guided Visual Question Generation (Evaluation)
          </span>
        </h1>

        <p className={styles.description}>
          {/* This web interface has been created for human evaluation of the Guided
          VQG project. This interface asks you to test 3 components of the VQG
          system: */}
          This web interface has been created for human evaluation of the Guided
          VQG project. This interface asks you to test a component of our VQG
          model:
          <ol className={styles.code}>
            <li>
              Given a set of objects and a generated question, is at least of of
              the objects in the set of objects related to the generated
              question?
            </li>
            {/* <li>
              The grammatic/linguistic plausibility of the generated question
            </li>
            <li>
              Whether a generated question is relevant to the image and objects
            </li> */}
          </ol>
          Instructions and examples will be provided at the start of the test.
          &nbsp;
          <span style={{ color: "#0070f3" }}>
            You will download a CSV file containing your submission and results
            after each test. Please send your CSV files to me (Nihir) once
            you've run all the tests.
          </span>
        </p>
        <p className={styles.description}>
          We recommend you to use the left and right arrow keys (or swipe left
          and right if on mobile) for speedy evaluation!
        </p>

        <p className={styles.description}>
          To get started,{" "}
          <span style={{ color: "#0070f3" }}>enter your name</span> below and
          click on a specific test!
        </p>

        {name === (null || "") ? (
          <TextField
            required
            error
            id="standard-required"
            label="Enter your name"
            variant="outlined"
            style={{ width: "70%" }}
            onChange={handleChange}
            helperText="Please enter a name"
          />
        ) : (
          <TextField
            required
            id="standard-required"
            label="Enter your name"
            variant="outlined"
            style={{ width: "70%" }}
            onChange={handleChange}
          />
        )}

        {name === "" ? (
          <p className={styles.code}>Please enter a name to see the links</p>
        ) : (
          <div className={styles.grid}>
            <Link href={{ pathname: "/test4", query: { name: name } }} passHref>
              <a className={styles.card}>
                <h2>Test 4 &rarr;</h2>
                <p>
                  Given a set of objects and a generated question, is at least
                  of of the objects in the set of objects related to the
                  generated question?
                </p>
              </a>
            </Link>

            {/* <Link href={{ pathname: "/test1", query: { name: name } }} passHref>
              <a className={styles.card}>
                <h2>Test 1 &rarr;</h2>
                <p>
                  Given an image, and two questions, identify which question is
                  model generated
                </p>
              </a>
            </Link>

            <Link href={{ pathname: "/test2", query: { name: name } }} passHref>
              <a className={styles.card}>
                <h2>Test 2 &rarr;</h2>
                <p>
                  The grammatic/linguistic plausibility of the generated
                  question
                </p>
              </a>
            </Link>

            <Link href={{ pathname: "/test3", query: { name: name } }} passHref>
              <a className={styles.card}>
                <h2>Test 3 &rarr;</h2>
                <p>
                  Whether a generated question is relevant to the image and
                  objects
                </p>
              </a>
            </Link> */}
          </div>
        )}
      </main>
    </div>
  );
}
