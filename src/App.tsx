import React from 'react'
import ChipInput from './components/ChipInput'

const App: React.FC = () => {
  const availableItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

  return (
    <div className="App">
      <h1>Chip Input Demo</h1>
      <ChipInput items={availableItems} />
    </div>
  )
}

export default App
