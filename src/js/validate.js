export default function validate(values) {
  let errors = {};
  if (!values.name) {   // if name is empty
    errors.name = "Name is required";
  } else if (!/^([A-Z]([a-záéúőóüö.]{1,}\s?)){2,}$/.test(values.name)) { // regex for both English and Hungarian names downloaded from stack overflow.
    errors.name = "Letters (English or Hungarian), initails Caps followed by small eg: Vikas Pandey";
  }
  if (!values.email) { // if email is empty
    errors.email = "Email is Required";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) { // // regex for email downloaded from stack overflow
    errors.email = "Email address is invalid eg: vikas.pandey@vodafone.com";
  }
  if (!values.phone) { // if phone is empty
    errors.phone = "Phone Number is required";
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(values.phone)) { // regex for Hungarian phone number downloaded from stack overflow
    errors.phone = "Phone Number should be Hungarian eg: +36301968064";
  }
  return errors;
}