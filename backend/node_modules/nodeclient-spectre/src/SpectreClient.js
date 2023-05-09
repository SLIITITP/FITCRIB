'use strict';

const request = require('request-promise-native');

module.exports = class SpectreClient {
  constructor(spectreURL) {
    this.spectreURL = spectreURL;
  }


  createTestrun(projectName, suiteName) {
    //format spectre_url to send post request to /runs
    let spectreUrlPost = this.spectreURL + '/runs';

    let formData = {
      project: projectName,
      suite: suiteName
    };

    return request({
      method: 'POST',
      uri: spectreUrlPost,
      formData: formData,
      json: true
    });
  }


  submitScreenshot(testName, browser, size, screenshot, runID, cropArea = '', sourceUrl = '', fuzzLevel = '', highlightColor = '') {

    //format spectre_url to send post request to /tests
    let spectreUrlPost = this.spectreURL + '/tests';

    const formData = {
      'test[run_id]': runID.toString(),
      'test[name]': testName,
      'test[browser]': browser,
      'test[size]': size.toString(),
      'test[crop_area]': cropArea,
      'test[source_url]': sourceUrl,
      'test[fuzz_level]': fuzzLevel,
      'test[highlight_color]': highlightColor,
      'test[screenshot]': {
        options: {
          filename: 'temp.png',
          contentType: 'image/png'
        },
        value: new Buffer(screenshot, 'base64')
      }
    };

    return request({
      method: 'POST',
      uri: spectreUrlPost,
      formData: formData,
      json: true
    });
  }
};
