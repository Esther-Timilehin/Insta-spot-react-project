import { useState } from 'react'
import './index.css'
import Header from "./Header.jsx"
import DisplayCards from './displayCards.jsx'
import NewPost from './newPost.jsx'
import cardData from "./cards";
import PreviewableCard from './PreviewableCard.jsx'

function App() {
  const [cards, setCards] = useState(cardData);
  const [showPostModal, setShowPostModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

 return (
  <div>
     <Header />
     <button
            type="button"
            className="post-btn btn-dark"
            id="post-btn"
            aria-label="Create new post"
            onClick={() => setShowPostModal(true)}
          >
            <img src="/assets/icons/plus.svg" alt="+" />
            New Post
          </button>

      {showPostModal && (
        <NewPost setPost={setShowPostModal} cards={cards} setCards={setCards} />
      )}

      <DisplayCards cards={cards} onImageClick={setSelectedCard} />
     {selectedCard && (
        <PreviewableCard card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
  </div>
 )
}

export default App
