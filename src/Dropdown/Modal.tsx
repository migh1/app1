export const Modal = (props: any) => {
  return (
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
      {props.children}
    </div>
  );
};
