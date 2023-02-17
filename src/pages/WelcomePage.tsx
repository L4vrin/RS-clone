import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate('tasks/today');
    }
  }, [navigate, user]);

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${bgCalendar})` }}>
      <div className={styles.leftContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>{t('AboutApp')}</h3>
          <p>
            { t("TheAim")}
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">{ t("PomodoroTechnique")}</a>
            { t("WhichIs")} 
          </p>
        </div>
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>{ t("WhatIsPomodoro")}</h3>
          <p>
          { t("ThePomodoroTechnique")} 
          </p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>{!isReg ? <FormLog /> : <FormReg />}</div>
      </div>
    </div>
  );
};

export default WelcomePage;
