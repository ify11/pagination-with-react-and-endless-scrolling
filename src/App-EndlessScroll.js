import {useState, useCallback, useEffect,useRef} from 'react';
import axios from 'axios';

const App = () => {
  const APP_URL="https://jsonplaceholder.typicode.com/comments";
  const postsPerPage=10;
  const observer=useRef();
  const [results,setResults]=useState([]);
  const [pageNumber, setPageNumber]=useState(1);
  const lengthOfPosts=postsPerPage*pageNumber;
  const startIndex=lengthOfPosts-postsPerPage;
  

  const lastEl=useCallback((node)=>{
      if(observer.current) observer.current.disconnect();
      observer.current=new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting){
          
            setPageNumber(prev=>prev+1);
          
          
        }
      });
      node && observer.current.observe(node)
    
  },[])
  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;
    const fetchPosts=async()=>{
      try{
      const allData=await axios({url:APP_URL,signal});
      const data=allData.data;
      const dataSlice=data.slice(startIndex,lengthOfPosts);
      setResults(prev=>[...prev,...dataSlice]);
      }catch(err){
        if(axios.isCancel(err)) return;
      }

    }
    fetchPosts();
    return ()=>controller.abort();
  },[lengthOfPosts,startIndex]);

  return (
    <div>
      {
        results.map((res,index)=>{
          if(results.length===index+1){
             return <div key={res.id} ref={lastEl}>
                      <div>{res.id}</div>
                      <div>{res.name}</div>
                      <div>{res.email}</div>
                      <div>{res.body}</div>
                    </div>
          }
          else{
            return <div key={res.id}>
                      <div>{res.id}</div>
                      <div>{res.name}</div>
                      <div>{res.email}</div>
                      <div>{res.body}</div>
                    </div>
          }
        })
      }

    </div>
  );
}

export default App;