/* exported data */
interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const previousDataJSON = localStorage.getItem('javascript-local-storage');

function forBeforeUnload(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

window.addEventListener('beforeunload', forBeforeUnload);

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
