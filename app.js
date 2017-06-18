
//couldn't get this to work so had to model solution by provided answer

//add items by submtting form

// Single state object
var state = {
    items: []
};

var itemTemplate = (
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
var addItem = function(state, item) {
    state.items.push({
        displayName: item,
        checkedOff: false
    });
};

var deleteItem = function(state, itemIndex) {
    state.items.splice(itemIndex, 1);
};    

var getItem = function(state, itemIndex) {
    return state.items[itemIndex];
};

var updateItem = function(state, itemIndex, newItemState) {
    state.items[itemIndex] = newItemState;
};

// Render functions
var renderItem = function(item, itemId, itemTemplate, itemDataAttr) {
    var itemsHTML = $(itemTemplate);
    itemsHTML.find('.js-shopping-item').text(item.displayName);
    if (item.checkedOff) {
        itemsHTML.find('.js-shopping-item').addClass('shopping-item_checked');
    }
    itemsHTML.find('.js-shopping-item-toggle');
    itemsHTML.attr(itemDataAttr, itemId);
    return itemsHTML;
};

var renderList = function(state, listElement, itemDataAttr) {
    var itemsHtml = state.items.map(
        function(item, index) {
            return renderItem(item, index, itemTemplate, itemDataAttr);
        });
     listElement.html(itemsHtml);  
};

// Event listeners

//add items
function itemAdds (
formElement, newItemIdentifier, itemDataAttr, listElement, state) {
    formElement.submit(function(event) {
        event.preventDefault();
        var newItem = formElement.find(newItemIdentifier).val();
        addItem(state, newItem);
        renderList(state, listElement, itemDataAttr);
        this.reset();
    });
}

//check or uncheck items by hitting check button
function itemToggles(
listElement, toggleIdentifier, itemDataAttr, state) {
    listElement.on('click', toggleIdentifier, function(event) {
        var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
        var oldItem = getItem(state, itemId);
        
        updateItem(state, itemId, {
            displayName: oldItem.displayName,
            checkedOff: !oldItem.checkedOff });
        renderList(state, listElement, itemDataAttr);
    });
}

//delete items by hitting delete button
function itemDeletes(
formElement, removeIdentifier, itemDataAttr, listElement, state) {
    listElement.on('click', removeIdentifier, function(event) {
        var itemIndex= parseInt($(this).closest('li').attr(itemDataAttr));
        deleteItem(state, itemIndex);
        renderList(state, listElement, itemDataAttr);
    });
}



$(function() {
    var formElement = $('#js-shopping-list-form');
    var listElement = $('.js-shopping-list');
    var newItemIdentifier = '#js-new-item';
    var removeIdentifier = '.js-shopping-item-delete';
    var itemDataAttr = 'data-list-item-id';
    var toggleIdentifier = '.js-shopping-item-toggle';
    
    itemAdds(formElement, newItemIdentifier, itemDataAttr, listElement, state);
    itemDeletes(formElement, removeIdentifier, itemDataAttr, listElement, state);
    itemToggles(listElement, toggleIdentifier, itemDataAttr, state);
});
