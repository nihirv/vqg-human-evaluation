import { withRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Test2Swiper from "../components/test2Swiper";

const Test1 = ({ router: { query } }) => {
  const name = query.name;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the second test,
          <span style={{ color: "#0070f3" }}> {name}</span>
        </h1>
        <p className={styles.description}>
          In this test, we are aiming to determine whether a question is
          linguistically/gramatically coherent. Simply, does language in the
          question make sense. The experiment is setup as follows:
          <ul>
            <li>You will be shown 100 questions</li>
            <li>Judge whether the question makes gramatical sense</li>
          </ul>
        </p>
        <p className={styles.description}>
          In this test, swiping/pressing left will mean "The question does not
          make sense", while swiping/pressing right will mean "The question does
          make sense".
        </p>
        <p className={styles.description}>
          <span style={{ color: "#0070f3" }}>
            Ensure you download the CSV at the end of the test.
          </span>
        </p>
        <Test2Swiper userName={name} />
      </main>
    </div>
  );
};

export default withRouter(Test1);
