'use strict';
/* exported data */
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const previousDataJSON = localStorage.getItem('javascript-local-storage');
function forBeforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
window.addEventListener('beforeunload', forBeforeUnload);
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
