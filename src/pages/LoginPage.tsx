import FormLog from '../components/FormLog/FormLog';
import styles from './styles/LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.registrationContainer}>
    <FormLog />
    </div>
  );
};

export default LoginPage;