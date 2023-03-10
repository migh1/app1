export const ModalScrollableList = (props: any) => {
  return (
    <div
      className="scrollable-list"
      style={{
        border: '1px solid yellow',
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: 250,
        padding: 10,
      }}
    >
      <span>
        <strong>Results</strong>
      </span>
      {props.searchText.current ? (
        <ul style={{ listStyleType: 'none', padding: '0 5px' }}>
          {props.scrollableList
            .filter((sl: any) =>
              sl.label
                .toLowerCase()
                .includes(props.searchText.current.toLowerCase()),
            )
            .map((sl: any) => {
              return (
                <li
                  key={sl.value}
                  value={sl.value}
                  style={props.buildSelectedStyle(sl.value)}
                >
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
                    onClick={() => props.onToggleSelectedHandler(sl.value)}
                  >
                    {sl.label}
                  </button>
                </li>
              );
            })}
        </ul>
      ) : (
        <p>Enter a destination to see results.</p>
      )}
    </div>
  );
};
