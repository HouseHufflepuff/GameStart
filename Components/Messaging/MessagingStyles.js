import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818'
  },
  styleSent: {
    padding: '1%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sentText: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0077B6',
    alignSelf : 'flex-end',
    fontSize : 20,
    padding: 5,
    maxWidth: '70%',
    color: 'white'
  },
  sentTimestamp: {
    color:'grey',
    alignSelf:'flex-end',
    paddingBottom: 0
  },
  styleRecieved: {
    padding: '1%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  recievedText: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#454545',
    alignSelf: "flex-start",
    fontSize : 20,
    padding: 5,
    maxWidth: '70%',
    color: 'white'
  },
  recievedTimestamp: {
    color:'grey',
    alignSelf:'flex-start'
  },
  styleHeader: {
    backgroundColor: '#181818',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText : {
    color: "white",
    textAlign: "center",
    fontSize : 20,
    topMargin : '2%'
  }
});

export default styles;