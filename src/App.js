
import './App.css';
import { useEffect, useState } from 'react';
import PostList from './PostList';
import Pagination from './Pagination';
import queryString from 'query-string';
import React, { Component }  from 'react';


function App() {
  const [postList, setPostList] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 70,
  });

  const [filters, setFilters] = useState({
    _limit: 5,
    _page: 1,
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON })

        const { data,pagination } = responseJSON;
        setPostList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed', error.message)

      }
    }
    fetchPostList();
  }, [filters]);


  function handlePageChange(newPage) {
    console.log('new page:', newPage)
    setFilters({
      ...filters,
      _page:newPage,

    })

  }

  return (
    <div className="App">
      <h1>Fetch API</h1>
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
