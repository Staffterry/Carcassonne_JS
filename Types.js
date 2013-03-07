function Type() {
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

/*var z = new Church();
var b = new Type();
z.isClosed(4);
alert(z.elems);
alert(b.elems);*/