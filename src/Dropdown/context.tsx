import { createContext, useContext, useState } from 'react';

export interface IDropdownContext {
  onOpenModalHandler: () => void;
  buildPlaceHolder: () => string;
  searchText: { prev: string; current: string };
  onSearchHandler: (event: any) => void;
  isModalVisible: boolean;
  tempList: number[];
  setTempList: (list: number[]) => void;
}

const DropdownContext = createContext({} as IDropdownContext);

const DropdownProvider = (props: any) => {
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

  const buildPlaceHolder = () => {
    if (persistedList.length) {
      return `${persistedList.length} selected`;
    }
    return 'Search';
  };

  const onSearchHandler = (event: any) => {
    setSearchText(prevState => {
      return {
        ...prevState,
        current: event.target.value,
      };
    });
  };

  return (
    <DropdownContext.Provider
      value={{
        onOpenModalHandler,
        buildPlaceHolder,
        searchText,
        onSearchHandler,
        isModalVisible,
        tempList,
        setTempList,
      }}
    >
      {props.children}
    </DropdownContext.Provider>
  );
};

function useDropdownContext(): IDropdownContext {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdown should be used within DropdownProvider');
  }

  return context;
}

export { DropdownProvider, useDropdownContext };
