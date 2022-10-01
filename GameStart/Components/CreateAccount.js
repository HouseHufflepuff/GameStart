import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Register () {

  const [accountInfo, setAccountInfo] = useState({username: 'username', password: 'password', email: 'email', consoles: 'consoles', address: 'address'});
  const [loading, setLoading] = useState(false);

  //validation functions
  const validate = (email) => {
    const criteria = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return criteria.test(String(email).toLowerCase());
  }

  const handleRegister = () => {
    if (!validate(email)) {
      alert('The email provided is not valid. Please insert valid email');
      return;
    }

    if (password.length < 8) {
      alert('Please use password with at least 8 characters');
      return;
    }

    setLoading(true);
    //send form data to database/firebase to create account

  }
    //what are states? (setState{user: user, password: password, email: email, consoles: consoles, }), {isLoading},
    //5 step process ?
    //first, username, email, password (should set an accountID) -> loading transition
    //validate information
      //next, set address -> loading transition
        //next set consoles (two icons xbox and ps?) -> loading transition
          //any games you want to go ahead and add for listing (optional) -> send data to db
          //finish "quest complete!"


  return (

  )
}