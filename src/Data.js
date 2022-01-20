import React from 'react';
import { useDataState, useDataDispatch, getData } from './DataContext';

function Data() {
  const state = useDataState();
  const dispatch = useDataDispatch();

  const { data, loading, error } = state.data;
  const fetchData = () => {
    getData(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <button onClick={fetchData}>불러오기</button>;

  return (
      <>
        <ul>
          {data.map(d => (
              <li key={d.id}>
                {d.id} ({d.title}) - {d.done ? 'DONE' : 'NOT YET'}
              </li>
          ))}
        </ul>
        <button onClick={fetchData}>다시 불러오기</button>
      </>
  );
}

export default Data;
