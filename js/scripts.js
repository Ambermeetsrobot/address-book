// Business logic
function Contact(first, last, email, phone) {
  this.firstName = first;
  this.lastName = last;
  this.emailAddress = email;
  this.phoneNumber = phone;
  this.addresses = [];
}

function Address(addtype, street, city, state) {
  this.addtype = addtype;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.addtype + ", " + this.street + ", " + this.city + ", " + this.state;
}

// user interface logic
$(document).ready(function() {
  $("#add-address").click(function() {
  $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="new-type">Address Type</label>' +
                                  '<input type="text" class="form-control new-type">' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
});

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedEmailAddress, inputtedPhoneNumber);

    $(".new-address").each(function() {
    var inputtedType = $(this).find("input.new-type").val();
    var inputtedStreet = $(this).find("input.new-street").val();
    var inputtedCity = $(this).find("input.new-city").val();
    var inputtedState = $(this).find("input.new-state").val();
    var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState)
    newContact.addresses.push(newAddress)
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function(){
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".email-address").text(newContact.emailAddress);
      $(".phone-number").text(newContact.phoneNumber);
      newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
    });
  });
  function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-email-address").val("");
  $("input#new-phone-number").val("");
  $("input.new-type").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}
  });
});
