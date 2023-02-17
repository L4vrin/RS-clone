import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './styles/WelcomePage.module.scss';
import logo from '../assets/img/logo.png';
import bgCalendar from '../assets/img/calendar-bg.png';
import FormReg from '../components/Forms/FormReg';
import FormLog from '../components/Forms/FormLog';
import useAppSelector from '../hooks/useAppSelector';

const WelcomePage = () => {
  const isReg = useAppSelector((state) => state.user.isRegistred);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('tasks/today');
    }
  }, [navigate, user]);

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${bgCalendar})` }}
    >
      <div className={styles.leftContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>About this app</h3>
          <p>
            The aim of this app is to help you focus on any task you are working
            on, such as study, writing, or coding. This app is inspired by
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
              Pomodoro Technique
            </a>
            which is a time management method developed by Francesco Cirillo.
          </p>
        </div>
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>What is Pomodoro Technique?</h3>
          <p>
            The Pomodoro Technique is created for a more productive way to work
            and study. It uses a timer to break down work into intervals,
            traditionally 25 minutes in length, separated by short breaks.
          </p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>
          {!isReg ? <FormLog /> : <FormReg />}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
