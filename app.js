
//***NOTE FOR MENTOR***
//couldn't get this to work so had to model solution by provided answer
//event using the provided solution doesn't work
//will circle back to this later because it's getting unproductive now

//add items by submtting form

// Single state object
var state = {
  items: []
};


var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);



// State modification functions
function addItem(state, item) {
  state.items.push({
    displayName: item,
    checkedOff: false
  });
}

function getItem(state, itemIndex) {
  return state.items[itemIndex];
}

function deleteItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
}

function updateItem(state, itemIndex, newItemState) {
  state.items[itemIndex] = newItemState;
}

// Render functions
function renderItem(item, itemId, itemTemplate, itemDataAttr) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.displayName);
  if (item.checkedOff) {
    element.find('.js-shopping-item').addClass('shopping-item__checked');
  }
  element.find('.js-shopping-item-toggle')
  element.attr(itemDataAttr, itemId);
  return element;
}

function renderList(state, listElement, itemDataAttr) {
  var itemsHTML = state.items.map(
    function(item, index) {
      return renderItem(item, index, listItemTemplate, itemDataAttr);
  });
  listElement.html(itemsHTML);
}

// Event listeners

function handleItemAdds(
  formElement, newItemIdentifier, itemDataAttr, listElement, state) {

  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(newItemIdentifier).val();
    addItem(state, newItem);
    renderList(state, listElement, itemDataAttr);
    this.reset();
  });
}

function handleItemDeletes(
  formElement, removeIdentifier, itemDataAttr, listElement, state) {

  listElement.on('click', removeIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
    deleteItem(state, itemIndex);
    renderList(state, listElement, itemDataAttr);
  })
}


function handleItemToggles(
  listElement, toggleIdentifier, itemDataAttr, state) {

  listElement.on('click', toggleIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var oldItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(state, listElement, itemDataAttr)
  });
}


$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');
  var newItemIdentifier = '#js-new-item';
  var removeIdentifier = '.js-shopping-item-delete';
  var itemDataAttr = 'data-list-item-id';
  var toggleIdentifier = '.js-shopping-item-toggle';

  handleItemAdds(
    formElement, newItemIdentifier, itemDataAttr, listElement, state);
  handleItemDeletes(
    formElement, removeIdentifier, itemDataAttr, listElement, state);
  handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state);
});

