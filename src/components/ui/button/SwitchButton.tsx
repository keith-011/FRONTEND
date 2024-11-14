import React, { useState } from 'react';

interface SwitchButtonProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ initialChecked = false, onChange }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleSwitchChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  // Type the styles with React.CSSProperties for type safety
  const switchStyles: { [key: string]: React.CSSProperties } = {
    switchContainer: {
      display: 'inline-flex',
      cursor: 'pointer',
    },
    switchButton: {
      width: '40px',
      height: '20px',
      borderRadius: '20px',
      backgroundColor: checked ? '#4caf50' : '#667479',
      position: 'relative',
      transition: 'background-color 0.3s ease',
    },
    switchCircle: {
      position: 'absolute',
      top: '2px',
      left: checked ? '20px' : '2px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: 'white',
      transition: 'transform 0.3s ease',
    },
  };

  return (
    <div style={switchStyles.switchContainer} onClick={handleSwitchChange}>
      <div style={switchStyles.switchButton}>
        <div style={switchStyles.switchCircle}></div>
      </div>
    </div>
  );
};

export default SwitchButton;
