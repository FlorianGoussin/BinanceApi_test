import { useState, useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Trades, Ticker, Ticker24 } from './tables';
import { CurrencyPairContext } from '../CurrencyPairContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Results() {
  const [tabValue, setTabValue] = useState<number>(0);
  const { currencyPair } = useContext(CurrencyPairContext);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (currencyPair?.label) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="Results tabs">
            <Tab label="Trades" {...a11yProps(0)} />
            <Tab label="Ticker" {...a11yProps(1)} />
            <Tab label="Ticker 24h" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <Trades />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Ticker />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <Ticker24 />
        </CustomTabPanel>
      </Box>
    );
  }
}