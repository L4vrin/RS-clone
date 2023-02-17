import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from '../../store/auth/users.api';
import { IUserCreate, IError } from './types/data';
import useActions from '../../hooks/useActions';
import styles from './Forms.module.scss';

const FormReg = () => {
  const [userNameReg, setUserNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorReg, setErrorReg] = useState<IError>({ status: '0', data: [] });
  const [addNewUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const { changeUserName, switchRegistred } = useActions();
  const { t } = useTranslation();

  const formData = {
    fullName: userNameReg,
    email: emailReg,
    password: passwordReg,
  };

  const handleAddNewUser = async (data: IUserCreate) => {
    try {
      await addNewUser(data).unwrap();
      const userData = await loginUser(data).unwrap();
      changeUserName(userData.fullName);
      switchRegistred(true);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData._id);
      navigate('tasks/today');
    } catch (err) {
      const error = err as IError;
      setErrorReg(error);
    }
  };
  
  return (
    <div className={styles.formWrapper}>
      <h2>{ t("Register")}</h2>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder={t("UserName")} 
          value={userNameReg}
          onChange={(e) => setUserNameReg(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder={t("Email")} 
          value={emailReg}
          onChange={(e) => setEmailReg(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder={t("Password")} 
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
          { t("CreateNewAccount")}
        </button>
      </form>
      <p>
        {t("AlreadyRegistered")} 
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => switchRegistred(false)}
        >
          {t("ClickHere")} 
        </button>
        {t("ToLogIn")}
      </p>
      <div className={styles.serverAnswer}>
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loader} />
          </div>
        )}
        {isError && (
          <ul className={styles.errorsList}>
            {errorReg.data.map((errorObj) => (
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
