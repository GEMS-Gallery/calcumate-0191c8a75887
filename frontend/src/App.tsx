import React, { useState } from 'react';
import { Container, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import {
  Rocket as RocketIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Satellite as SatelliteIcon,
  Star as StarIcon,
  Public as PublicIcon,
  Explore as ExploreIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  Brightness1 as Brightness1Icon,
  Brightness2 as Brightness2Icon,
  Brightness3 as Brightness3Icon,
  Brightness4 as Brightness4Icon,
  Brightness5 as Brightness5Icon,
  Brightness6 as Brightness6Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => prev + num);
  };

  const handleOperationClick = (op: string) => {
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = async () => {
    const parts = display.split(' ');
    if (parts.length !== 3) {
      setDisplay('Error');
      return;
    }

    const [num1, operation, num2] = parts;
    setLoading(true);

    try {
      const result = await backend.calculate(operation, parseFloat(num1), parseFloat(num2));
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    } finally {
      setLoading(false);
    }
  };

  const buttonConfig = [
    { text: '7', icon: <Brightness1Icon /> },
    { text: '8', icon: <Brightness2Icon /> },
    { text: '9', icon: <Brightness3Icon /> },
    { text: '/', icon: <RocketIcon /> },
    { text: '4', icon: <Brightness4Icon /> },
    { text: '5', icon: <Brightness5Icon /> },
    { text: '6', icon: <Brightness6Icon /> },
    { text: '*', icon: <StarIcon /> },
    { text: '1', icon: <Brightness7Icon /> },
    { text: '2', icon: <SatelliteIcon /> },
    { text: '3', icon: <PublicIcon /> },
    { text: '-', icon: <RemoveIcon /> },
    { text: 'C', icon: <ClearIcon /> },
    { text: '0', icon: <ExploreIcon /> },
    { text: '=', icon: <FlightLandIcon /> },
    { text: '+', icon: <AddIcon /> },
  ];

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={display}
        InputProps={{
          readOnly: true,
        }}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={1}>
        {buttonConfig.map((btn) => (
          <Grid item xs={3} key={btn.text}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                switch (btn.text) {
                  case 'C': handleClear(); break;
                  case '=': handleCalculate(); break;
                  case '+': case '-': case '*': case '/': handleOperationClick(btn.text); break;
                  default: handleNumberClick(btn.text);
                }
              }}
              disabled={loading}
              className="calculator-button"
            >
              {btn.icon}
              {btn.text}
            </Button>
          </Grid>
        ))}
      </Grid>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Container>
  );
};

export default App;