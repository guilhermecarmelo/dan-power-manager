import styles from "./styles";

const Label = ({ children, style }) => {
  return (
    <>
      <label style={{ ...styles.label, ...style }}>{...children}</label>
    </>
  );
};

export default Label;
