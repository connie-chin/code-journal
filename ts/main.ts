/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
  entryId?: number;
}

interface Entry {
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
}
const $photoUrl = document.querySelector('#photoUrl');
if (!$photoUrl) throw new Error('The $photoUrl query failed');
const $image = document.querySelector('img');

const $form = document.querySelector('form');
if (!$form) throw new Error('This $form query failed');
function forPhotoUrl(event: Event): void {
  if (!$image) throw new Error('This $image query failed');
  const $eventTargetValue = event.target as HTMLInputElement;
  $image.src = $eventTargetValue.value;
}
$photoUrl.addEventListener('input', forPhotoUrl);
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('The $ul query failed');

function forFormSubmit(event: Event): void {
  event.preventDefault();
  const eventTarget = event.target as HTMLFormElement;
  const $formElements = eventTarget.elements as FormElements;
  const formObject: Entry = {
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
    data.editing = null; // why
  }
  if (!$image) throw new Error('The $image query failed');
  $image.src = './images/placeholder-image-square.jpg';
  if (!$form) throw new Error('The $form query failed');
  $form.reset();

  viewSwap('entries');
  toggleNoEntries();
}
$form.addEventListener('submit', forFormSubmit);

function renderEntry(entry: Entry): HTMLLIElement {
  // const $row = document.createElement('li');
  // $row.setAttribute('class', 'row');
  // $row.setAttribute('data-entry-id', entry.entryId);
  // const $image = document.createElement('img');
  // $image.setAttribute('class', 'column-full column-half');
  // $image.setAttribute('src', entry.photoUrl);
  // $row.append($image);

  // const $p = document.createElement('p');
  // $p.setAttribute('class', 'column-full column-half');

  // const $div1 = document.createElement('div');

  // const $b = document.createElement('b');
  // $b.textContent = `${entry.title}`;
  // $div1.append($b);
  // $p.append($div);

  // const $div2 = document.createElement('div');
  // const $i = document.createElement('i');
  // $i.setAttribute('class', 'fa-solid fa-pencil');
  // $div2.append($i);
  // $p.append($div2);
  // // const $br = document.createElement('br');
  // // $b.append($br);
  // const $div3 = document.createElement('div');
  // const $em = document.createElement('em');
  // $em.textContent = `${entry.notes}`;
  // $div3.append($em);
  // // const $br = document.createElement('br');
  // // $em.prepend($br);
  // $p.append($div3);
  // $row.append($p);
  // return $row;
  const $row = document.createElement('li');
  $row.setAttribute('class', 'row');
  $row.setAttribute('data-entry-id', entry.entryId.toString());
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
function forDomContentLoaded(): void {
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

function toggleNoEntries(): void {
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

function viewSwap(view: any): void {
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
// function forEntryForm(): void {
//   viewSwap('entry-form');
//   console.log('new clicked');
// }

function forEntryForm(): void {
  // data.editing = null; // Clear the editing state

  // Explicitly reset form fields and header
  // $formImage.setAttribute('src', 'images/placeholder-image-square.jpg'); // Adjust the src as necessary
  // $entryTitle.value = '';
  // $photoUrlInput.value = '';
  // $notes.value = '';
  // $newEntryHeader.textContent = 'New Entry';

  // Finally, switch to the entry form view
  viewSwap('entry-form');
  console.log('New entry form setup complete.');
}

$buttonLink.addEventListener('click', forEntryForm);

const $formImage = document.querySelector('.image');
const $entryTitle = document.getElementById('title') as HTMLFormElement;
const $notes = document.getElementById('notes') as HTMLFormElement;
const $newEntryHeader = document.querySelector('.new-entry-header');
const $photoUrlInput = document.getElementById('photoUrl') as HTMLFormElement;

function handleClick(event: Event): void {
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.tagName !== 'I') {
    return;
  }
  const $closestLi = $eventTarget.closest('[data-entry-id]') as HTMLLIElement;
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
