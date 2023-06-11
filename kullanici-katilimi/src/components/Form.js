import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import * as Yup from "yup";

const Form = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    shippingFree: "",
  });

  const [userErrs, setUserErrs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    shippingFree: "",
  });
  const userFormSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required("Lütfen adınızı giriniz!")
      .min(3, "Lütfen isminizi doğru giriniz!"),
    lastName: Yup.string()
      .trim()
      .required("Lütfen Soyadınızı giriniz!")
      .min(2, "Lütfen Soyadınızı doğru giriniz!"),
    email: Yup.string()
      .email("Lütfen geçerli bir email giriniz!")
      .required("Lütfen emailinizi giriniz!"),
    password: Yup.string().required("Lütfen şifrenizi giriniz!"),
    shippingFree: Yup.boolean().oneOf([true], "This field must be checked"),
  });

  const [valid, setValid] = useState(false);

  const [users, setUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (valid) {
      axios
        .post("https://reqres.in/api/users", user)
        .then((response) => setUsers([...users, response.data]));
    }
    console.log(user.shippingFree);
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      shippingFree: "",
    });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    Yup.reach(userFormSchema, name)
      .validate(value)
      .then((vld) => {
        setUserErrs({ ...userErrs, [name]: "" });
      })
      .catch((err) => {
        setUserErrs({ ...userErrs, [name]: err.errors[0] });
      });

    setUser({ ...user, [name]: value });
  };

  const shippingfreechangeHandler = (e) => {
    const { name, checked } = e.target;
    Yup.reach(userFormSchema, name)
      .validate(checked)
      .then((valid) => {
        setUserErrs({ ...userErrs, [name]: "" });
      })
      .catch((err) => {
        setUserErrs({ ...userErrs, [name]: err.errors[0] });
      });
    setUser({ ...user, [name]: checked });
  };

  useEffect(() => {
    userFormSchema.isValid(user).then((vld) => setValid(vld));
    console.log();
  }, [user]);

  useEffect(() => {
    console.log("userErrs: ", userErrs);
  }, [userErrs]);

  return (
    <div className="geneldiv">
      <form onSubmit={submitHandler}>
        <div className="divv">
          <label>
            FirstName:
            <input
              data-cy="first-name"
              type="text"
              name="firstName"
              placeholder="İsim giriniz"
              onChange={changeHandler}
              value={user.firstName}
            />
          </label>
          {userErrs.name !== "" && (
            <div data-cy="errName" className="error">
              {userErrs.firstName}
            </div>
          )}
        </div>
        <div className="divv">
          <label>
            LastName:
            <input
              data-cy="last-name"
              type="text"
              name="lastName"
              placeholder="SoyAd giriniz"
              onChange={changeHandler}
              value={user.lastName}
            />
          </label>
          {userErrs.name !== "" && (
            <div className="error">{userErrs.lastName} </div>
          )}
        </div>
        <div className="divv">
          <label>
            Email=
            <input
              data-cy="email"
              type="email"
              name="email"
              placeholder="Email giriniz"
              onChange={changeHandler}
              value={user.email}
            />
          </label>
          {userErrs.name !== "" && (
            <div className="error">{userErrs.email} </div>
          )}
        </div>
        <div className="divv">
          <label>
            Password:
            <input
              data-cy="passWord"
              type="text"
              name="password"
              placeholder="Şifre giriniz"
              onChange={changeHandler}
              value={user.password}
            />
          </label>
          {userErrs.name !== "" && (
            <div className="error">{userErrs.password} </div>
          )}
        </div>
        <div className="divv">
          <label>
            Terms:
            <input
              data-cy="terms"
              type="checkbox"
              name="shippingFree"
              onChange={shippingfreechangeHandler}
              checked={user.shippingFree}
            />
          </label>
          {userErrs.name !== "" && (
            <div className="error">{userErrs.shippingFree} </div>
          )}
        </div>
        <button data-cy="button" type="submit" disabled={!valid}>
          Gönder
        </button>
      </form>
      {users.map((item) => (
        <div>
          <h1 data-cy="item">{item.firstName}</h1>
        </div>
      ))}
    </div>
  );
};
export default Form;
