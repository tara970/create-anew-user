 import { AppContext } from "../App";
 import { useContext } from "react";
 
 
 export const Home = () =>
{
   const {username , setUsername} = useContext(AppContext);
   
   return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f0f4f8" }}
    >
      <div className="card shadow-lg border-0 p-5 text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <h1 className="text-primary mb-4">
          Welcome {username ? username : "Guest"}!
        </h1>

        {username ? (
          <>
            <p className="lead mb-3">
              خوش آمدی عزیز <span className="fw-bold text-danger">{username}</span>
            </p>
            <p className="text-muted">
              با موفقیت وارد شدید. از امکانات سایت لذت ببرید!
            </p>
          </>
        ) : (
          <>
            <p className="lead mb-3">لطفاً ابتدا وارد حساب کاربری شوید</p>
            <p className="text-muted">برای دسترسی کامل به امکانات سایت</p>
          </>
        )}
      </div>
    </div>
  );
}