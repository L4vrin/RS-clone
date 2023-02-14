/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import styles from './styles/WelcomePage.module.scss';
import logo from '../assets/img/logo.png';
import bgCalendar from '../assets/img/calendar-bg.png';
import Footer from '../components/Footer/Footer';
import FormReg from '../components/Forms/FormReg';
import FormLog from '../components/Forms/FormLog';

const WelcomePage = () => {
  const logFormDescription = (
    <p>
      Already registered?{' '}
      <button
        type="button"
        className={styles.linkButton}
        onClick={changeToLoginHandler}
      >
        Click here
      </button>{' '}
      to log in
    </p>
  );
  const regFormDescription = (
    <p>
      Dont have an account?{' '}
      <button
        type="button"
        className={styles.linkButton}
        onClick={changeToLoginHandler}
      >
        Click here
      </button>{' '}
      to register
    </p>
  );

  const [visibleForm, setVisibleForm] = useState(<FormLog />);
  const [formDescription, setFormDescription] = useState(regFormDescription);
  let flag = 1;

  function changeToLoginHandler() {
    if (flag === 0) {
      flag = 1;
      setVisibleForm(<FormLog />);
      setFormDescription(regFormDescription);
      return;
    }
    if (flag === 1) {
      flag = 0;
      setVisibleForm(<FormReg />);
      setFormDescription(logFormDescription);
    }
  }

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${bgCalendar})` }}
      >
        <div className={styles.leftContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.aboutContainer}>
            <h3 className={styles.h2}>About this app</h3>
            <p>
              The aim of this app is to help you focus on any task you are
              working on, such as study, writing, or coding. This app is
              inspired by{' '}
              <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
                Pomodoro Technique
              </a>{' '}
              which is a time management method developed by Francesco Cirillo.
            </p>
          </div>
          <div className={styles.aboutContainer}>
            <h3 className={styles.h2}>What is Pomodoro Technique?</h3>
            <p>
              The Pomodoro Technique is created for a more productive way to
              work and study. It uses a timer to break down work into intervals,
              traditionally 25 minutes in length, separated by short breaks.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.formContainer}>
            {visibleForm}
            {formDescription}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
