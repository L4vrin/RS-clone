import {useState} from 'react';
import styles from './Forms.module.scss';
import {useCreateUserMutation} from '../../store/auth/usersApi';
import {IUserCreate, IErrorValidation} from './types/data';
// interface IError {
//   status: string,
//   data: string[]
// }

const FormReg = () => {
  const [userNameReg, setUserNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [error, setError] = useState<any>({status: 0, data: []});
  const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();

  const formData = {
    fullName: userNameReg,
    email: emailReg,
    password: passwordReg,
  };

  const handleAddNewUser = async (data: IUserCreate) => {
    try {
      await addNewUser(data).unwrap();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Registration Form</h2>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="User Name"
          value={userNameReg}
          onChange={(e) => setUserNameReg(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={emailReg}
          onChange={(e) => setEmailReg(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={passwordReg}
          onChange={(e) => setPasswordReg(e.target.value)}
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
        {isLoading && <div className={styles.loading}> Loading... </div>}
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

export default FormReg;
