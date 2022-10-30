import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    const initDraggable = async () => {
      const { Draggable } = await import('@shopify/draggable');
      const { Swappable } = await import('@shopify/draggable');
      const status = document.querySelectorAll<HTMLDivElement>('.status');
      // const draggable = new Draggable(status, { draggable: '.card' });
      const swapable = new Swappable(status, {draggable: '.card'})

      swapable.on('drag:start', () => {
        console.log('Started drawg');
      });

      return () => {
        swapable.destroy()
      }
    };

    initDraggable();
  }, []);

  return (
    <>
      <div className="board">
        <div className="status-container">
          <h3>TODO</h3>
          <div className="status status--done">
            <div className="card">Pick up bannan</div>
            <div className="card">Get apple</div>
            <div className="card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, explicabo dignissimos
            </div>
          </div>
        </div>

        <div className="status-container">
          <h3>DOING</h3>
          <div className="status status--done">
            <div className="card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, explicabo dignissimos
            </div>
            <div className="card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, explicabo dignissimos
            </div>
            <div className="card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, explicabo dignissimos
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .board {
            display: flex;
            gap: 2rem;
            height: 100%;
            padding: 1rem;
          }
          .status {
            background-color: rgb(248, 248, 248);
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            gap: var(--space-medium);
            width: 300px;
            height: 100%;
            padding: 1rem;
          }

          .card {
            background-color: white;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: var(--box-shadow-xs);
          }

          div :global(.draggable-source--is-dragging) {
            background-color: red;
          }

          div > :global(.draggable-mirror) {
            width: 300px;
          }
        `}
      </style>
    </>
  );
};

export default Test;
