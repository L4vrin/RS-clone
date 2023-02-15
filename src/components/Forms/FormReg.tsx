import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from '../../store/auth/users.api';
import {IUserCreate, IErrorValidation} from './types/data';
import useActions from '../../hooks/useActions';
import styles from './Forms.module.scss';

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
  const navigate = useNavigate();
  const {changeUserName, switchRegistred} = useActions();

  const formData = {
    fullName: userNameReg,
    email: emailReg,
    password: passwordReg,
  };

  const handleAddNewUser = async (data: IUserCreate) => {
    try {
      await addNewUser(data).unwrap();
      const userData = await loginUser(data).unwrap();
      console.log(userData)
      changeUserName(userData.fullName);
      switchRegistred(true);
      localStorage.setItem('token', userData.token)
<<<<<<< HEAD
      localStorage.setItem('userId', userData._id)
=======
      localStorage.setItem('email', userData.email)
>>>>>>> addTodoToServer
      navigate('today')
    } catch (err) {
      setErrorReg(err);
    }
  };

  return (
    <div className={styles.formWrapper}>
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
          Create new account
        </button>
      </form>
      <div className={styles.serverAnswer}>
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loader} />
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
