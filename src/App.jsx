import { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css'


function App() {
  const [wallet, setWallet] = useState('');

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts[0]);
        setWallet(accounts[0]);
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('install metamask');
    }
  }

  const getConnectedWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log(accounts[0]);
          setWallet(accounts[0]);
        } else {
          console.log('connect metamask');
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('install metamask');
    }
  }

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWallet(accounts[0]);
      })
    } else {
      console.log('install metamask');
    }
  }

  useEffect(() => {
    getConnectedWallet();
    addWalletListener();
  }, [])


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Button onClick={connectWallet} variant="outlined" color="inherit">Connect wallet</Button>
            <Typography variant="h6" component="div" >
              {wallet?.length > 0 ? wallet.slice(0, 5) + '...' + wallet.slice(wallet.length - 4, wallet.length) : ''}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

    </>
  )
}

export default App
