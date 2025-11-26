import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function AdminPanel() {
  const [values, setValues] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // We are reading from collection "dashboard", document "main-data"
      const docRef = doc(db, "dashboard", "main-data");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().chartData) {
        setValues(docSnap.data().chartData.join(", "));
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("Updating...");
    const numberArray = values.split(",").map((v) => Number(v.trim()));

    try {
      await setDoc(doc(db, "dashboard", "main-data"), {
        chartData: numberArray,
        lastUpdated: new Date()
      });
      setStatus("Success!");
    } catch (error) {
      console.error(error);
      setStatus("Error updating.");
    }
  };

  return (
    <div style={{ background: "rgba(0,0,0,0.8)", padding: 20, borderRadius: 8, color: "white", border: "1px solid #333" }}>
      <h3>Data Entry</h3>
      <form onSubmit={handleUpdate}>
        <textarea
          value={values}
          onChange={(e) => setValues(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, background: "#222", color: "white", border: "1px solid #444" }}
        />
        <button type="submit" style={{ padding: "8px 16px", background: "#00f2ff", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          Update Charts
        </button>
      </form>
      <p style={{ marginTop: 10, fontSize: "0.8rem", color: "#aaa" }}>{status}</p>
    </div>
  );
}

export default AdminPanel;