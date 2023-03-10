const Input = (props: any) => {
  return (
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
        onClick={props.onOpenModalHandler}
        type="text"
        placeholder={props.buildPlaceHolder()}
        style={{ padding: '18px 5px 10px 5px' }}
        value={props.searchText.current}
        onChange={props.onSearchHandler}
      />
    </div>
  );
};

export default Input;
