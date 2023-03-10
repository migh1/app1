import { createContext, useState } from 'react';

import Input from './Input';
import { Modal } from './Modal';
import { ModalActionFooter } from './ModalActionFooter';
import { ModalScrollableList } from './ModalScrollableList';
import { ModalSelectedList } from './ModalSelectedList';
import { useDropdownHook } from './useDropdownHook';

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

const DropdownComponent = () => {
  const dropdownHook = useDropdownHook();

  return (
    <>
      <Input
        onOpenModalHandler={dropdownHook.onOpenModalHandler}
        buildPlaceHolder={dropdownHook.buildPlaceHolder}
        searchText={dropdownHook.searchText}
        onSearchHandler={dropdownHook.onSearchHandler}
      />

      {dropdownHook.isModalVisible && (
        <Modal
          searchText={dropdownHook.searchText}
          tempList={dropdownHook.tempList}
          scrollableList={scrollableList}
          buildSelectedStyle={dropdownHook.buildSelectedStyle}
          onToggleSelectedHandler={dropdownHook.onToggleSelectedHandler}
          onRemoveHandler={dropdownHook.onRemoveHandler}
          onCancelHandler={dropdownHook.onCancelHandler}
          onConfirmHandler={dropdownHook.onConfirmHandler}
        >
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <ModalScrollableList
                searchText={dropdownHook.searchText}
                scrollableList={scrollableList}
                buildSelectedStyle={dropdownHook.buildSelectedStyle}
                onToggleSelectedHandler={dropdownHook.onToggleSelectedHandler}
              />
              <ModalSelectedList
                tempList={dropdownHook.tempList}
                scrollableList={scrollableList}
                onRemoveHandler={dropdownHook.onRemoveHandler}
              />
            </div>
            <ModalActionFooter
              onCancelHandler={dropdownHook.onCancelHandler}
              onConfirmHandler={dropdownHook.onConfirmHandler}
            />
          </>
        </Modal>
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
