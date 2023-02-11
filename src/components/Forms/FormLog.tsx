import { useState} from 'react';
import styles from './Forms.module.scss';
import {useCreateUserMutation} from '../../store/auth/usersApi';
import {IErrorValidation } from './types/data';
// interface IError {
//   status: string, 
//   data: string[]
// }

interface IUserLogin {
  email: string,
	password: string,
}

const FormLog = () => {
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [error, setError] = useState<any>({})
  const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();

  const formData = {
    email: emailLog,
    password: passwordLog,
  };

  const handleAddNewUser = async (data: IUserLogin) => {
    try {
      await addNewUser(data).unwrap();
    } catch (err) {
        setError(err)
  };
}

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Login Form</h2>
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
            handleAddNewUser(formData);
          }}
        >
          Confirm
        </button>
      </form>
      <div className={styles.serverAnswer}>
        {isLoading && <div className={styles.loading}> <div className={styles.loader}/> </div>}
        {isError && (
          <ul className={styles.errorsList}>
            {error.data.map((errorObj: IErrorValidation) => (
              <li key={errorObj.param}>{errorObj.msg}</li>
            ))}
          </ul>
        )}
        {isSuccess && <div className={styles.success}> User created! </div>}
      </div>
    </div>
  );
};

export default FormLog;
