import {useEffect, useState} from 'react';
import styles from './FormReg.module.scss';
import {useCreateUserMutation} from '../../store/auth/usersApi';

// interface IError {
//   status: string, 
//   data: string[]
// }

const FormReg = () => {
  const [userNameReg, setUserNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [error, setError] = useState({})
  const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();

  const formData = {
    fullName: userNameReg,
    email: emailReg,
    password: passwordReg,
  };

  const handleAddNewUser = async (data: any) => {
    try {
      await addNewUser(data).unwrap();
    } catch (err) {
      if (err instanceof Object) {
        setError(err)
      }
    }
  };

  useEffect(() => {
    console.log(error)
  }, [error])
  
  return (
    <div className={styles.formRegWrapper}>
      <h2 className={styles.formRegTitle}>Registration Form</h2>
      <form className={styles.formReg}>
        <input
          className={styles.inputReg}
          type="text"
          placeholder="User Name"
          value={userNameReg}
          onChange={(e) => setUserNameReg(e.target.value)}
        />
        <input
          className={styles.inputReg}
          type="email"
          placeholder="Email"
          value={emailReg}
          onChange={(e) => setEmailReg(e.target.value)}
        />
        <input
          className={styles.inputReg}
          type="password"
          placeholder="Password"
          value={passwordReg}
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <button
          className={styles.submitBtnReg}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleAddNewUser(formData);
          }}
        >
          Confirm
        </button>
      </form>
      {isLoading && <div> Loading... </div>}
      {isError && <div> An error has occurred! </div>}
      {isSuccess && <div> User created! </div>}
    </div>
  );
};

export default FormReg;
