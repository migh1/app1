export const ModalActionFooter = (props: any) => {
  return (
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
        onClick={props.onCancelHandler}
        type="button"
        style={{ marginRight: '5px', border: 'none', background: 'none' }}
      >
        Cancel
      </button>
      <button
        onClick={props.onConfirmHandler}
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
  );
};
