import { useEffect, useState } from "react";
import FormModal from "../../../components/formModal";
import Cookies from "js-cookie";

export default function DashboardUser() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = Cookies.get("USER");
    if (username) {
      setUsername(username);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard, halo {username}</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Buat Laporan
      </button>

      {showModal && <FormModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
