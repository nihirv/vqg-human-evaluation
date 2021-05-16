import { withRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Test3Swiper from "../components/test3Swiper";

const Test1 = ({ router: { query } }) => {
  const name = query.name;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the third test,
          <span style={{ color: "#0070f3" }}> {name}</span>
        </h1>
        <p className={styles.description}>
          In this test, we are aiming to determine whether a generated question
          is relevant to the given image. You may guage relevance under the
          following heuristic: "If I was an annotator who was told to generate a
          question with the given image is this a question that I could see
          myself asking?". The experiment is setup as follows:
          <ul>
            <li>You will be shown 35 images and a generated question</li>
            <li>
              Judge whether the generated question is relevant to the provided
              information
            </li>
          </ul>
        </p>
        <p className={styles.description}>
          In this test, swiping/pressing left will mean "The question is not
          relevant", while swiping/pressing right will mean "The question is
          relevant".
        </p>
        <p className={styles.description}>
          <span style={{ color: "#0070f3" }}>
            Ensure you download the CSV at the end of the test.
          </span>
        </p>
        <Test3Swiper userName={name} />
      </main>
    </div>
  );
};

export default withRouter(Test1);
