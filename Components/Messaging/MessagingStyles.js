import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  styleSent: {
    padding: '1%',
  },
  sentText: {
    borderRadius : 5,
    backgroundColor: '#90e0ef',
    alignSelf : 'flex-end',
    fontSize : 20,
    padding: '1%',
    maxWidth: '70%',
  },
  sentTimestamp: {
    color:'grey',
    alignSelf:'flex-end',
    paddingBottom: 0
  },
  styleRecieved: {
    padding: '1%'
  },
  recievedText: {
    borderRadius : 5,
    backgroundColor: '#00b4d8',
    alignSelf: "flex-start",
    fontSize : 20,
    padding: '1%',
    maxWidth: '70%',
  },
  recievedTimestamp: {
    color:'grey',
    alignSelf:'flex-start'
  },
  styleHeader: {
    backgroundColor: 'black',
    height: '10%',
  },
  headerText : {
    color: "white",
    textAlign: "center",
    fontSize : 20,
    topMargin : '2%'
  }
});

export default styles;