/**
 * Создается экземпляр игрового поля.
 *
 * @constructor
 * 
 */
function GameField(canvas) {
    var types = {
            C: [],
            R: [],
            F: [],
            M: []
        },                                            //объект хранит все типы игры
        cardTable = {},                               //карточное поле
        directions = [[-1,0],[0,-1],[1,0],[0,1]],     //возможные направления обхода
        fieldContext = canvas.getContext('2d'),
        currentCard,
        copiedCanvas,
        currentScale,
        self = this;       
    
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
    
    canvas.onmousewheel = canvas.onwheel = resizeCanvas;
    
    function resizeCanvas(e) {
        console.log('robit');
        currentScale = currentScale || 1;
        var delta = e.wheelDelta ? e.wheelDelta/100 : e.detail ? -e.detail : 0;
        console.log(delta);
        if(!copiedCanvas)  { copiedCanvas = document.createElement('canvas');
            copiedCanvas.width = canvas.width;
            copiedCanvas.height = canvas.height;
            var imageData = fieldContext.getImageData(0, 0, canvas.width, canvas.height);
            copiedCanvas.getContext("2d").putImageData(imageData, 0, 0);
        }
        
        //canvas.style.zoom = canvas.style.zoom || 1;  
       // canvas.style.zoom = 1.1;
         
        fieldContext.save();
        currentScale += +(Math.pow(1.1,delta)-1).toFixed(1);
        console.log(resizeCanvas.scale);
        var newWidth = canvas.width * currentScale;
        var newHeight = canvas.height * currentScale;
        fieldContext.translate(-((newWidth-canvas.width)/2), -((newHeight-canvas.height)/2));
        fieldContext.scale(currentScale, currentScale);
        fieldContext.clearRect(0, 0, canvas.width, canvas.height);
        fieldContext.drawImage(copiedCanvas, 0, 0);
        fieldContext.restore();
        if(currentCard) self.drawRects(currentCard);
    }
    
    /*function redraw(scale) {
        
    }*/
    
    /**
    * Показывает доступные места для карточки.
    */ 
    this.drawRects = function(card) {
        currentCard = card;
        var curCardSize = 100*currentScale;
        for(var square in cardTable) {
            var ij = square.split('.');
            for(var dir in directions) {
                //console.log(+ij[0]+directions[dir][0]+'.'+(+ij[1]+directions[dir][1])); 
                if(cardTable[+ij[0]+directions[dir][0]+'.'+(+ij[1]+directions[dir][1])]) {
                    console.log('Not empty');
                    continue;
                }
                if(this.checkCard(card,+ij[0]+directions[dir][0],+ij[1]+directions[dir][1])){
                   // console.log('empty and checked');
                    fieldContext.beginPath();
                    fieldContext.rect(canvas.width/2 - curCardSize/2 + (+ij[0]+directions[dir][0])*curCardSize+1, 
                                            canvas.height/2 - curCardSize/2 + (+ij[1]+directions[dir][1])*curCardSize+1, 98*currentScale,98*currentScale);
                    fieldContext.fillStyle = '#ffcccc';
                    fieldContext.fill();
                    fieldContext.lineWidth = 1;
                    fieldContext.strokeStyle = '#aaaaaa';
                    fieldContext.stroke();
                }
            }
        }
    };
    
    /**
    * Очищает доступные места.
    */ 
    this.clearRects = function() {
        var curCardSize = 100*currentScale;
        for(var square in cardTable) {
            var ij = square.split('.');
            for(var dir in directions) {
                if(cardTable[+ij[0]+directions[dir][0]+'.'+(+ij[1]+directions[dir][1])]) {
                    //console.log('Not empty');
                    continue;
                }
                fieldContext.clearRect(canvas.width/2 - curCardSize/2 + (+ij[0]+directions[dir][0])*curCardSize, 
                                            canvas.height/2 - curCardSize/2 + (+ij[1]+directions[dir][1])*curCardSize, curCardSize, curCardSize);
            }
        }
    };
    
    /**
    * Проверяет, подходит ли карточка на поле в координаты i,j.
    */ 
    this.checkCard = function (card,i,j) {
        var newCard = [],
            checked;
        for(var rot = 0; rot < 4; rot++) {
            checked = 0;
            for(var dir in directions) {
                newCard[dir] = /*rot > 0 ? newCard[dir] :*/ cardTable[(i+directions[dir][0])+'.'+(j+directions[dir][1])];
               // if(!newCard[dir]) continue;
                //if(!newCard[dir]) console.log('cardTable['+(i+directions[dir][0])+'.'+(j+directions[dir][1])+'] empty square ok');
                /*else {
                   // console.log('cardTable['+(i+directions[dir][0])+'.'+(j+directions[dir][1])+']');
                    //console.log('%s  %s dir= %d dir2= %d',card.sides.names[(+dir+rot)%4],newCard[dir].sides.names[(+dir+2)%4],dir,((+dir+newCard[dir].rotate)%4 + 2)%4);
                    //console.log('side 1= %d  side 2= %d',(+dir+rot)%4,((+dir+newCard[dir].rotate)%4 + 2)%4);
                   // console.log('dir= %s rot= %s стороны равны= %s',dir,rot,(card.sides.names[(+dir+rot)%4] === newCard[dir].sides.names[((+dir+newCard[dir].rotate)%4 + 2)%4]));
                }*/
                if(!newCard[dir] || (card.sides.names[(+dir+rot)%4] === newCard[dir].sides.names[(4+(+dir+2)%4 - newCard[dir].rotate)%4])) checked++;
                else break;
               // console.log('checked=' +checked);
                if(checked == 4) return true;
            }
        }
        return false;
    };
    
    function showTable(){
        cityMonitor.innerHTML = types.C.length;
        fieldMonitor.innerHTML = types.F.length;
        roadMonitor.innerHTML = types.R.length;
        monkMonitor.innerHTML = types.M.length;
    }
    /**
    * Ставит карточки на поле координаты i,j с поворотом -rotate*PI/2 радиан.
    */ 
    this.setCard = function (card,i,j,rotate) {
        console.log("cart %d %d begin",i,j);
        fieldContext.save();
        fieldContext.translate(canvas.width/2+i*card.height, canvas.height/2+j*card.height);
        fieldContext.rotate(rotate*Math.PI/2);   
        fieldContext.drawImage(card.image,-card.height / 2,-card.height / 2,card.height,card.width); 
        fieldContext.restore();
        card.rotate = rotate;
        cardTable[i+'.'+j] = card;
        unionTypes(card,i,j);
        pushTypes(card);
        drawPoints(card,i,j,rotate);
        console.log("cart %d %d placed",i,j);
        console.dir(cardTable);
        console.dir(types);
        showTable();
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
    
    /**
    * Объединяет типы.
    */ 
    var unionTypes = function (card,i,j) {
        var actualType,
            thisObj,
            otherObj;
        for(var k = 0; k < 4; k++) {
            //console.log("k= %d",k);
            //console.log("newcard= %s",i+directions[k][0]+'.'+(j+directions[k][1]));
            var newCard = cardTable[i+directions[k][0]+'.'+(j+directions[k][1])];          
            if(newCard === undefined) continue;
            var otherSide = (k+2+card.rotate)%4;
            var thisSide = (4 - newCard.rotate)%4;
            for(var s = 0, l = card.sides.objs[thisSide].length; s < l; s++) {
                thisObj = card.objs[card.sides.objs[thisSide][s]-1];
                otherObj = newCard.objs[newCard.sides.objs[otherSide][l-s-1]-1];
                //console.log("s= %d",s);
                //console.log("thisside= %s , otherside= %s",thisSide,otherSide);
                //console.log("l1= %d  l2= %d  l-s-1= %d",card.sides.objs[thisSide].length,newCard.sides.objs[otherSide].length,l-s-1);
                //console.log("thisCard.rotate= %s  newCard.rotate= %s",card.rotate,newCard.rotate);
                actualType = thisObj.actualType;
                if(actualType !== undefined)  {
                    actualType.elems.push(otherObj.actualType.elems);
                    //delete otherObj.actualType;
                    otherObj.actualType = actualType;
                }
                else  {                    
                    otherObj.actualType.elems.push(thisObj);                   
                    thisObj.actualType = otherObj.actualType;
                    //console.log("создается тип= %s",i);
                }
            }
        }
    };
    
    /**
    * Заносит элементы карточки в массив типов.
    */ 
    var pushTypes = function (card) {
        //if(!card.actualTypes.length) card.actualTypes = [];
        for(var i in card.objs) {
            if(card.objs[i].actualType === undefined) {
                console.log("создается тип= %s",i);
                var newType = Type.factory(card.objs[i].type);
                newType.elems.push(card.objs[i]);
                types[card.objs[i].type.slice(0,1)].push(newType);
                card.objs[i].actualType = newType;
            }     
        }
    };  
}