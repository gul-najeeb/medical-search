// import "./style.css";
import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaClock,
  FaClosedCaptioning,
  FaComments,
  FaCreditCard,
  FaRegCalendarAlt,
} from "react-icons/fa";

import SearchBox from "./SearchBox";
import { Button } from "react-bootstrap";

const Test1 = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const handleClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
          console.log(position);
        },
        (err) => {
          setLocation(null);
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    handleClick();
  }, []);
  const [selectedLink, setSelectedLink] = useState("Time Clock");
  const navItems = [
    {
      id: 1,
      label: "Time Clock",
      icon: <FaClock />,
      link: "#",
      section: false,
    },
    {
      id: 2,
      label: "Time Sheet",
      icon: <FaClipboardList />,
      link: "#",
      section: false,
    },
    {
      id: 3,
      label: "Time Off",
      icon: <FaRegCalendarAlt />,
      link: "#",
      section: false,
    },
    { id: 4, label: "Account", icon: null, link: null, section: true },
    {
      id: 5,
      label: "Pay Runs",
      icon: <FaCreditCard />,
      link: "#",
      section: false,
    },
    {
      id: 6,
      label: "Messages",
      icon: <FaComments />,
      link: "#",
      section: false,
    },
  ];
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside className="d-none d-lg-block" style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Clockspot</div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
              {/* Render section title if it's a section item */}
              {item.section && (
                <div style={styles.sectionTitle}>{item.label}</div>
              )}
              {/* Render nav link */}
              {!item.section && (
                <a
                  href={item.link}
                  className={`link ${
                    selectedLink === item.id ? "bg-secondary" : ""
                  }`}
                  style={styles.navItem}
                  onClick={() => setSelectedLink(item.id)}
                >
                  {item.icon}
                  &nbsp; {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <SearchBox />
        <ClockCard />
      </main>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <a href="#" style={styles.navItem}>
    <FaClock />
    &nbsp; {label}
  </a>
);

const ClockCard = () => (
  <div style={{...styles.clockCard, ...{marginTop: '0.8rem'}}}>
    <p>You clocked in at</p>
    <h2 style={styles.clockTime}>11:55 pm</h2>
    <p>
      Total time worked: <span style={styles.timeText}>44 mins</span>
    </p>

    <div style={{ ...styles.buttonGroup, ...{ marginBottom: "0.4rem" } }}>
      <Button>Write a shift report</Button>
      <Button variant="danger" className="ml-2" style={{marginLeft: '0.5rem'}}>End shift</Button>
    </div>
    <a href="#" style={{ ...{ textdecoration: "none" } }}>
      or start job
    </a>
  </div>
);

// const PermissionPopup = ({handleClick}) => {
//  const [shown, setShown] = useState(true)

//   return <div className='' hidden={!shown} style={styles.popup}>
//     <p>192.168.1.107 wants to:</p>
//     <p style={styles.timeText}>Know your location</p>
//     <div style={styles.actionButtons}>
//       <button style={{ ...styles.popupButton, ...styles.popupButtonBlock }} onClick={() => setShown(false)}>Block</button>
//       <button style={{ ...styles.popupButton, ...styles.popupButtonAllow }} onClick={() => {handleClick(); setShown(false)}}>Allow</button>
//     </div>
//   </div>
// };

// Styles as JavaScript objects
const styles = {
  wrapper: {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1f2937",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    fontSize: "1.25rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "64px",
    borderBottom: "1px solid #374151",
    color: "#3b82f6",
  },
  nav: {
    padding: "1rem",
    flexGrow: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    color: "#e5e7eb",
    textDecoration: "none",
    transition: "background 0.3s",
    cursor: "pointer",
  },
  sectionTitle: {
    color: "#9ca3af",
    fontSize: "0.75rem",
    fontWeight: 600,
    margin: "1.5rem 0 0.5rem",
  },
  mainContent: {
    flexGrow: 1,
    // position: 'absolute',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  clockCard: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  clockTime: {
    fontSize: "1.875rem",
    color: "#3b82f6",
    marginTop: "0.5rem",
  },
  timeText: {
    fontWeight: 600,
    color: "#374151",
  },
  buttonGroup: {
    marginTop: "1.5rem",
  },
  button: {
    fontWeight: 600,
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
    margin: "0 0.25rem",
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  buttonPrimaryHover: {
    backgroundColor: "#2563eb",
  },
  buttonDanger: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  buttonDangerHover: {
    backgroundColor: "#dc2626",
  },
  link: {
    color: "#3b82f6",
    fontSize: "0.875rem",
    display: "inline-block",
    marginTop: "1rem",
    textDecoration: "none",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: "2%",
    left: "26%",
    margin: "auto",

    // left: '50%',
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    padding: "1rem",
    maxWidth: "400px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  popupButton: {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
    margin: "0 0.25rem",
  },
  popupButtonBlock: {
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
  },
  popupButtonAllow: {
    backgroundColor: "#93c5fd",
    color: "#1d4ed8",
  },
};

export default Test1;
