import FormLog from '../components/Forms/FormLog';
import FormReg from '../components/Forms/FormReg';
import styles from './styles/RegistrationPage.module.scss'

const RegistrationPage = () => {
  return (
    <div className={styles.registrationContainer}>
    <FormReg />
    <FormLog />
    </div>
  );
};

export default RegistrationPage;