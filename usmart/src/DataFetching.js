import React,{useState, useEffect} from 'react'
import axios  from 'axios';



function DataFetching() {
 const [datas, setDatas] = useState([]);

 useEffect(() => {
     axios.get('https://api.usmart.io/org/d1b773fa-d2bd-4830-b399-ecfd18e832f3/02444e7a-5bd4-4ef3-9c66-e26671bb4c8a/latest/urql?limit(50)')
     .then(res =>{
         console.log(res)
         setDatas(res.data)
     })
     .catch(err =>{
         console.log(err)
     })
 },[])

  return (
    <div>
        <ul>
            {
                datas.map(data => <li key={data.usmart_id}>{data.Location}</li>)
            }
        </ul>
        <table>
            <tr></tr>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>ISODateTime</th>
            <th>Count</th>
            <th>Class Name</th>
        </table>
    </div>
  )
}

export default DataFetching