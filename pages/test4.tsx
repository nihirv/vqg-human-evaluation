import { withRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Test4Swiper from "../components/test4Swiper";

const Test4 = ({ router: { query } }) => {
  const name = query.name;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the fourth test,
          <span style={{ color: "#0070f3" }}> {name}</span>
        </h1>
        <p className={styles.description}>
          In this test, we are aiming to determine whether a generated question
          is relevant to <b>at least one of</b> the given objects. Some of the
          questions have been generated based on the objects, and others are
          adversarial examples. Relevance here is loosely defined, but if you
          think the concepts of an object and the question would be similar in
          high dimensional space, then mark the sample as correct. For example,
          if the given objects are "flowers car", and the question is "is a man
          driving the vehicle?", then because car is similar to vehicle, the
          sample should be marked as correct. <br />
          <b>
            Objects can also be relevant if they are the answer to the question
          </b>
          . For example, if the objects are "flowers car", and the question is
          "what is parked in the parking bay?", then because car is the answer
          to the question, the question should be marked as correct. Because we
          are not showing an image, use your best judgement on the answer to the
          question.
          <ul>
            <li>You will be shown 40 images and a generated question</li>
            <li>
              Judge whether the generated question is relevant to the provided
              information
            </li>
          </ul>
        </p>
        <p className={styles.description}>
          In this test, swiping/pressing left will mean "None of the objects are
          relevant to the question", while swiping/pressing right will mean "At
          least one of the objects are relevant to the question".
        </p>
        <p className={styles.description}>
          <span style={{ color: "#0070f3" }}>
            Ensure you download the CSV at the end of the test.
          </span>
        </p>
        <Test4Swiper userName={name} />
      </main>
    </div>
  );
};

export default withRouter(Test4);
