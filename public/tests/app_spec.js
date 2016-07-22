describe("LearnJS", function(){
  it("can show a problem view", function(){
    learnjs.showView("#problem-1");
    expect($(".view-container .problem-view").length).toEqual(1);
  });

  it("shows the landing page when there is no hash", function() {
    learnjs.showView("");
    expect($(".view-container .landing-view").length).toEqual(1);
  });

  it("passes the has view parameter to the show view function", function() {
    spyOn(learnjs, "problemView");
    learnjs.showView("#problem-42");
    expect(learnjs.problemView).toHaveBeenCalledWith("42");
  });

  it("invokes the router when loaded", function() {
    spyOn(learnjs, "showView");
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it("subscribes to the hash change event", function() {
    learnjs.appOnReady();
    spyOn(learnjs, "showView");
    $(window).trigger("hashchange");
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  describe("problem view", function() {
    it("has a title that includes the problem number", function() {
      var view = learnjs.problemView("1");
      // expect(view.text()).toEqual("\nProblem #1\n" + "What is truth?\n" + "function problem() { return __; } \n");

      describe("answer section", function() {
        it("can check correct answer by clicking submit button", function () {
          view.find(".answer").val("true");
          view.find(".check-btn").click();
          expect(view.find(".result").text()).toEqual("Correct!");
          expect(view.find("a").text()).toEqual("Next Problem");
        });

        it("rejects and incorrect answer", function() {
          view.find(".answer").val("false");
          view.find(".check-btn").click();
          expect(view.find(".result").text()).toEqual("Incorrect!");
        });
      });
      
      view = learnjs.problemView("2");
      describe("final answer section", function() {
      	it("displays finished message when correct answer given", function() {
      	  view.find(".answer").val("7");
      	  view.find(".check-btn").click();
      	  expect(view.find(".result").text()).toEqual("Correct!");
      	  expect(view.find("a").text()).toEqual("Finished!");
      	});
      });
    });
  });
});
