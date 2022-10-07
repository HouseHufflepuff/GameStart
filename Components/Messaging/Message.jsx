import {Text, View} from 'react-native';
import styles from './MessagingStyles.js';

export default function Message({message, sent}) {
  return(
<View style={sent ? styles.styleSent : styles.styleRecieved}>
  <Text style={sent ? styles.sentText : styles.recievedText}>
    {message.body}
  </Text>
  <Text style={sent ? styles.sentTimestamp: styles.recievedTimestamp}>{new Date(message.created_at).toLocaleString(undefined, {timeStyle:'short'})}</Text>
</View>
  )
}
