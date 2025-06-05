import React, { useState } from "react";

const DisplayCards = ({ cards, onImageClick }) => {

  // This is used to toggle the like icon
  const [likedCards, setLikedCards] = useState({});

  const toggleLike = (imgSrc) => {
    setLikedCards((prev) => ({
      ...prev,
      [imgSrc]: !prev[imgSrc],
    }));
  };

  return (
    <main className="main" role="main">
      <section className="container" aria-label="Photo gallery">
        {cards.map((card, index) => {
          const isLiked = likedCards[card.imgSrc];

          return(
          <article className="card" key={index} >
            <div className="card-img-container">
              <img
                src={card.imgSrc}
                alt={card.imgAlt}
                className="card-img"
                loading="lazy"
                onClick={() => onImageClick(card)} // Show preview
              />
            </div>
            <div className="card-description">
              <p className="card-title">{card.title}</p>
              <div className="like" onClick={() => toggleLike(card.imgSrc)} >
                <svg
                  className="like-icon"
                  role="button"
                  tabIndex="0"
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Like button"
                  style={{
                      stroke: isLiked ? "#e63946" : "#212121"}}
                >
                  <path
                    d="M15.9512 1.05664C17.3161 0.856584 18.8067 1.15981 20.1602 2.32812L20.4287 2.57324C22.6597 4.72264 22.3285 8.02556 20.5967 9.89355L20.4248 10.0693L11.5 18.6025L2.57422 10.0693H2.5752C0.754421 8.29659 0.296669 5.00618 2.36328 2.78516L2.57129 2.57324C3.99417 1.20243 5.593 0.843258 7.04883 1.05664C8.5402 1.27524 9.89546 2.09997 10.7266 3.11523L11.5 4.06055L12.2734 3.11523C13.1045 2.09997 14.4598 1.27524 15.9512 1.05664Z"
                    strokeWidth="2"
                
                  />
                </svg>
                
              </div>

            </div>
          </article>
          )
})}
      </section>
    </main>
  );
};

export default DisplayCards;
