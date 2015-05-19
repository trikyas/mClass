/*
How to use newClass
 */

var Animal = newClass(function() {
	// Private
	var info = "Carl Linnaeus is known as the father of modern taxonomy.";

	return {
		// Constructor
		construct: function(specie) {
			this.specie = specie;
		},
		// Public methods and members
		public: {
			sound: function() {
				return undefined;
			},
			toString: function() {
				return "I'm a " + this.specie + " with " + this.legs + " legs saying " + this.sound();
			}
		},
		// Static methods and members
		static : {
			info: function() {
				return info;
			}
		}
	};
});

var snake = new Animal("snake");

test( "instanceof", function() {
	ok( snake instanceof Animal );
});

test( "constructor", function() {
	ok( snake.constructor === Animal );
});



// A class without private methods or members is much easier
var Bird = newClass({
	// inherit from another class
	extends: Animal,
	// Override public method and member
	public: {
		sound: function() {
			return "tweet";
		},
		legs: 2
	}
});

var dove = new Bird("dove");

test( "instanceof", function() {
	ok( dove instanceof Animal );
});

test( "instanceof parent", function() {
	ok( dove instanceof Bird );
});

test( "overridden method", function() {
	ok( dove.sound() == "tweet" );
});

test( "overridden member", function() {
	ok( dove.legs == 2 );
});

test( "inherited method toString", function() {
	ok( ''+dove == "I'm a dove with 2 legs saying tweet" );
});

// If you don't like new, you can use Object.create()
var sparrow = Object.create( Bird.prototype, {specie: {value: "sparrow"}} );
test( "Object.create()", function() {
	ok( ''+sparrow == "I'm a sparrow with 2 legs saying tweet" );
});

// A class with private methods and members is a little bit more work
var Fish = newClass(function() {
	function calculateLegs() {
		return 0;
	}
	var sound = "blub";

	return {
		extends: Animal,
		public: {
			sound: function() {
				return sound;
			},
			// Call a parent method with the _super member (both this._super and Fish._super are possible)
			toString: function() {
				return this._super.toString.call(this)+" and I can swim";
			},
			legs: calculateLegs()
		}
	};
});

// Test inherited static function
test( "inherited static function", function() {
	ok( Fish.info() == "Carl Linnaeus is known as the father of modern taxonomy.");
});

var minnow = new Fish("minnow");

test( "inherited function using private function", function() {
	ok( minnow.sound() == "blub" );
});

test( "toString with super", function() {
	ok( ''+minnow == "I'm a minnow with 0 legs saying blub and I can swim" );
});
