/**
 * Создается экземпляр игрового поля.
 *
 * @constructor
 * 
 */
function GameField(context) {
    var types = {
        cities: [],
        roads: [],
        fields: [],
        churches: []
    },
        cardTable = {},
        fieldContext = context;
    
    this.checkCard = function (card,i,j) {
        
    };
    

    this.setCard = function (card,i,j,rotate) {
        fieldContext.drawImage(card.image,300+i*card.height,300+i*card.height,card.height,card.width);
    };
    
    var drawPoints = function (card) {
        
    };
    
    var unionTypes = function (card,i,j) {
        
    };
    
    var pushTypes = function (card) {
        
    };
    
    /**
    * Иницилизация игры.
    */    
}