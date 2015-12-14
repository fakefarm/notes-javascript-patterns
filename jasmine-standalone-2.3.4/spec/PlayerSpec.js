
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
});



