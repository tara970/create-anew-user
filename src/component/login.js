import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../component/login.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

export const Login = () => {
  const { setUsername, setUserDetails } = useContext(AppContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name : yup.string().required("نام الزامی است"),
    email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    gender: yup.string().oneOf(["male", "female"], "جنسیت را انتخاب کنید"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const id = Date.now();
    const avatar = data.gender === "male"
      ? `https://randomuser.me/api/portraits/men/${id % 100}.jpg`
      : `https://randomuser.me/api/portraits/women/${id % 100}.jpg`;

    const newUser = {
      id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      avatar
    };

    setUsername(newUser.name);
    setUserDetails(newUser);
    localStorage.setItem("userDetails", JSON.stringify(newUser));
    navigate("/users");
  };

  return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)",
      backgroundSize: "cover",
      animation: "fadeIn 1.2s ease-in-out"
    }}
  >
    <div
      className="card p-4 shadow-lg"
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255, 255, 255, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        animation: "slideUp 0.7s ease"
      }}
    >
      <h3 className="text-center text-white mb-4">ورود کاربر</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="نام و نام خانوادگی"
            {...register("name")}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="ایمیل"
            {...register("email")}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-4">
          <select className={`form-select ${errors.gender ? "is-invalid" : ""}`} {...register("gender")}>
            <option value="">انتخاب جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          <div className="invalid-feedback">{errors.gender?.message}</div>
        </div>

        <button type="submit" className="btn btn-light w-100 fw-bold">
          ورود
        </button>
      </form>
    </div>
  </div>
);


};
