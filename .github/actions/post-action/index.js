const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const { 
    pull_request: {
      merged,
      body
    }
  } = github.context.payload;

  if ( !merged ) {
    console.log( 'PR was not merged' );
    return;
  }

  fetch(body, { method: 'POST', body: 'hello world' })
    .then(res => res.text()) // expecting a text response
    .then(text => console.log(`Postman resp: ${text}`));

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
