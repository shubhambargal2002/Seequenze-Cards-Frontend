import React, { useState, useEffect } from 'react';
import "../App.css";

const CardForm = ({ onClose, onAddCard, onUpdateCard, cardForEdit }) => {
    const [isEditing] = useState(!!cardForEdit);

      const handleAddCard = () => {
        onAddCard(editedCard);
        onClose();
      };
  
    const [editedCard, setEditedCard] = useState({
      title: cardForEdit?.title || '',
      description: cardForEdit?.description || '',
      image: null,
    });
  
    useEffect(() => {
      setEditedCard({
        title: cardForEdit?.title || '',
        description: cardForEdit?.description || '',
        image: null,
      });
    }, [cardForEdit]);
  
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      const newValue = name === 'image' ? files[0] : value;
      setEditedCard({ ...editedCard, [name]: newValue });
    };
  
    const handleUpdateCard = () => {
      onUpdateCard(cardForEdit._id, editedCard);
      onClose();
    };
  
    return (
      <div className='form_container'>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={editedCard.title}
          onChange={handleInputChange}
          required
          className='form_input'
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={editedCard.description}
          onChange={handleInputChange}
          required
          className='form_input'
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleInputChange}
          required 
          className='form_input file_input'
        />
        {isEditing ? (
          <button onClick={handleUpdateCard} className='card_btn full_width_button'>Update Card</button>
        ) : (
          <button onClick={handleAddCard} className='card_btn full_width_button'>Add Card</button>
        )}
      </div>
    );
  };

export default CardForm;
  