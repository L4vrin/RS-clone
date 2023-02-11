import FormReg from '../components/FormReg/FormReg';
import styles from './styles/RegistrationPage.module.scss'

const RegistrationPage = () => {
  return (
    <div className={styles.registrationContainer}>
    <FormReg />
    </div>
  );
};

export default RegistrationPage;