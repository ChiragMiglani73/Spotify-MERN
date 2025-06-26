import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const [data,setData]=useState([]);

  const fetchAlbums=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`);

      if(response.data.success){
        setData(response.data.albums);
      } 
      
    } catch (error) {
      toast.error("Error Occurred");
    }
  }

  useEffect(()=>{
    fetchAlbums();
  },[])

  return (
    <div>
      <p>All Albums List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
         <b>Image</b>
         <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item,index)=>{
          return(
            
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
