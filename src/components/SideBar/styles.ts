const styles = {
  sidebarContainer: {
    display: "block",
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  sidebar: {
    height: "100vh",
    backgroundColor: "#007bff",
    paddingTop: "2rem",
    paddingLeft: "2rem",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    position: "fixed" as "fixed",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  navItem: {
    //width: "100%",
    marginBottom: "20px",
    display: "flex",
    padding: "10px",
    color: "rgb(159 18 57)",
    height: "30px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
    display: "flex",
    transition: "background-color 0.3s, padding-left 0.3s",
    borderRadius: "5px",
    width: "200px",
  },
  icon: {
    fontSize: "2rem",
  },
  linkText: {
    marginLeft: "10px",
    transition: "opacity 0.3s",
  },
  toggleButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    top: "10px",
    marginBottom: "2rem",
  },
};
export default styles;
