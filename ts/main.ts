/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
  entryId?: number;
}

const $photoUrl = document.querySelector('#photoUrl');
if (!$photoUrl) throw new Error('The $photoUrl query failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('The $image query failed');
const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query failed');

function forPhotoUrl(event: Event): void {
  const $eventTarget = event.target.value;
  $image.src = $eventTarget;
}

$photoUrl.addEventListener('input', forPhotoUrl);

const $ul = document.querySelector('ul');
if (!$ul) throw new Error('The $ul query failed');

function forFormSubmit(event: Event): void {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const formObject = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
  };
  formObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(formObject);
  $image?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $ul?.prepend(renderEntry(formObject));
  viewSwap('entries');
  toggleNoEntries();
}

$form.addEventListener('submit', forFormSubmit);

function renderEntry(entry): HTMLUListElement {
  const $row = document.createElement('li');
  $row.setAttribute('class', 'row');

  const $image = document.createElement('img');
  $image.setAttribute('class', 'column-full column-half');
  $image.setAttribute('src', entry.photoUrl);
  $row.append($image);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'column-full column-half');
  const $b = document.createElement('b');
  $b.textContent = `${entry.title}`;
  $p.append($b);
  const $br = document.createElement('br');
  $b.append($br);
  const $em = document.createElement('em');
  $em.textContent = `${entry.notes}`;
  $p.append($em);
  $row.append($p);
  return $row;
}

function forDomContentLoaded(): void {
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

function toggleNoEntries(entriesLength): void {
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

function viewSwap(view): void {
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

function forEntriesLink(): void {
  viewSwap('entries');
}

$entryLink.addEventListener('click', forEntriesLink);

function forEntryForm(): void {
  viewSwap('entry-form');
  console.log('new clicked');
}
$buttonLink.addEventListener('click', forEntryForm);
