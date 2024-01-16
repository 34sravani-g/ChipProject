import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import './ChipInput.css'

interface ChipInputProps {
  items: string[]
}

const ChipInput: React.FC<ChipInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    setShowAutocomplete(value.trim() !== '')
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newItem = inputValue.trim()
      if (items.includes(newItem) && !selectedItems.includes(newItem)) {
        setSelectedItems([...selectedItems, newItem])
        setInputValue('')
        setShowAutocomplete(false)
      }
    }

    if (event.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1]
      setSelectedItems(selectedItems.slice(0, -1))
      setInputValue(lastSelectedItem)
    }
  }

  const handleChipRemove = (removedItem: string) => {
    const updatedItems = selectedItems.filter(item => item !== removedItem)
    setSelectedItems(updatedItems)
  }

  const handleAutocompleteItemClick = (item: string) => {
    setSelectedItems([...selectedItems, item])
    setInputValue('')
    setShowAutocomplete(false)
  }

  const filteredItems = items.filter(
    item =>
      item.toLowerCase().includes(inputValue.toLowerCase()) && !selectedItems.includes(item)
  )

  return (
    <div className="chip-input-container">
      <div className="selected-chips">
        {selectedItems.map(item => (
          <div key={item} className="chip">
            {item}
            <button onClick={() => handleChipRemove(item)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={selectedItems.length === 0 ? 'Type and press Enter' : ''}
        className="custom-input"
      />
      {showAutocomplete && (
        <div className="autocomplete-box">
          <ul>
            {filteredItems.map(item => (
              <li key={item} onClick={() => handleAutocompleteItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ChipInput
