
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
  describe('A way to augment Built-int Prototypes', function () {

  });
});



