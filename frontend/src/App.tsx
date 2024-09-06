import React, { useState } from 'react';
import { Container, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

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
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
          <Grid item xs={3} key={btn}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                switch (btn) {
                  case 'C': handleClear(); break;
                  case '=': handleCalculate(); break;
                  case '+': case '-': case '*': case '/': handleOperationClick(btn); break;
                  default: handleNumberClick(btn);
                }
              }}
              disabled={loading}
            >
              {btn}
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