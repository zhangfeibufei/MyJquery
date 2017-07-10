/**
 * Created by zr on 2017-07-10.
 */
describe("IIFE",function () {
    it("should print meeting message ",function () {
        (function(who,when){
            console.log("I met " + who +"on" + when);
        })("Joe Black",new Date());

    })
})