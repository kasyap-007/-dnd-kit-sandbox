import React from 'react';
import './style.css';
import Stack from './components/Stack';
import Grid from './components/Grid';

export default function App() {
  return (
    <div>
      <h1>@dnd-kit</h1>
      <p>A playground to explore drag & drop using @dnd-kit</p>
      <Stack />
      <Grid />
    </div>
  );
}
