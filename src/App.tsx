// src/App.tsx
import React from 'react';
import Button from './components';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Button Clicked!');
  };

  return (
    <div>
      <h1>Custom Button Example</h1>
      <Button label="Primary Button" onClick={handleClick} variant="primary" />
      <Button label="Secondary Button" onClick={handleClick} variant="secondary" />
    </div>
  );
};

export default App;
