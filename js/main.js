'use strict';
const $photoUrl = document.querySelector('#photoUrl');
if (!$photoUrl) throw new Error('The $photoUrl query failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('The $image query failed');
const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query failed');
function forPhotoUrl(event) {
  const $eventTarget = event.target.value;
  $image.src = $eventTarget;
}
$photoUrl.addEventListener('input', forPhotoUrl);
function forFormSubmit(event) {
  event.preventDefault();
  const $formElements = $form.elements;
  const formObject = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
  };
  // console.log('$formObject:', formObject);
  formObject['entryId'] = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(formObject);
  $image?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
$form.addEventListener('submit', forFormSubmit);
