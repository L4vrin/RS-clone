import FormLog from '../components/Forms/FormLog';
import FormReg from '../components/Forms/FormReg';
import useAppSelector from '../hooks/useAppSelector';
import styles from './styles/RegistrationPage.module.scss'

const RegistrationPage = () => {
  const isRegistred = useAppSelector((state) => state.user.isRegistred);

  return (
    <div className={styles.registrationContainer}>
      {!isRegistred ? <FormReg /> : <FormLog />}
    </div>
  );
};

export default RegistrationPage;