
var windowVar = this;

describe("Chapter 1", function() {
  describe('On global values', function() {
    describe("pg. 10 - minimizing globals", function() {
      it("'this' is a global that is the same as window", function() {
        expect(windowVar).toBe(window);
      });
      it("variables without a var will be global", function() {
        myglobal = 'hello'; // noted as an antipattern
        expect(myglobal).toBe(window.myglobal);
      });
    });

    describe("pg. 11 - the problem with globals", function() {
      it("they are easy to create", function() {
        function sum(x, y) {
          result = x + y;
          return result;
        }
        var two = sum(1,1);
        expect(window.result).toBe(two);
      });

      it("but you can prevent global variables by using var", function() {
        function sum(x, y) {
          var localVar = x + y;
          return localVar;
        }
        var three = sum(2,1);
        expect(window.localVar).not.toBe(three);
      });
    });
  });

  describe('assign DOM references to local variables', function() {

    var $div  = '',
        el    = '',
        style = '';

    afterEach(function() {
       $div.remove();
    });

    it('helps setup local environment to work with.', function() {

      $div = $("<div id='result'>hello world</div>").
                attr({id: 'result'}).
                css({color: 'red'}).
                appendTo('body');

      function updateElement() {
        el = document.getElementById("result");
        style = el.style.color;
      }

      updateElement();
      expect(style).toBe('red');
    });
  });

  describe('for loops', function() {
    it('work in sub-optimal ways', function() {
        var myarray = ['code', 'ruby', 'rails'],
            count = 0;

        for (var i = 0, max = myarray.length; i < max; i++) {
          count += i;
        }
        expect(count).toBe(3);
    });
    it('consider moving variables to the top of the loop', function() {
        var count = 3;
        function looper() {
          var i = 0,
              max,
              secondArray = ['js', 'coffee', 'jasmine'];

          for (i = 0, max = secondArray.length; i < max; i++) {
            count -= 1;
          }
        }
        looper();
        expect(count).toBe(0);
    });

    it('two performance optimizations are to remove the max and try a while loop', function() {
      var i, myarray = ['a', 'b'], count = 0;
      for(i = myarray.length; i--;) {
        count += 1;
      }
      expect(count).toBe(2);
    });
  });
  describe('for-in loops', function() {
    describe('should be used to iterate over nonarray objects even though technically you can use them with an array - it is not recommended', function() {

      it('The prototype chain is live which means all objects automatically get access to the new method.', function() {
          var count = 0,
            man = {
              hands: 2,
              legs: 2,
              heads: 1
            };
        if (typeof Object.prototype.clone === 'undefined') {
          Object.prototype.clone = function() {};
        }
        for(var i in man) {
            count += 1;
        }
        expect(count).toBe(4);
      });

      it('Use hasOwnProperty() to filter out prototype properties', function() {

        var count = 0,
            man = {
              hands: 2,
              legs: 2,
              heads: 1
            };
        if (typeof Object.prototype.clone === 'undefined') {
          Object.prototype.clone = function() {};
        }
        for(var i in man) {
          if (man.hasOwnProperty(i)) {
            count += 1;
          }
        }
        expect(count).toBe(3);
      });
      it('You can use call() on hasOwnProperty() to filter out specific properties', function() {
        var count = 0,
          man = {
            hands: 2,
            legs: 2,
            heads: 1
          };
        for(var i in man) {
          if (Object.prototype.hasOwnProperty.call(man, i)){
            count +=1;
          }
        }
        expect(count).toBe(3);
      });
    });
  });
  describe('A way to augment Built-in Prototypes', function () {
    it('is to wrap them in a conditional typeof check', function() {

      var myObject = {};

      if(typeof Object.prototype.myMethod !== 'function') {
        Object.prototype.myMethod = function () {
          return 5;
        };
      }

      expect(myObject.myMethod()).toBe(5);
    });
  });
  describe('Switch Pattern', function() {
    it('is easier to read if you align the case and switch keywords', function() {
      var inspect_me = 0,
          result = '';

      // align each case with switch (an exception to the curly braces indention rule)
      switch (inspect_me) {
      case 0:
        result = "zero";
        break;
      case 1:
        result = "one";
        break;
      default:
        result = "unknown";
      }

      expect(result).toBe('zero');
    });
    it('make sure to add a default: ', function() {
      var fruit = 'apple',
          color = '';

      switch(fruit) {
      case 'pear':
        color = 'green';
        break;
      case 'orange':
        color = 'orange';
        break;
      default:
        color = 'red';
      }

      expect(color).toBe('red');

    });
  });

  describe('Avoiding implied typecasting', function() {
    it('can prevent from mismatched equality', function (){
      var zero = 0;
      if (zero === false) {
        zero = 'zero';
      }
      expect(zero).toBe(0);

      var zero = 0;
      if (zero == false) {
        zero = 'zero';
      }
      expect(zero).toBe('zero');
    });

    it('threeequel "===" flushes out true type', function() {
      var zero = 0,
          bool,
          one = '1';

      bool = (zero == true);
      expect(bool).toBe(false);

      bool = (one == true);
      expect(bool).toBe(true);

      bool = (zero === true);
      expect(bool).toBe(false);


      bool = (one === true);
      expect(bool).toBe(false);

    });
  });

  describe('eval() is evil', function() {
    it('should not be used because there are better ways to solve the issue', function() {
      var property =  'name',
               obj = {},
               ans = '';

      ans = eval("obj." + property);
      expect(ans).toBe(undefined);
    });
    it('eval pollutes the global namespace', function() {
      var one,
          jsstring = 'var one = 1';
          eval(jsstring);
      expect(one).toBe(1);
    });
    it('eval can access stuff in the outer scope', function() {
      var result = (function() {
        var local = 1;
        return eval('local = 3;');
      }());
      expect(result).toBe(3);
    });
  });
  describe('number conversions with parseInt()', function () {
    it('Using parseInt() you can get a numeric value from a string', function() {
      var month = '06',
          year  = '09';
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      expect(month + year).toBe(15);
    });
  });
});




