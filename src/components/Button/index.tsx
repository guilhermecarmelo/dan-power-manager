import styles from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  caption: string;
}
const Button = ({ caption, style }: ButtonProps) => {
  return (
    <>
      <button type="submit" style={{ ...styles.button, ...style }}>
        {caption}
      </button>
    </>
  );
};

export default Button;
