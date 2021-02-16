import React from "react";
import app from "./base";


class ProfileInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userfname: '',
        userlname:'',
        userage:'',
        country:'',
        phoneno:''
      };
    }
    
componentDidMount() {

    // const fetchLogs=async()=>{
        var user = app.auth().currentUser;
        const db =  app.firestore();
        var uprofileid = user.uid;
        console.log(uprofileid); 
      db.collection('Profile').doc(uprofileid.toString()).get()
      .then(doc => {
        const data = doc.data();
        console.log(data); 
        this.setState({ userfname: data.FirstName });
        this.setState({ userlname: data.LastName });
      });
   
  }

render(){
    const { userfname } = this.state;
    const { userlname } = this.state;
    return (
        <>
          <h1>Set/Update Profile</h1>
            
            {userfname}
            {userlname}
            
          <button>Set/Update Profile</button> 
        </>
      );
}
 
};

export default ProfileInput;