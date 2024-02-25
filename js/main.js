'use strict';
const $photoUrl = document.querySelector('#photoUrl');
if (!$photoUrl) throw new Error('The $photoUrl query failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('The $image query failed');
const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query failed');
function forPhotoUrl(event) {
  const $eventTargetValue = event.target.value;
  $image.src = $eventTargetValue;
}
$photoUrl.addEventListener('input', forPhotoUrl);
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('The $ul query failed');
// function forFormSubmit(event: Event): void {
//   event.preventDefault();
//   const $formElements = $form.elements as FormElements;
//   const formObject = {
//     title: $formElements.title.value,
//     photoUrl: $formElements.photoUrl.value,
//     notes: $formElements.notes.value,
//   };
//   formObject.entryId = data.nextEntryId;
//   data.nextEntryId++;
//   data.entries.push(formObject);
//   $image?.setAttribute('src', 'images/placeholder-image-square.jpg');
//   $form.reset();
//   $ul?.prepend(renderEntry(formObject));
//   viewSwap('entries');
//   toggleNoEntries();
// }
function forFormSubmit(event) {
  event.preventDefault();
  const $formElements = $form.elements;
  const formObject = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
  };
  formObject.entryId = data.nextEntryId;
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.push(formObject);
    $ul?.prepend(renderEntry(formObject));
  } else {
    data.entries = data.entries.map((entry) => {
      if (entry.entryId === formObject.entryId) {
        return formObject;
      } else {
        return entry;
      }
    });
    //  const $listedItem = document.querySelector('li');
    //  if (!$listedItem) throw new Error ('The $listedItem query failed');
    for (const li of $li) {
      if (Number(li.getAttribute('data-entry-id')) === data.editing.entryId) {
        li.replaceWith(renderEntry(formObject));
      }
      const $heading2 = document.querySelector('.new-entry-header');
      if (!$heading2) throw new Error('The $heading2 query failed');
      $heading2.textContent = 'New Entry';
    }
    data.editing = null;
  }
  $image?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewSwap('entries');
  toggleNoEntries();
}
$form.addEventListener('submit', forFormSubmit);
function renderEntry(entry) {
  const $row = document.createElement('li');
  $row.setAttribute('class', 'row');
  $row.setAttribute('data-entry-id', entry.entryId);
  const $image = document.createElement('img');
  $image.setAttribute('class', 'column-full column-half');
  $image.setAttribute('src', entry.photoUrl);
  $row.append($image);
  const $p = document.createElement('p');
  $p.setAttribute('class', 'column-full column-half');
  const $b = document.createElement('b');
  $b.textContent = `${entry.title}`;
  $p.append($b);
  const $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pencil');
  $p.append($i);
  // const $br = document.createElement('br');
  // $b.append($br);
  const $em = document.createElement('em');
  $em.textContent = `${entry.notes}`;
  const $br = document.createElement('br');
  $em.prepend($br);
  $p.append($em);
  $row.append($p);
  return $row;
}
function forDomContentLoaded() {
  for (let i = 0; i < data.entries.length; i++) {
    const returnVal = renderEntry(data.entries[i]);
    $ul.append(returnVal);
  }
  const currentView = data.view;
  viewSwap(currentView);
  toggleNoEntries();
}
document.addEventListener('DOMContentLoaded', forDomContentLoaded);
const $li = document.querySelector('li');
if (!$li) throw new Error('This $li query selector failed');
function toggleNoEntries(entriesLength) {
  if (entriesLength === 0) {
    console.log('0 entries');
    $li.classList.remove('hidden');
  } else {
    console.log('some entries');
    $li.classList.add('hidden');
  }
}
const $entryForm = document.querySelector('#entryForm_');
if (!$entryForm) throw new Error('This $entryForm query failed');
const $entries = document.querySelector('#entries_');
if (!$entries) throw new Error('This $entries query failed');
function viewSwap(view) {
  if (view === 'entries') {
    $entries?.classList.remove('hidden');
    $entryForm?.classList.add('hidden');
  } else if (view === 'entry-form') {
    $entryForm?.classList.remove('hidden');
    $entries?.classList.add('hidden');
  }
  data.view = view;
}
const $entryLink = document.querySelector('.entriesLink');
if (!$entryLink) throw new Error('This $entryLink query failed');
const $buttonLink = document.querySelector('.buttonLink');
if (!$buttonLink) throw new Error('This $buttonLink query failed');
function forEntriesLink() {
  viewSwap('entries');
}
$entryLink.addEventListener('click', forEntriesLink);
// function forEntryForm(): void {
//   viewSwap('entry-form');
//   console.log('new clicked');
// }
function forEntryForm() {
  data.editing = null; // Clear the editing state
  // Explicitly reset form fields and header
  $formImage.setAttribute('src', 'images/placeholder-image-square.jpg'); // Adjust the src as necessary
  $entryTitle.value = '';
  $photoUrlInput.value = '';
  $notes.value = '';
  $newEntryHeader.textContent = 'New Entry';
  // Finally, switch to the entry form view
  viewSwap('entry-form');
  console.log('New entry form setup complete.');
}
$buttonLink.addEventListener('click', forEntryForm);
const $formImage = document.querySelector('.image');
const $entryTitle = document.getElementById('title');
const $notes = document.getElementById('notes');
const $newEntryHeader = document.querySelector('.new-entry-header');
const $photoUrlInput = document.getElementById('photoUrl');
function handleClick(event) {
  const $eventTarget = event.target;
  if ($eventTarget.tagName !== 'I') {
    return;
  }
  const $closestLi = $eventTarget.closest('[data-entry-id]');
  if (!$closestLi) {
    throw new Error('$closestLi is null');
  }
  const $dataEntryIdNum = Number($closestLi.dataset.entryId);
  console.log($dataEntryIdNum);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === $dataEntryIdNum) {
      data.editing = data.entries[i];
    }
  }
  if (data.editing) {
    if (!$formImage || !$entryTitle || !$notes || !$newEntryHeader) {
      throw new Error(
        '$formImage, $entryTitle, $notes, or $newEntryHeader is null'
      );
    }
    $formImage.setAttribute('src', data.editing.photoUrl);
    $entryTitle.value = data.editing.title;
    $photoUrlInput.value = data.editing.photoUrl;
    $notes.value = data.editing.notes;
    $newEntryHeader.textContent = 'Edit Entry';
    viewSwap('entry-form');
  }
}
$ul.addEventListener('click', handleClick);
