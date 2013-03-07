/**
 * Создается экземпляр игрового поля.
 *
 * @constructor
 * 
 */
function GameField(canvas) {
    var types = {
        cities: [],
        roads: [],
        fields: [],
        churches: []
    },
        cardTable = {},
       // availablePlaces = 
        directions = [[-1,0],[0,-1],[1,0],[0,1]],
        fieldContext = canvas.getContext('2d');
    
    /**
    * драг ын дроп игрового поля.
    */ 
    canvas.onmousedown = function(e) {
        var mouseCoords = {
            x: e.clientX,
            y: e.clientY
        };
        var oldLeft = parseInt(getComputedStyle(canvas).left) || 0;
        var oldTop = parseInt(getComputedStyle(canvas).top) || 0;
        //alert(mouseCoords.x +"  "+ mouseCoords.y);
        canvas.onmousemove = function(event) {
            //console.log("%d vs %d",canvas.style.left,canvas.style.top);
            canvas.style.left = oldLeft+event.clientX-mouseCoords.x+'px';
            canvas.style.top = oldTop+event.clientY-mouseCoords.y+'px';
            //canvas.(event.clientX-mouseCoords.x,event.clientY-mouseCoords.y);
            //console.log("%d  %d",event.clientX-mouseCoords.x,event.clientY-mouseCoords.y);
            return false;
        };
        document.onmouseup = function() {
            canvas.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };
    
    this.drawRects = function(card) {
        for(var square in cardTable) {
            var ij = square.split('.');
            for(var dir in directions) {
                console.log(+ij[0]+directions[dir][0]+'.'+(+ij[1]+directions[dir][1])); 
                if(cardTable[+ij[0]+directions[dir][0]+'.'+(+ij[1]+directions[dir][1])]) {
                    console.log('Not empty');
                    continue;
                }
                if(this.checkCard(card,+ij[0]+directions[dir][0],+ij[1]+directions[dir][1])){
                    console.log('empty and checked');
                    fieldContext.beginPath();
                    fieldContext.rect(canvas.width/2 - card.width/2 + (+ij[0]+directions[dir][0])*card.width, 
                                            canvas.height/2 - card.height/2 + (+ij[1]+directions[dir][1])*card.height, 100, 100);
                    fieldContext.fillStyle = '#ffaaaa';
                    fieldContext.fill();
                    fieldContext.lineWidth = 1;
                    fieldContext.strokeStyle = 'black';
                    fieldContext.stroke();
                }
            }
        }
    }
    
    /**
    * Проверяет, подходит ли карточка на поле в координаты i,j.
    */ 
    this.checkCard = function (card,i,j) {
        var newCard = [],
            checked;
        for(var rot = 0; rot < 4; rot++) {
            checked = 0;
            for(var dir in directions) {
                newCard[dir] = rot > 0 ? newCard[dir] : cardTable[(i+directions[dir][0])+'.'+(j+directions[dir][1])];//cardTable[i+directions[dir][1]][j+directions[dir][2]];
               // if(!newCard[dir]) continue;
                if(!newCard[dir] || (card.sides.names[(dir+rot)%4] === newCard[dir].sides.names[(dir+2)%4])) checked++;
                else break;
                console.log('checked=' +checked);
                if(checked == 4) return true;
            }
        }
        return false;
    };
    
    /**
    * Ставит карточки на поле координаты i,j с поворотом -rotate*PI/2 радиан.
    */ 
    this.setCard = function (card,i,j,rotate) {
        console.log(this.checkCard(card,i,j));
        fieldContext.save();
        fieldContext.translate(canvas.width/2+i*card.height, canvas.height/2+j*card.height);
        fieldContext.rotate(rotate*Math.PI/2);   
        fieldContext.drawImage(card.image,-card.height / 2,-card.height / 2,card.height,card.width); 
        fieldContext.restore();
        drawPoints(card,i,j,rotate);
        //cardTable[i] = cardTable[i] || {};
        //cardTable[i][j] = card;
        cardTable[i+'.'+j] = card;
        console.dir(cardTable);
    };
    
    /**
    * Отрисовывает точки на карточке.
    */ 
    var drawPoints = function (card,i,j,rotate) {
        for(var obj in card.objs) {
            var half = card.height/2;
            var newX = canvas.width/2+half*2*i+(card.objs[obj].point.x-half)*Math.cos(-rotate*Math.PI/2)+(card.objs[obj].point.y-half)*Math.sin(-rotate*Math.PI/2);
            var newY = canvas.height/2+half*2*j+(card.objs[obj].point.y-half)*Math.cos(-rotate*Math.PI/2)-(card.objs[obj].point.x-half)*Math.sin(-rotate*Math.PI/2);
            //console.log("%d  %d",newX,newY);
            fieldContext.beginPath();
            fieldContext.arc(newX,newY, 4, 0, 2 * Math.PI, false);
            fieldContext.fillStyle = '#000000';
            fieldContext.fill();
            fieldContext.lineWidth = 2;
            fieldContext.strokeStyle = '#ffff00';
            fieldContext.stroke();
        }
    };
    
    var unionTypes = function (card,i,j) {
        
    };
    
    /**
    * Заносит элементы карточки в массив типов.
    */ 
    var pushTypes = function (card) {
        
    };
    
    /**
    * Иницилизация игры.
    */    
}