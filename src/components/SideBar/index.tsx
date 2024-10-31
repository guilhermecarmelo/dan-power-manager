import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaFileAlt, FaHome, FaUser } from "react-icons/fa"; // Ícone de usuário adicionado
import { TbLogin } from "react-icons/tb";
import styles from "./styles";

function logoutUser() {
  deleteCookie("token");
}

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div style={styles.sidebarContainer}>
      <nav
        style={{ ...styles.sidebar, width: isOpen ? "200px" : "70px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button style={styles.toggleButton} onClick={toggleSidebar}>
          <FaBars style={styles.icon} />
        </button>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/" passHref style={styles.navLink}>
              <FaHome style={styles.icon} />
              {isOpen && <span style={styles.linkText}>Início</span>}
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/romaneios" passHref style={styles.navLink}>
              <FaFileAlt style={styles.icon} />
              {isOpen && <span style={styles.linkText}>Romaneio</span>}
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/users" passHref style={styles.navLink}>
              <FaUser style={styles.icon} />
              {isOpen && <span style={styles.linkText}>Usuários</span>}
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              href="/login"
              passHref
              style={styles.navLink}
              onClick={logoutUser}
            >
              <TbLogin style={styles.icon} />
              {isOpen && <span style={styles.linkText}>Sair</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
