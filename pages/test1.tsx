import { withRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Test1Swiper from "../components/test1Swiper";

const Test1 = ({ router: { query } }) => {
  const name = query.name;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the first test,
          <span style={{ color: "#0070f3" }}> {name}</span>
        </h1>
        <p className={styles.description}>
          In this test, we are aiming to determine whether a human is able to
          distinguish a generated question from a ground truth. The experiment
          is set up as follows:
          <ul>
            <li>
              You will be shown 105 images and two questions for each image
            </li>
            <li>
              One of these questions is a ground truth question, and the other
              is model generated (both questions share the same answer category
              and concepts)
            </li>
            <li>
              Your job is to try and determine which question is{" "}
              <span style={{ color: "#0070f3" }}>model generated</span>
            </li>
          </ul>
        </p>
        <p className={styles.description}>
          In this test, swiping/pressing left will mean "Question A is the model
          generated question", while swiping/pressing right will mean "Question
          B is the model generated question".
        </p>
        <p className={styles.description}>
          <span style={{ color: "#0070f3" }}>
            Ensure you download the CSV at the end of the test.
          </span>
        </p>
        <Test1Swiper userName={name} />
      </main>
    </div>
  );
};

export default withRouter(Test1);
