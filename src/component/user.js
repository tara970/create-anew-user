import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";

export const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { userDetails } = useContext(AppContext);

  useEffect(() => {
    if (userDetails && String(userDetails.id) === String(id)) {
      setUser(userDetails);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUser(data);
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [id, userDetails]);

  if (error) {
    return <p className="text-danger text-center mt-5">User not found.</p>;
  }

  // ساخت آواتار بر اساس داده‌ی موجود
  const avatar =
    user?.avatar ||
    `https://randomuser.me/api/portraits/${
      Number(id) % 2 === 0 ? "men" : "women"
    }/${Number(id) % 100}.jpg`;

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      {user ? (
        <div className="card shadow-lg border-0" style={{ width: "100%", maxWidth: "420px" }}>
          <div className="card-body text-center">
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h4 className="card-title text-primary">
              {user.name || `${user.first_name} ${user.last_name}`}
            </h4>
            <p className="card-text text-muted mb-0">{user.email}</p>
            <p className="card-text text-secondary mt-2">{user.gender ? `Gender: ${user.gender}` : ""}</p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading user details...</p>
        </div>
      )}
    </div>
  );
};
