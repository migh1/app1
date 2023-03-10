import { useState } from 'react';

export const useDropdownHook = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [persistedList, setPersistedList] = useState<number[]>([]);
  const [tempList, setTempList] = useState<number[]>([]);
  const [searchText, setSearchText] = useState({
    prev: '',
    current: '',
  });

  const onOpenModalHandler = () => {
    setIsModalVisible(true);
    setSearchText((prevState: any) => {
      return {
        ...prevState,
        current: prevState.prev,
      };
    });
    setTempList(persistedList);
  };

  const onToggleSelectedHandler = (value: number) => {
    if (tempList.indexOf(value) === -1) {
      setTempList((prevState: any) => {
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
    setSearchText((prevState: any) => {
      return {
        prev: prevState.current,
        current: '',
      };
    });
  };

  const onCancelHandler = () => {
    setIsModalVisible(false);
    setSearchText((prevState: any) => {
      return {
        prev: prevState.current,
        current: '',
      };
    });
  };

  const onSearchHandler = (event: any) => {
    setSearchText((prevState: any) => {
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

  return {
    onOpenModalHandler,
    onToggleSelectedHandler,
    onConfirmHandler,
    onCancelHandler,
    onSearchHandler,
    onRemoveHandler,
    buildPlaceHolder,
    buildSelectedStyle,
    searchText,
    isModalVisible,
    tempList,
  };
};
