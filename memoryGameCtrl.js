app.controller("memoryGameCtrl", function($scope, $timeout) {
    $scope.cards = [
        new Card("Warrior of Light", "wol", 0), 
        new Card("Garland", "garland", 1), 
        new Card("Emperor", "emperor", 2), 
        new Card("Golbez", "golbez", 3), 
        new Card("Gilgamesh", "gilgamesh", 4), 
        new Card("Kefka", "kefka", 5), 
        new Card("Lightning", "lightning", 6), 
        new Card("Gabranth", "gabranth", 7)
    ];
    
    $scope.cardBoard = [];

    $scope.discardCards = [];

    $scope.drawnCard = null;
    $scope.drawnCardIndex = null;

    $scope.animation = false;

    $scope.pairFound = 0;


    $scope.generateBoard = function() {
        $scope.cardBoard = [];
        for (let i = 0; i < 16; ++i) {
            $scope.cardBoard.push(angular.copy($scope.cards[i % 8]));
        }
        shuffle($scope.cardBoard);
        console.log($scope.cardBoard);
    };
    
    $scope.startNewGame = function() {
        $scope.generateBoard();
        $scope.discardCards = [];
        $scope.pairFound = 0;
    };
    
    $scope.cardClick = function(card, cardIndex) {
        if ($scope.animation) {
            return;
        }

        if (!$scope.drawnCard) {
            console.log("card " + card + " index " + cardIndex);
            $scope.drawnCard = card;
            $scope.drawnCardIndex = cardIndex;
            card.currentFaceUrl = cardsUrl[card.id];
        } else if (cardIndex === $scope.drawnCardIndex) {
            alert("Pick another card plz"); // Double click on a card
        } else if (card.id === $scope.drawnCard.id) {
            console.log("cartes egales" + card + " index " + cardIndex);

            card.currentFaceUrl = cardsUrl[card.id];

            $scope.animation = true;
            $timeout(
            function() {
                $scope.discardCard(card, $scope.drawnCard);
                $scope.drawnCard = null;
                $scope.drawnCardIndex = -1;
                $scope.animation = false;
            }, 1500);

            ++$scope.pairFound;

        } else {
            console.log("cartes pas egales. Current card: " + card.id + ". Previous card: " + $scope.drawnCard.id +  " index " + cardIndex);
            card.currentFaceUrl = cardsUrl[card.id];
            
            $scope.animation = true;
            $timeout(
            function() {
                $scope.revertCard(card, $scope.drawnCard);
                $scope.drawnCard = null;
                $scope.drawnCardIndex = -1;
                $scope.animation = false;
            }, 1500);

        }

    };

    $scope.getCardUrl = function(card) {
        return cardsUrl[card.id];
    };

    $scope.discardCard = function(cardA, cardB) {
        console.log("défaussage de la carte " + cardA.id);

        cardA.hidden = true;
        cardB.hidden = true;

        $scope.discardCards.push(cardA);
    };

    $scope.revertCard = function(cardA, cardB) {
        console.log("revert de la carte " + cardA.id);

        cardA.currentFaceUrl = cardsUrl['back'];
        cardB.currentFaceUrl = cardsUrl['back'];
    };

    $scope.generateBoard();
});

const cardsUrl = {
    'back' : 'assets/card_back.png',
    'wol' : 'assets/card_wol.png',
    'garland' : 'assets/card_garland.png',
    'emperor' : 'assets/card_emperor.png',
    'golbez' : 'assets/card_golbez.png',
    'gilgamesh' : 'assets/card_gilgamesh.png',
    'kefka' : 'assets/card_kefka.png',
    'lightning' : 'assets/card_lightning.png',
    'gabranth' : 'assets/card_gabranth.png'
};

class Card {
    constructor(name, id, number) {
        this.name = name;
        this.id = id;
        this.number = number;
        this.hidden = false;
        this.currentFaceUrl = 'assets/card_back.png';
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}