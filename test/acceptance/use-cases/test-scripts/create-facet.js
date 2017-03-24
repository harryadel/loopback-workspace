'use strict';

module.exports = function() {
  const testName = 'CreateFacet';
  let templateName, facetName;

  this.When(/^I create a facet '(.+)' in workspace '(.+)'$/,
  function(facet, workspaceName, next) {
    facetName = facet;
    templateName = workspaceName;
    const config = {
      name: facetName,
      modelsMetadata: this.getDefaultModelsMeta(),
    };
    const Facet = this.getApp().models.Facet;
    this.createModel(Facet, config, templateName, testName, next);
  });

  this.Then(/^the facet is created$/, function(next) {
    const testsuite = this;
    const inputs = this.getSavedInputs(testName);
    const facet = this.getWorkspace(templateName).facet(facetName);
    this.expect(facet).to.not.to.be.undefined();
    const dir = facet.getPath();
    this.checkFileExists(dir, function(isExists) {
      testsuite.expect(isExists).to.be.true();
      next();
    });
  });
};
