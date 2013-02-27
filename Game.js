/**
 * Создается экземпляр игры.
 *
 * @constructor
 * 
 */
function Game() {
    var gameContext,
        fieldContext,
        gameField,
        cards = [],
        currentCard;
    
    var loadCards = function () {
        for(var i in config) {
            cards.push(config[i]);
            cards[i].image = new Image();
            cards[i].image.onload = function() {};
            cards[i].image.src = cards[i].url;
        }
    };
    
    var popCard = function(i) {
        i = i || Math.floor(Math.random()*cards.length);
        console.log(cards[i].url + "  " + (cards[i].num-1) + "  " + i)
        if(--cards[i].num === 0)  return cards.splice(i,1)[0];
        else return cards[i];
    };
    
    /**
    * Иницилизация игры.
    */    
    this.init = function() {
        gameContext = document.getElementById('canvas').getContext('2d');
        fieldContext = document.getElementById('field-canvas').getContext('2d');
        gameField = new GameField(fieldContext);
        loadCards();
    };
    
    /**
    * Запуск игры.
    */ 
    this.start = function() {
        var startCard = popCard(1);
        gameField.setCard(startCard,0,0,1);
        //fieldContext.drawImage(startCard.image,300,400,startCard.height,startCard.width);
    };
    
    /**
    * Достаем следующую карточку из колоды.
    */ 
    this.nextCard = function() {
        gameContext.drawImage(currentCard.image,1050,500,currentCard.height,currentCard.width);
    };
}
