import { Button, Tree } from '@tuesday/ui';
import React, { useEffect } from 'react';
import { BoardButton } from '../lib/views/board/sidebar/BoardPane-Boards';

const Test = () => {
  return (
    <>
      <Tree
        treeData={[
          {
            key: 'web',
            component: <Button> Web Revived </Button>,
            children: [
              <BoardButton type="DOCUMENT" key="master">
                Master
              </BoardButton>,
              {
                key: 'backend',
                component: <Button>Backend</Button>,
                children: [
                  <BoardButton type="DOCUMENT" key="hello">
                    {' '}
                    Server{' '}
                  </BoardButton>,
                ],
              },
            ],
          },
        ]}
      />

      <style jsx>{``}</style>
    </>
  );
};

export default Test;
