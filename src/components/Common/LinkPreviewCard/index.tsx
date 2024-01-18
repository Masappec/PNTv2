import React, { useState } from 'react';

const LinkPreviewCard = () => {
  const [link, setLink] = useState('');

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <div>
      
      <input
        type="text"
        placeholder="Enter link"
        value={link}
        onChange={handleInputChange}
      />

      <iframe
        src={link}
        style={{
          width: '100%',
          height: '500px',
          border: 0,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="9j8l6n0q0"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        //frame-ancestors
        
        />
    </div>
  );
};

export default LinkPreviewCard;
