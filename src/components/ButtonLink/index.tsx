import Link, { LinkProps } from "next/link";
import styles from "./styles";

interface CtaProps extends LinkProps {
  caption: string;
  style?;
}

// cta
const ButtonLink = ({ caption, ...props }: CtaProps) => {
  return (
    <Link {...props} passHref style={{ ...styles.button, ...props.style }}>
      {caption}
    </Link>
  );
};

export default ButtonLink;
