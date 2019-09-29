import { action, computed, observable } from "mobx"

class AppStartStore {

 
  @observable LookupObj={
    firstname:'',
    surname:'',
    address:''
  };
@observable initialObj = {
  firstname:'',
  surname:'',
  address:''
};
@observable isDirty = true;


  @observable validInputFieldCount = 0;
  @observable validInputFields = [];

  @action stepNext=()=>{
console.log('inside stepNext',this.LookupObj.firstname, this.LookupObj.surname, this.LookupObj.address);
console.log('inside initialObj',this.initialObj.firstname, this.initialObj.surname, this.initialObj.address);
//this.isDirty=Object.is(this.initialObj, this.LookupObj)?false:true;
this.isDirty = JSON.stringify(this.initialObj)===JSON.stringify(this.LookupObj);
console.log("isDirty",this.isDirty);
  };

  @action stepBack=()=>{
    Object.assign(this.initialObj,this.LookupObj);
  }

  @action validateInput=(name,value)=>{
    console.log("valid ",this.validInputFields);
    if(value.length>0 && (!this.validInputFields.includes(name))){
        this.validInputFields.push(name);
      }
    if(value.length===0 &&(this.validInputFields.includes(name))){
      this.validInputFields.pop(name);
    }
  }

  @computed get enableNextBtn(){
    console.log("inside enable mthd",this.validInputFields.length);
    return (this.validInputFields.length>=2);
  }

}

export default AppStartStore