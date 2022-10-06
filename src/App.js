import axios from 'axios';
import { useEffect, useState } from 'react'
import Pagination from './Pagination';
import './index.css'

const App = () => {
    const APP_URL="https://jsonplaceholder.typicode.com/comments";
    const postsPerPage=50;
    const [pageNumber, setPageNumber]=useState(1);
    const lengthOfPosts=pageNumber*postsPerPage;
    const startIndex=lengthOfPosts-postsPerPage;
    const [allData,setAllData]=useState([]);
            useEffect(()=>{
             const fetchPosts=async()=>{
              const res=await axios.get(APP_URL);
              const data=res.data;
              setAllData(data)
             }
             fetchPosts();


            },[pageNumber])
  return (
    <div>
        {allData.slice(startIndex,lengthOfPosts).map(each=>(
            <div key={each.id}>
            <p>{each.id}</p>
            <p>{each.name}</p>
            <p>{each.email}</p>
            <p>{each.body}</p>
            </div>
        ))}
        <Pagination allData={allData} postsPerPage={postsPerPage} setPageNumber={setPageNumber}/>
    </div>
  )
}

export default App