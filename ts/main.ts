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
}

$form.addEventListener('submit', forFormSubmit);

function renderEntry(entry): HTMLUListElement {
  console.log('entry:', entry);
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
  const $em = document.createElement('em');
  $em.textContent = `${entry.notes}`;
  $p.append($em);
  $row.append($p);
  return $row;
}

console.log(renderEntry(data.entries[0]));
