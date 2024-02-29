'use strict';
const $photoUrl = document.querySelector('#photoUrl');
if (!$photoUrl) throw new Error('The $photoUrl query failed');
const $image = document.querySelector('img');
const $form = document.querySelector('form');
if (!$form) throw new Error('This $form query failed');
function forPhotoUrl(event) {
  if (!$image) throw new Error('This $image query failed');
  const $eventTargetValue = event.target;
  $image.src = $eventTargetValue.value;
}
$photoUrl.addEventListener('input', forPhotoUrl);
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('The $ul query failed');
function forFormSubmit(event) {
  event.preventDefault();
  const eventTarget = event.target;
  const $formElements = eventTarget.elements;
  const formObject = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(formObject);
    $ul?.prepend(renderEntry(formObject));
  } else {
    formObject.entryId = data.editing.entryId;
    data.entries = data.entries.map((entry) => {
      if (entry.entryId === formObject.entryId) {
        return formObject;
      } else {
        return entry;
      }
    });
    const $listedItem = document.querySelectorAll('li');
    if (!$listedItem) throw new Error('The $listedItem query failed');
    for (const li of $listedItem) {
      if (Number(li.getAttribute('data-entry-id')) === data.editing.entryId) {
        li.replaceWith(renderEntry(formObject));
      }
      const $heading1 = document.querySelector('.new-entry-header');
      if (!$heading1) throw new Error('This $heading2 query failed');
      $heading1.textContent = 'New Entry';
    }
    data.editing = null;
  }
  if (!$image) throw new Error('The $image query failed');
  $image.src = './images/placeholder-image-square.jpg';
  if (!$form) throw new Error('The $form query failed');
  $form.reset();
  viewSwap('entries');
  toggleNoEntries();
}
$form.addEventListener('submit', forFormSubmit);
function renderEntry(entry) {
  const $row = document.createElement('li');
  $row.setAttribute('class', 'row');
  $row.setAttribute('data-entry-id', entry.entryId.toString());
  const $image = document.createElement('img');
  $image.setAttribute('class', 'column-full column-half');
  $image.setAttribute('src', entry.photoUrl);
  $row.append($image);
  const $div = document.createElement('div');
  $div.setAttribute('class', 'column-full column-half');
  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'pencilSpace');
  const $b = document.createElement('b');
  $b.textContent = `${entry.title}`;
  $div2.append($b);
  const $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pencil');
  $div2.append($i);
  $div.append($div2);
  const $em = document.createElement('em');
  $em.textContent = `${entry.notes}`;
  $div.append($em);
  $row.append($div);
  return $row;
}
function forDomContentLoaded() {
  for (let i = 0; i < data.entries.length; i++) {
    const returnVal = renderEntry(data.entries[i]);
    $ul?.append(returnVal);
  }
  const currentView = data.view;
  viewSwap(currentView);
  toggleNoEntries();
}
document.addEventListener('DOMContentLoaded', forDomContentLoaded);
const $noEntries = document.querySelector('#no-entries');
function toggleNoEntries() {
  if (!$noEntries) throw new Error('This $noEntries query selector failed');
  if (data.entries.length === 0) {
    console.log('0 entries');
    $noEntries.classList.remove('no-entries');
  } else {
    console.log('some entries');
    $noEntries.classList.add('no-entries');
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
function forEntryForm() {
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
