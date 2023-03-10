export const ModalSelectedList = (props: any) => {
  return (
    <div
      className="selected-list-container"
      style={{ border: '1px solid blue', flexGrow: 1, padding: 10 }}
    >
      <span>
        <strong>Selected ({props.tempList.length})</strong>
      </span>
      <ul style={{ listStyleType: 'none', padding: '0 5px' }}>
        {props.tempList.map((tl: any) => {
          const option = props.scrollableList.find(
            (sl: any) => sl.value === tl,
          );
          return (
            <li key={option?.value}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'lightgray',
                  borderRadius: '5px',
                  padding: '5px',
                  marginBottom: '10px',
                }}
              >
                <span>{option?.label}</span>

                <button
                  type="button"
                  style={{
                    background: 'none',
                    color: 'inherit',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    outline: 'inherit',
                  }}
                  onClick={() => props.onRemoveHandler(option?.value)}
                >
                  <span>X</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
