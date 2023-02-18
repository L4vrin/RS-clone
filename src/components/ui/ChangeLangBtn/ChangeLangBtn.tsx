import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ChangeLangBtn.module.scss'

const ChangeLangBtn = () => {
  const [isEnglish, setIsEnglish] = useState(false);
  const { i18n } = useTranslation();
  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language);
    setIsEnglish(!isEnglish);
  };
  return (
    <button
      type="button"
      className={isEnglish ? styles.russian  : styles.english}
      aria-label="change Language"
      onClick={() => changeLanguage(isEnglish ? 'en' : 'ru')}
    />
  );
};

export default ChangeLangBtn;
