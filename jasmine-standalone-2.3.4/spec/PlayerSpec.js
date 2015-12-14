var windowVar = this;
describe("Chapter 1", function() {
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
