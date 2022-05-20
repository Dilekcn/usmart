import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [datas, setDatas] = useState([]);
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...datas].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setDatas(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...datas].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setDatas(sorted);
      setOrder("ASC");
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://api.usmart.io/org/d1b773fa-d2bd-4830-b399-ecfd18e832f3/02444e7a-5bd4-4ef3-9c66-e26671bb4c8a/latest/urql?limit(50)"
      )
      .then((res) => {
        console.log(res);
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5">
     <span >Found {datas.length} records.</span>
      <table className="table table-hover ">
        <tr class="table-active">
          <th onClick={() => sorting("Location")}>Location</th>
          <th onClick={() => sorting("Latitude")}>Latitude</th>
          <th onClick={() => sorting("Longitude")}>Longitude</th>
          <th onClick={() => sorting("ISODateTime")}>ISODateTime</th>
          <th onClick={() => sorting("Count")}>Count</th>
          <th onClick={() => sorting("Class Name")}>Class Name</th>
        </tr>

        {datas && datas.length > 0
          ? datas.map((data) => (
              <tr key={data.usmart_id}>
                <td>{data.Location} </td>
                <td>{data.Latitude} </td>
                <td>{data.Longitude} </td>
                <td>{data.ISODateTime} </td>
                <td>{data.Count} </td>
                <td>{data["Class Name"]} </td>
              </tr>
            ))
          : ""}
      </table>
    </div>
  );
}

export default DataFetching;
