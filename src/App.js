import React from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <div style={{ margin: 100 }}>
      <Table
        columns={[
          {
            dataIndex: 'left',
            title: '左边',
            sort: (data, order) => {
              if (order) {
                const newData = data.sort((prev, next) => {
                  if (order === 1) {
                    return prev['left'] > next['left'] ? 1 : -1;
                  } else {
                    return prev['left'] > next['left'] ? -1 : 1;
                  }
                });
                return newData;
              }
              return data;
            },
          },
          {
            dataIndex: 'middle',
            title: '中间',
          },
          {
            dataIndex: 'middle2',
            title: '中间',
          },
          {
            dataIndex: 'middle3',
            title: '中间',
          },
          {
            dataIndex: 'middle4',
            title: '中间',
          },
          {
            dataIndex: 'middle5',
            title: '中间',
          },
          {
            dataIndex: 'middle6',
            title: '中间',
          },
          {
            dataIndex: 'middle7',
            title: '中间',
          },
          {
            dataIndex: 'right',
            title: '右边',
          },
        ]}
        data={[
          { id: 2, left: 'l2', right: 'r2', middle: 'm2' },
          { id: 3, left: 'l3', right: 'r3', middle: 'm3' },
          { id: 4, left: 'l4', right: 'r4', middle: 'm4' },
          { id: 5, left: 'l5', right: 'r5', middle: 'm5' },
          { id: 1, left: 'l1', right: 'r1', middle: 'm1' },
          { id: 6, left: 'l6', right: 'r6', middle: 'm6' },
          { id: 7, left: 'l7', right: 'r7', middle: 'm7' },
          { id: 8, left: 'l8', right: 'r8', middle: 'm8' },
        ]}
        fixHeader
        pinning={{
          left: ['left'],
          right: ['right'],
        }}
        pagination={{
          pageSize: 5,
          current: 0,
          total: 8,
          onChange: (pageSize, current) => {
            console.log(pageSize, current);
          },
        }}
      />
    </div>
  );
}

export default App;
