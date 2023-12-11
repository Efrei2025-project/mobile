import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MemoryGame = () => {
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const [gameStatus, setGameStatus] = useState('inProgress');
  const resetGame = () => {
    setCards(
      shuffleArray([
        { id: 1, image: require('./assets/card1.jpg'), isFlipped: false, isMatched: false },
        { id: 2, image: require('./assets/card1.jpg'), isFlipped: false, isMatched: false },
        { id: 3, image: require('./assets/card2.jpg'), isFlipped: false, isMatched: false },
        { id: 4, image: require('./assets/card2.jpg'), isFlipped: false, isMatched: false },
        { id: 5, image: require('./assets/card3.jpg'), isFlipped: false, isMatched: false },
        { id: 6, image: require('./assets/card3.jpg'), isFlipped: false, isMatched: false },
        { id: 7, image: require('./assets/card4.jpg'), isFlipped: false, isMatched: false },
        { id: 8, image: require('./assets/card4.jpg'), isFlipped: false, isMatched: false },
        { id: 9, image: require('./assets/card5.jpg'), isFlipped: false, isMatched: false },
        { id: 10, image: require('./assets/card5.jpg'), isFlipped: false, isMatched: false },
        { id: 11, image: require('./assets/card6.jpg'), isFlipped: false, isMatched: false },
        { id: 12, image: require('./assets/card6.jpg'), isFlipped: false, isMatched: false },
      ])
    );
    setGameStatus('inProgress');
  };

  const [cards, setCards] = useState(
    shuffleArray([
      { id: 1, image: require('./assets/card1.jpg'), isFlipped: false, isMatched: false },
      { id: 2, image: require('./assets/card1.jpg'), isFlipped: false, isMatched: false },
      { id: 3, image: require('./assets/card2.jpg'), isFlipped: false, isMatched: false },
      { id: 4, image: require('./assets/card2.jpg'), isFlipped: false, isMatched: false },
      { id: 5, image: require('./assets/card3.jpg'), isFlipped: false, isMatched: false },
      { id: 6, image: require('./assets/card3.jpg'), isFlipped: false, isMatched: false },
      { id: 7, image: require('./assets/card4.jpg'), isFlipped: false, isMatched: false },
      { id: 8, image: require('./assets/card4.jpg'), isFlipped: false, isMatched: false },
      { id: 9, image: require('./assets/card5.jpg'), isFlipped: false, isMatched: false },
      { id: 10, image: require('./assets/card5.jpg'), isFlipped: false, isMatched: false },
      { id: 11, image: require('./assets/card6.jpg'), isFlipped: false, isMatched: false },
      { id: 12, image: require('./assets/card6.jpg'), isFlipped: false, isMatched: false },
    ])
  );

  const [flippedCards, setFlippedCards] = useState([]);

  const flipCard = (cardId) => {
    if (flippedCards.length === 2) {
      return;
    }

    const selectedCard = cards.find((card) => card.id === cardId);

    if (selectedCard.isFlipped || selectedCard.isMatched) {
      return;
    }

    // Vérifier si deux cartes sont déjà retournées

    // Mettre à jour l'état de la carte retournée
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      })
    );

    // Ajouter la carte retournée aux cartes retournées du tour actuel
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, cardId]);
    
    if (flippedCards.length === 1) {
      const card1 = cards.find((card) => card.id === flippedCards[0]);
      const card2 = cards.find((card) => card.id === cardId);

      if (card1.image === card2.image) {
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.id === flippedCards[0] || card.id === cardId) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => flipCard(card.id)}
            style={styles.cardContainer}
          >
            {card.isFlipped ? (
              <Image source={card.image} style={styles.cardImage} />
            ) : (
              <Text style={styles.cardText}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Réinitialiser le jeu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    flexBasis: '20%',
    aspectRatio: 0.6,
    margin: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'blue',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  flippedCard: {
    backgroundColor: 'white',
  },
  resetButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MemoryGame;
