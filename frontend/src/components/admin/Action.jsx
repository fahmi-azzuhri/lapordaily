import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import ViewAction from "../../views/admin/ViewAction";
function Action({ userId }) {
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  return (
    <div>
      <ViewAction userId={userId} deleteUser={deleteUser} />
    </div>
  );
}

export default Action;
