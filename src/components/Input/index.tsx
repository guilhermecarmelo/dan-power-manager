import styles from "./styles";

const Input = ({
  type,
  id,
  placeholder,
  error,
  register,
  emptyerror,
  style,
}) => {
  return (
    <>
      <div style={styles.inputGroup}>
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          style={{ ...styles.input, ...style }}
          {...register(id, { required: true })}
        />

        <span style={styles.error}>{error && emptyerror}</span>
      </div>
    </>
  );
};

export default Input;
