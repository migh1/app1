// import 'antd/dist/antd.min.css';
import { createContext, useState } from 'react';

const DropdownContext = createContext({ list: [] });

const DropdownProvider = (props: any) => {
  const [list, setList] = useState([]);

  return (
    <DropdownContext.Provider
      value={{
        list,
      }}
    >
      {props.children}
    </DropdownContext.Provider>
  );
};

const scrollableList = [
  { value: 1, label: 'Vancouver' },
  { value: 2, label: 'Toronto' },
  { value: 3, label: 'Tokyo' },
  { value: 4, label: 'Kyoto' },
  { value: 5, label: 'Ontario' },
  { value: 6, label: 'Quebec' },
  { value: 7, label: 'New York' },
  { value: 8, label: 'Los Angeles' },
  { value: 9, label: 'London' },
  { value: 10, label: 'Paris' },
  { value: 11, label: 'Sydney' },
  { value: 12, label: 'Melbourne' },
  { value: 13, label: 'Rome' },
  { value: 14, label: 'Berlin' },
  { value: 15, label: 'Amsterdam' },
  { value: 16, label: 'Barcelona' },
  { value: 17, label: 'Dubai' },
  { value: 18, label: 'Singapore' },
  { value: 19, label: 'Hong Kong' },
];

const DropdownComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [persistedList, setPersistedList] = useState<number[]>([]);
  const [tempList, setTempList] = useState<number[]>([]);
  const [searchText, setSearchText] = useState({
    prev: '',
    current: '',
  });

  const onOpenModalHandler = () => {
    setIsModalVisible(true);
    setSearchText(prevState => {
      return {
        ...prevState,
        current: prevState.prev,
      };
    });
    setTempList(persistedList);
  };

  const onToggleSelectedHandler = (value: number) => {
    if (tempList.indexOf(value) === -1) {
      setTempList(prevState => {
        return [...prevState, value];
      });
    } else {
      const tempListWithoutTheSelectedOption = tempList.filter(tl => {
        return tl !== value;
      });
      setTempList(tempListWithoutTheSelectedOption);
    }
  };

  const onConfirmHandler = () => {
    setPersistedList(tempList);
    setIsModalVisible(false);
    setSearchText(prevState => {
      return {
        prev: prevState.current,
        current: '',
      };
    });
  };

  const onCancelHandler = () => {
    setIsModalVisible(false);
    setSearchText(prevState => {
      return {
        prev: prevState.current,
        current: '',
      };
    });
  };

  const onSearchHandler = (event: any) => {
    setSearchText(prevState => {
      return {
        ...prevState,
        current: event.target.value,
      };
    });
  };

  const onRemoveHandler = (element?: number) => {
    const newTempList = tempList.filter(tl => {
      return !(tl === element);
    });
    setTempList(newTempList);
  };

  const buildPlaceHolder = () => {
    if (persistedList.length) {
      return `${persistedList.length} selected`;
    }
    return 'Search';
  };

  const buildSelectedStyle = (option: number) => {
    if (tempList.includes(option)) {
      return {
        padding: '10px 0',
        border: '1px solid cyan',
        background: 'lightblue',
      };
    }
    return {
      padding: '10px 0',
      border: 'none',
    };
  };

  return (
    <>
      <div>
        <span
          style={{
            position: 'absolute',
            color: 'lightgray',
            padding: '4px 0 0 4px',
            fontSize: 12,
          }}
        >
          Destination
        </span>
        <input
          onClick={onOpenModalHandler}
          type="text"
          placeholder={buildPlaceHolder()}
          style={{ padding: '18px 5px 10px 5px' }}
          value={searchText.current}
          onChange={onSearchHandler}
        />
      </div>

      {isModalVisible && (
        <div
          className="dropdown-modal"
          style={{
            display: 'flex',
            border: '1px solid red',
            flexDirection: 'column',
            maxWidth: 500,
            maxHeight: 500,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
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
              {searchText.current ? (
                <ul style={{ listStyleType: 'none', padding: '0 5px' }}>
                  {scrollableList
                    .filter(sl =>
                      sl.label
                        .toLowerCase()
                        .includes(searchText.current.toLowerCase()),
                    )
                    .map(sl => {
                      return (
                        <li
                          key={sl.value}
                          value={sl.value}
                          style={buildSelectedStyle(sl.value)}
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
                            onClick={() => onToggleSelectedHandler(sl.value)}
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
            <div
              className="selected-list-container"
              style={{ border: '1px solid blue', flexGrow: 1, padding: 10 }}
            >
              <span>
                <strong>Selected ({tempList.length})</strong>
              </span>
              <ul style={{ listStyleType: 'none', padding: '0 5px' }}>
                {tempList.map(tl => {
                  const option = scrollableList.find(sl => sl.value === tl);
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
                          onClick={() => onRemoveHandler(option?.value)}
                        >
                          <span>X</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className="action-footer"
            style={{
              border: '1px solid green',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px 10px',
            }}
          >
            <button
              onClick={onCancelHandler}
              type="button"
              style={{ marginRight: '5px', border: 'none', background: 'none' }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirmHandler}
              type="button"
              style={{
                background: 'none',
                borderRadius: '5px',
                borderColor: 'gray',
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <DropdownProvider>
        <DropdownComponent />
      </DropdownProvider>
    </div>
  );
}

export default App;
