  // localStorage.setItem("todoData", JSON.stringify([]));

function addObject(input) {
  var data = JSON.parse(localStorage.getItem("todoData"));
  var timeStamp = new Date()
  var id = timeStamp.valueOf();

  var tdObject = {
    time: timeStamp.toDateString(),
    text: input,
    id: id,
    position: data.length,
    dayChecked: null
  }
  data.push(tdObject)
  localStorage.setItem("todoData", JSON.stringify(data));
  return id
}

function removeObject(id) {
  var data = JSON.parse(localStorage.getItem("todoData"));
  for (i in data){
    if (data[i].id == id){
      data.splice(i,1)
    }
  }
  localStorage.setItem("todoData", JSON.stringify(data));
}

function appendItem (input = '') {
  if (input === '') input = $("#TDInput").val()
  if (!input) return;

  id = addObject(input);

  var items = $("#TDItems")
  var item = $("<div>", {"class": "TDItem", "id": id});
  items.append(item);
  var text = $("<p>", {"class": "ItemText"});
  text.text(input);
  item.append(text);
  var closeButton = $("<div>", {"class": "CloseButton"});
  closeButton.text("X");
  item.append(closeButton);

}

function toggleCheck(toCheck, checked) {
  var data = JSON.parse(localStorage.getItem("todoData"));
  var id = toCheck.attr('id');
  var obj;
  var i;
  for (i in data){
    if (data[i].id == id){
      obj = data[i];
    }
  }

  if (checked) {
    toCheck.removeClass('Checked');
    obj.dayChecked = null;
  }
  else{
    toCheck.addClass('Checked');
    obj.dayChecked = (new Date()).toDateString();
  }

  localStorage.setItem("todoData", JSON.stringify(data));
}


$("#TDInput").on('keyup', function (e) {
    if (e.keyCode === 13) {
        appendItem();
        $(this).val('');
    }
});


$(window).click(function(e) {
  var id = e.target.id;
  var className = e.target.className;
  if (className === 'CloseButton'){
    var item = $(e.target).parent()
    var id = item.attr('id')
    removeObject(id)
    item.remove()
    return;
  }

  var toCheck = null;
  if (className === 'ItemText'){
    toCheck = $(e.target).parent();
  }
  if (className  === 'TDItem') {
    toCheck = $(e.target);
  }
  if (toCheck){
    if (toCheck.hasClass('Checked')){
      toggleCheck(toCheck, true)
    }
    else {
      toggleCheck(toCheck, false)
    }
  }

});

function initializeToDoList() {
  var data = JSON.parse(localStorage.getItem("todoData"));
  if (!data) {
    data = [];
    localStorage.setItem("todoData", JSON.stringify(data));
    return
  }

  var items = $("#TDItems")
  console.log(data[0])
  for (index in data) {
    var item = $("<div>", {"class": "TDItem", "id": data[index].id});
    if (data[index].dayChecked !== null){
      var current = new Date();
      var checked = new Date(data[index].dayChecked);

      if (current.toDateString() !== checked.toDateString()) {
        data.splice(index, 1);
        localStorage.setItem("todoData", JSON.stringify(data));
        continue;
      }
      item.addClass('Checked')
    }
    items.append(item);
    var text = $("<p>", {"class": "ItemText"});
    text.text(data[index].text);
    item.append(text);
    var closeButton = $("<div>", {"class": "CloseButton"});
    closeButton.text("X");
    item.append(closeButton);
  }
}


$( document ).ready(function() {
  initializeToDoList()
  addContentButtonListeners()
  addLinkButtonListeners()
});


