import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardForm from './CardForm';
import CustomModal from './CustomModal';
import "../App.css";
import { toast } from "react-toastify";
const host = "https://seequenze-cards-shubham-bargal.onrender.com";

const Dashboard = ()=> {
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
  
    useEffect(() => {
      // Read Operation - Fetch all cards
      axios
        .get(`${host}/api/cards`)
        .then((response) => setCards(response.data))
        .catch((error) => console.error(error));
    }, []);
  
    const handleAddCard = (newCard) => {
      // Create Operation - Add new card
      const formData = new FormData();
      formData.append('title', newCard.title);
      formData.append('description', newCard.description);
      formData.append('image', newCard.image);
  
      axios
        .post(`${host}/api/cards`, formData)
        .then((response) => {
          setCards([...cards, response.data]);
          toast.success("Card Added Successfully");
        })
        .catch((error) => console.error(error));
    };
  
    const handleUpdateCard = (id, updatedCard) => {
      // Update Operation - Update an existing card
      const formData = new FormData();
      formData.append('title', updatedCard.title);
      formData.append('description', updatedCard.description);
      formData.append('image', updatedCard.image);
  
      axios
        .put(`${host}/api/cards/${id}`, formData)
        .then((response) => {
          const updatedCards = cards.map((card) =>
            card._id === id ? response.data : card
          );
          setCards(updatedCards);
          toast.success("Card Updated Successfully");
        })
        .catch((error) => console.error(error));
    };
  
    const handleDeleteCard = (id) => {
      // Delete Operation - Delete a card
      axios
        .delete(`${host}/api/cards/${id}`)
        .then(() => {
          setCards(cards.filter((card) => card._id !== id));
          toast.success("Card Deleted Successfully");
        })
        .catch((error) => console.error(error));
    };
  
    const openModal = (card) => {
      setEditingCard(card);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setEditingCard(null);
      setIsModalOpen(false);
    };
  
    return (
      <div className='dashboard_container'>
        {/* Open CardForm as a modal */}
        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <div className='close_container'>
              <button onClick={closeModal} className='card_btn'>Close Modal</button>
            <CardForm
              onClose={closeModal}
              onAddCard={handleAddCard}
              onUpdateCard={handleUpdateCard}
              cardForEdit={editingCard}
            />
          </div>
        </CustomModal>
  
        {/* Add Card button */}
        <button onClick={() => openModal(null)} className='add_btn'>Add Card</button>
  
        {/* Read Operation - Display all cards */}
        <div className='cards_container'>
          {cards.map((card) => (
            <div key={card._id} className='card_container'>
              <div className='card_data_container'>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              </div>
              {card.image && (
                <img
                  src={`http://localhost:5000/uploads/${card.image}`}
                  alt={card.title}
                  className='card_img'
                />
              )}
              <div className='card_btns_container'>
              <button onClick={() => openModal(card)} className='card_btn'>Edit</button>
              <button onClick={() => handleDeleteCard(card._id)} className='card_btn'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Dashboard;
