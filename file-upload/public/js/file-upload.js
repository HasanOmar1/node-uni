'use strict';

async function uploadFile(e) {
  e.preventDefault();

  let formData = new FormData(document.querySelector('#form1'));

  let answer = await fetch('/upload-file', {
    method: 'POST',

    body: formData,
  });
  console.log(answer);
  answer = await answer.json();
  document.querySelector('.message').textContent = answer.message;
}

async function uploadFiles(e) {
  e.preventDefault();

  let formData = new FormData(document.querySelector('#form2'));

  let answer = await fetch('/upload-files', {
    method: 'POST',

    body: formData,
  });
  console.log(answer);
  answer = await answer.json();
  document.querySelector('.message').textContent = answer.message;
}
