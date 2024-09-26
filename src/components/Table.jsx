import React from 'react';
import classnames from 'classnames';
import { useMemo, useState } from 'react';

const Table = ({ columns, data, fixHeader, pinning, pagination }) => {
  const [dataSource, setDataSource] = useState(data);

  const [order, setOrder] = useState(0);

  const [leftColumns, rightColumns, middleColumns] = useMemo(() => {
    let leftC = [],
      rightC = [],
      middleC = [];
    let left = [],
      right = [];
    if (pinning) {
      left = pinning.left || [];
      right = pinning.right || [];
    }
    for (let index = 0; index < columns.length; index++) {
      const { dataIndex } = columns[index];
      if (left.includes(dataIndex)) {
        leftC.push(columns[index]);
      } else if (right.includes(dataIndex)) {
        rightC.push(columns[index]);
      } else {
        middleC.push(columns[index]);
      }
    }
    return [leftC, rightC, middleC];
  }, [pinning, columns]);

  const newData = useMemo(() => {
    if (pagination) {
      const { pageSize } = pagination;
      // 这里根据pageSize做了一下限制长度；一般是后端返回的数组长度
      return dataSource.slice(0, pageSize);
    }
    return dataSource;
  }, [dataSource, pagination]);

  const thead = (
    <tr>
      {leftColumns.map(({ title, sort, dataIndex }) => (
        <th key={dataIndex} className="fixLeft">
          {title}
          {sort
            ? generateSortBarn({
                sort,
                order,
                handler: () => {
                  const newOrder = order + 1 > 2 ? 0 : order + 1;
                  setOrder(newOrder);
                  if (sort) {
                    const newDataSource = sort([...data], newOrder);
                    setDataSource(newDataSource);
                  }
                },
              })
            : null}
        </th>
      ))}
      {middleColumns.map(({ title, dataIndex }) => (
        <th key={dataIndex}>{title}</th>
      ))}
      {rightColumns.map(({ title, dataIndex }) => (
        <th key={dataIndex} className="fixRight">
          {title}
        </th>
      ))}
    </tr>
  );

  const tbody = newData.map((itemData, index) => {
    return (
      <tr key={index}>
        {leftColumns.map(({ dataIndex }) => (
          <td key={`td-${dataIndex}`} className="fixLeft">
            {itemData[dataIndex]}
          </td>
        ))}
        {middleColumns.map(({ dataIndex }) => (
          <td key={`td-${dataIndex}`}>{itemData[dataIndex]}</td>
        ))}
        {rightColumns.map(({ dataIndex }) => (
          <td key={`td-${dataIndex}`} className="fixRight">
            {itemData[dataIndex]}
          </td>
        ))}
      </tr>
    );
  });

  const pageNode = useMemo(() => {
    return generatePagination(pagination);
  }, [pagination]);

  return (
    <div className="tableWrap">
      <div style={{ height: 200 }} className={classnames('table', { fixHeader })}>
        <table>
          <thead>{thead}</thead>
          <tbody>{tbody}</tbody>
        </table>
      </div>
      <div className="pagination">{pageNode}</div>
    </div>
  );
};

const generatePagination = (pagination) => {
  const arr = [];
  if (pagination) {
    const { pageSize, total, current, onChange } = pagination;
    const count = Math.ceil(total / pageSize);
    for (let index = 1; index <= count; index++) {
      arr.push(
        <span
          className={classnames({ current: current + 1 === index })}
          onClick={() => {
            // onChange传递出去pageSize和curret请求接口获取数据
            onChange?.(pageSize, index - 1);
          }}
          key={index}
        >
          {index}
        </span>,
      );
    }
  } else {
    arr.push(
      <span className="current" key="1">
        1
      </span>,
    );
  }
  return arr;
};

const generateSortBarn = ({ sort, handler, order }) => {
  return (
    <span className={classnames({ sort: sort })} onClick={handler}>
      {order === 0 ? '><' : order === 1 ? '>>' : '<<'}
    </span>
  );
};

export default Table;
