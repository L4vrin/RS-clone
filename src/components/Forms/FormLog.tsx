import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Forms.module.scss';
import {useLoginUserMutation} from '../../store/auth/users.api';
import {IErrorValidation} from './types/data';
import useActions from '../../hooks/useActions';

// interface IError {
//   status: string,
//   data: string[]
// }

interface IUserLogin {
  email: string;
  password: string;
}

const FormLog = () => {
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  const [errorLog, setErrorLog] = useState<any>({status: 0, data: []});
  const [loginUser, {isLoading, isError, isSuccess}] = useLoginUserMutation();
  const {changeUserName, switchRegistred} = useActions();
  const navigate = useNavigate();

  const formData = {
    email: emailLog,
    password: passwordLog,
  };

  const handleLoginUser = async (data: IUserLogin) => {
    try {
      const userData = await loginUser(data).unwrap();
      changeUserName(userData.fullName);
      localStorage.setItem('token', userData.token);
      navigate('today');
    } catch (err) {
      setErrorLog(err);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Sign in</h2>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={emailLog}
          onChange={(e) => setEmailLog(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={passwordLog}
          onChange={(e) => setPasswordLog(e.target.value)}
        />
        <button
          className={styles.submitBtn}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLoginUser(formData);
          }}
        >
          Login
        </button>
      </form>
      <p>
        Already registered?
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => switchRegistred(true)}
        >
          Click here
        </button>
        to log in
      </p>
      <div className={styles.serverAnswer}>
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loader} />
          </div>
        )}
        {isError && (
          <ul className={styles.errorsList}>
            {errorLog.data.map((errorObj: IErrorValidation) => (
              <li key={errorObj.msg}>{errorObj.msg}</li>
            ))}
          </ul>
        )}
        {isSuccess && (
          <div className={styles.success}> User successful login </div>
        )}
      </div>
    </div>
  );
};

export default FormLog;
