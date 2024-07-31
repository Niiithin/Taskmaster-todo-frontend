export default {
  accountPopover: {
    width: 280,
    padding: 2,
  },
  popoverHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 2,
  },
  username: {
    fontWeight: "bold",
  },
  divider: {
    my: 1,
  },
  logoutButtonContainer: {
    mt: 2,
  },
  logoutButton: {
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)", // light blue background on hover
      color: "#1565c0", // darker blue text on hover
    },
  },
};
