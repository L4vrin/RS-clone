import {useState} from 'react';
import styles from './Forms.module.scss';
import {useCreateUserMutation, useLoginUserMutation} from '../../store/auth/users.api';
import {IUserCreate, IErrorValidation} from './types/data';
import useActions from '../../hooks/useActions';

// interface IError {
//   status: string,
//   data: string[]
// }


const FormReg = () => {
  const [userNameReg, setUserNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorReg, setErrorReg] = useState<any>({status: '0', data: []});
  const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();
  const [loginUser] = useLoginUserMutation();

  const { changeUserName } = useActions();

  const formData = {
    fullName: userNameReg,
    email: emailReg,
    password: passwordReg,
  };

  const handleAddNewUser = async (data: IUserCreate) => {
    try {
      await addNewUser(data).unwrap();
      const a = await loginUser(data).unwrap();
      changeUserName(a.fullName)
    } catch (err) {
      setErrorReg(err);
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
        {isLoading && (
          <div className={styles.loading}>
            {' '}
            <div className={styles.loader} />{' '}
          </div>
        )}
        {isError && (
          <ul className={styles.errorsList}>
            {errorReg.data.map((errorObj: IErrorValidation) => (
              <li key={errorObj.msg}>{errorObj.msg}</li>
            ))}
          </ul>
        )}
        {isSuccess && <div className={styles.success}> User created! </div>}
      </div>
    </div>
  );
};

export default FormReg;
