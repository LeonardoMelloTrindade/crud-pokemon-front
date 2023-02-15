import React from 'react';
import NavBar from '../components/navBar';

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  leftContainer: {
    height: '100%',
    margin: '0',
    padding: '0'
  },
  rightContainer: {
    width: '100%',
    backgroundImage: 'url(https://wallpaperaccess.com/full/8094964.gif)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

export default function Menu() {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.leftContainer}>
        <NavBar />
      </div>
      <div style={styles.rightContainer} />
    </div>
  );
}