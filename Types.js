/*function Type() {
    this.elems = [];
    this.points = 0;
    this.closed = false; 
} 
Type.prototype.computePoints = function() { };
Type.prototype.isClosed = function() {};
Type.prototype.getLength = function() {};

function Church() {
    Type.apply(this,arguments);
};
Church.prototype = Object.create(Type.prototype);

function City() {
    Type.apply(this,arguments);
    this.shield;
};
City.prototype = Object.create(Type.prototype);

function Road() {
    Type.apply(this,arguments);
};
Road.prototype = Object.create(Type.prototype);

function Field() {
    Type.apply(this,arguments);
    this.numCities = 0;
};
Field.prototype = Object.create(Type.prototype);

var z = new Church();
var b = new Type();
z.isClosed(4);
alert(z.elems);
alert(b.elems);*/

function Type() {
    this.elems = [];
    this.points = 0;
    this.closed = false; 
} 
Type.prototype.computePoints = function() {};
Type.prototype.isClosed = function() {};         //проверка на закрытость
Type.prototype.getLength = function() {};

Type.factory = function(type) {
    var str = type.slice(0,1),
        newType;
    if (typeof Type[str] !== "function") {
        throw {
        name: "Error",
        message: str + " doesn’t exist"
        };
    }
   /* if (typeof Type[type].prototype.getLength !== "function") {
        Type[type].prototype = Object.create(Type.prototype);
    }*/
    newType = new Type[str]();
    if(type === 'C+') newType.shield = true; 
    return newType;
};
Type.C = function() {
    Type.apply(this,arguments);
    this.shield = false;
};
Type.C.prototype = Object.create(Type.prototype);
Type.F = function() {
    Type.apply(this,arguments);
    this.numCities = 0;
};
Type.F.prototype = Object.create(Type.prototype);
Type.R = function() {
    Type.apply(this,arguments);    
};
Type.R.prototype = Object.create(Type.prototype);
Type.M = function() {
    Type.apply(this,arguments);
};
Type.M.prototype = Object.create(Type.prototype);


/*var z = Type.factory('F');
var b = Type.factory('C');
z.points = 4;
b.elems.push(1);
alert(z.elems);
alert(b.elems);
alert(z.points);
alert(b.points);
alert(z.shield);
alert(b.shield);
alert(z.numCities);
alert(b.numCities);*/