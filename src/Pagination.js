import React from 'react'

const Pagination = ({allData, postsPerPage,setPageNumber}) => {

    let numOfButtons=Math.ceil(allData.length/postsPerPage);
    let pageButtons=[];
    for(let i=1; i<=numOfButtons; i++){
     pageButtons.push(i);
     
    }
  return (
    <ul>
        {
          
          pageButtons.map(each=>(
            
            <li key={each}>
             <button onClick={()=>setPageNumber(each)}>{each}</button>

             </li>
             ))
             
        }
       
    </ul>
  )
}

export default Pagination