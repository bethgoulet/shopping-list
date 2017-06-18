
//add items by submtting form

// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return '<li> \
        <span class="shopping-item">' + item + '</span> \
        <div class="shopping-item-controls"> \
          <button class="shopping-item-toggle"> \
            <span class="button-label">check</span> \
          </button> \
          <button class="shopping-item-delete"> \
            <span class="button-label">delete</span> \
          </button> \
        </div> \
      </li>';
    });
    element.html(itemsHTML);
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    this.reset();
});

//check or uncheck items by hitting check button
$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
   var checkedItem = $(this).closest('.shopping-item');
   checkedItem.toggleClass('shopping-item__checked');
   renderList(state, $('.shopping-list'));
});

//delete items by hitting delete button
$('.shopping-list').on('click', 'shopping-item-delete', function(event){
   var deletedItem = parseInt($(this).closest('.shopping-item'));
   state.items.splice(deletedItem, 1);
   renderList(state, $('.shopping-list'));
});
