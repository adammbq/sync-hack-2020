<<<<<<< HEAD
import React, { useState } from 'react'
import { AccountCard, FacebookFeed, LineGraph, ManageAccount, PieGraph, SearchCompanies, Sidebar } from '../components';
=======
import React, { useState, useEffect } from 'react';
import { AccountCard, FacebookFeed, ManageAccount, PieGraph, SearchCompanies, Sidebar } from '../components';
>>>>>>> dae16c1c1ee7a02d3e61d6a1b923f8a6f13557dc
import { Link } from '@material-ui/core';

import { green } from '@material-ui/core/colors';

import './Content.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';


import { ThemeProvider } from '@material-ui/core/styles';
import RalewayWoff2 from './raleway-v17-latin-regular.woff2';
import { createMuiTheme }  from '@material-ui/core/styles'
import { lightBlue } from '@material-ui/core/colors';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
    palette: {
        primary: {
          main: lightBlue[500],
        },
        secondary: {
          main: lightBlue[500],
        },
    },  
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});

export default function Content(props) {
    
    useEffect (() => {
        fetch("/home").then(response => 
            response.json().then(data => {
                console.log(data);
            })
        );
    }, [])


    
    const [show, setShow] = useState("Dashboard")
    
    var accounts = [
        {
            name: "Facebook",
            grade: "D",
            time: "200"
        },
        {
            name: "Instagram",
            grade: "C",
            time: "164"
        },
        {
            name: "Twitter",
            grade: "B",
            time: "374"
        },
        {
            name: "Reddit",
            grade: "C",
            time: "193"
        }
    ];

    function changeView(tab) {
        if (tab === 0) {
            setShow("Dashboard");
        } else if (tab === 1) {
            setShow("Accounts");
        } else {
            setShow("Companies");
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <h2>Platforms</h2>
        <div className="container">
            <div className="side-container">
                <Sidebar show={show} accounts={accounts} changeView={changeView}>
                </Sidebar>
            </div>
            {show === "Dashboard" &&
                <div className="dash-container">
                    <div className="top-container">
                        {accounts.map((company, idx) => {
                            return(
                                <AccountCard className="item" company={company}></AccountCard>
                            )
                        })}
                    </div>
                    <div className="bottom-container">
                        <PieGraph companies={accounts}></PieGraph>
                        <PerfectScrollbar style={{ width: '100%' }}>
                            <FacebookFeed></FacebookFeed>
                        </PerfectScrollbar>
                    </div>
                </div>}
            {show === "Accounts" &&
                <div className="acc-container">
                    <div className="left-container">
                        <ManageAccount></ManageAccount>
                    </div>
                    <div className="right-container">
                        <SearchCompanies></SearchCompanies>
                    </div>
                </div>}
            {show === "Companies" &&
                <div className="acc-container">
                    <div className="left-container">
                        <LineGraph companies={accounts}></LineGraph>
                    </div>
                    <div className="right-container">
                    <PerfectScrollbar style={{ width: '100%' }}>
                        <FacebookFeed></FacebookFeed>
                    </PerfectScrollbar>
                    </div>
                </div>}
        </div>
        </ThemeProvider>
    )
}

