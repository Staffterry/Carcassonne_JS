/**
 * Создается экземпляр игры.
 *
 * @constructor
 * 
 */
function Game() {
    var fieldCanvas,
        gameContext,
        gameField,
        cards = [],
        currentCard,
        lostCards,
        deck;
    
    /**
    * Загрузка карточек
    */
    var loadCards = function () {
        //console.time("1");
        for(var i in config) {
            var num = config[i].num;
            var image = new Image();
            image.onload = function() {};
            image.src = config[i].url;
            
            while(num > 0) {
                var newcard = JSON.parse(JSON.stringify(config[i]));
                newcard.image = image;
                cards.push(newcard);
                num--;                
            }
            //cards.push(config[i]);
            //cards[i].image = new Image();
            //cards[i].image.onload = function() {};
            //cards[i].image.src = cards[i].url;                  
        }
        console.log('Cards length= '+cards.length);
        deck = new Image();
        deck.onload = function() {
            gameContext.drawImage(deck,1050,75,deck.height,deck.width);
            printText(lostCards); 
        }
        deck.src = "backside.jpg"; 
        //console.timeEnd("1");
    };
    
    /**
    * Достаем карточку из массива
    */
    var popCard = function(i) {
        if (cards.length ===0) alert("empty");
        i = i !== undefined ? i : Math.floor(Math.random()*cards.length);
        //console.log(cards[i].url + "  " + (cards[i].num-1) + "  " + i)
        /*if(--cards[i].num === 0)*/  return cards.splice(i,1)[0];
        //else return cards[i];
    };
    
    /**
    * Загрузка представления
    */
    var loadView = function() {
           
    }
    
    /**
    * Выводим количество оставшихся карточек
    */
    var printText = function(text) {
        gameContext.clearRect(1050,180,100,100);
        gameContext.font = "40pt Calibri";
        gameContext.fillStyle = "#5EC3CE";
        gameContext.fillText(text,1070,240);
    }
    
    /**
    * Иницилизация игры.
    */    
    this.init = function() {
        fieldCanvas = document.getElementById('field-canvas');
        gameContext = document.getElementById('canvas').getContext('2d');
        //fieldContext = document.getElementById('field-canvas').getContext('2d');
        gameField = new GameField(fieldCanvas);      
        loadCards();
        lostCards = cards.length;
        printText(lostCards);
        //loadView();
    };
    
    /**
    * Запуск игры.
    */ 
    this.start = function() {
        var startCard = popCard(0);
        gameField.setCard(startCard,0,0,0);
        printText(--lostCards);
        startCard = popCard(0);
        gameField.setCard(startCard,1,0,2);
        printText(--lostCards);
        startCard = popCard(54);
        gameField.setCard(startCard,1,2,1);
        printText(--lostCards);
        startCard = popCard(23);
        gameField.setCard(startCard,0,2,3);
        printText(--lostCards);
       // gameField.setCard(startCard,0,-1,2);
        //gameField.setCard(startCard,2,0,0);
        //fieldContext.drawImage(startCard.image,300,400,startCard.height,startCard.width);
    };
    
    /**
    * Достаем следующую карточку из колоды.
    */ 
    this.nextCard = function() {
        if(lostCards > 0) {
            gameField.clearRects();
            currentCard = popCard();
            gameContext.drawImage(currentCard.image,1050,500,currentCard.height,currentCard.width);
            printText(--lostCards);
            gameField.drawRects(currentCard);
        }
       /* else {
            for(var i in cards) {
                if(cards[i].num > 0) alert("пиздеж");
            }
            alert("okay");
        }*/
    };
}
