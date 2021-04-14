import React, {
  useState,
  useEffect
} from 'react';
import { 
  List, 
  message, 
  Avatar, 
  Spin 
} from 'antd';
import { get } from '../../utils/require';
import Infinite from 'react-infinite-scroller';
import './style.css';

const fakeDataUrl = 'https://randomuser.me/api';

const InfiniteScroll = () => {
  const [listData, setListData] = useState(
    [
      {
          "gender": "male",
          "name": {
              "title": "Mr",
              "first": "Kenan",
              "last": "Drabløs"
          },
          "email": "kenan.drablos@example.com",
          "nat": "NO"
      },
      {
          "gender": "male",
          "name": {
              "title": "Mr",
              "first": "محمدمهدی",
              "last": "نجاتی"
          },
          "email": "mhmdmhdy.njty@example.com",
          "nat": "IR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Sarah",
              "last": "Johnson"
          },
          "email": "sarah.johnson@example.com",
          "nat": "NZ"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Urbana",
              "last": "Nogueira"
          },
          "email": "urbana.nogueira@example.com",
          "nat": "BR"
      },
      {
          "gender": "male",
          "name": {
              "title": "Mr",
              "first": "Perry",
              "last": "Parker"
          },
          "email": "perry.parker@example.com",
          "nat": "US"
      }
    ]
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const handleFetchData = async () => {
    let data = await get(fakeDataUrl, {
      params: {
        results: 5,
        inc: 'name,gender,email,nat',     
      }
    })
    let res = data.data.results;
    console.log(res);
    return res;
  }
  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    if(listData.length > 30) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
      setLoading(false);
      return ;
    }
    let res = await handleFetchData();
    let prevData = listData;
    prevData = prevData.concat(res);
    setListData(prevData);
    setLoading(false);
  }
  return (
    <div className="demo-infinite-container">
      <Infinite
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={listData}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        >
          {
            loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )
          }
        </List>

      </Infinite>
    </div>
  )
}

export default InfiniteScroll
