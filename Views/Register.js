import React, {useState,useEffect} from 'react';
import{
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableNativeFeedback
}from 'react-native';

import APIdata from '../Src/APIdata'

import RNPickerSelect from 'react-native-picker-select';
import EventEmitter from 'react-native-eventemitter';

const APIRegister = (name,lastName,roll,email,password)=>{
    console.log(APIdata.URI+'/register')
    fetch(APIdata.URI+'/register',{
        method:'PUT',
        body:JSON.stringify({name:name,lastName:lastName,roll:roll,email:email,password:password}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(function(res){return res.json()})
      .then(res => {
          console.log(res)
          if( res.status == 200 ){
              alert('Tu cuenta esta en proceso de aceptacion')
              EventEmitter.emit('onCloseRegister',true)
          }else if( res.status == 100 ){
            alert('La cuenta ya existe')
          }
      })
      .catch(err => {console.log(err)})
}

let verify = ''

const Register = ()=>{
    let [visibility1,setVisiblity1] = useState(true)
    let [visibility2,setVisiblity2] = useState(true)
    let [selectRoll, setSelectRoll] = useState(1)
    let [name, setName ] = useState('')
    let [lastName, setlastName ] = useState('')
    let [email, setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [comparePass, setComparePass] = useState(false)
    return(
        <View style={styles.container}>
            <View style={styles.containerInputs}>
            <Image source={require('../Images/frontPanel.png')} style={{width:200,height:100,marginVertical:30}}/>
            <View style={{width:'80%'}}>
            <Text
             style={styles.Title}
            >Registrate</Text>
            <View style={{marginVertical:10}}>
            <Text>Nombre</Text>
            <View style={styles.TextInput}>
            <TextInput
             placeholder = "Nombre"
             keyboardType='default'
             onChangeText = {(value)=>{
                 setName(value)
             }}
            />
            </View>
            </View>
            <View style={{marginVertical:10}}>
            <Text>Apellido</Text>
            <View style={styles.TextInput}>
            <TextInput
             placeholder = "Apellido"
             keyboardType='default'
             onChangeText = {(value)=>{
                 setlastName(value)
             }}
            />
            </View>
            </View>
            <View style={{marginVertical:10}}>
            <Text>Selecciona tu roll</Text>
            <View style={styles.TextInput}>
             <RNPickerSelect
              
              items = {[
                  {label:'Administrador',value:1},
                  {label:'Operario',value:2}
              ]}

              onValueChange = {(value)=>{
                  console.log(value)
                  if(value != null){
                  setSelectRoll(value)
                }
              }}

              value = {selectRoll}
              
             />
            </View>
            </View>
            
            <View style={{marginVertical:10}}>
            <Text>Correo</Text>
            <View style={styles.TextInput}>
            <TextInput
             placeholder = "Ingresa correo"
             keyboardType='email-address'
             onChangeText = {(value)=>{
                setEmail(value)
            }}
            />
            </View>
            </View>
            <View style={{marginVertical:10}}>
            <Text>Contraseña</Text>
            <View style={[{flexDirection:'row',alignItems:'center'},styles.TextInput]}>
            <TextInput
             placeholder = "Ingresa contraseña"
             keyboardType = 'default'
             secureTextEntry = {visibility1}
             style={{width:'90%'}}
             onChangeText={(value)=>{
                 setPassword(value)
             }}
            />
            <TouchableOpacity
             onPress={()=>{
                 setVisiblity1(!visibility1)
             }}
             
            >
                <Image source = {require('../Images/ojo.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{marginVertical:20}}>
            <Text>Confirma contraseña</Text>
            <View style={[{flexDirection:'row',alignItems:'center'},styles.TextInput]}>
            <TextInput
             placeholder = "Confirma contraseña"
             keyboardType = 'default'
             secureTextEntry = {visibility2}
             
             onChangeText = {(value)=>{
                verify = value
                if(password === verify){
                    setComparePass(true)
                }
            }}
             style={{width:'90%'}}
            />
            <TouchableOpacity
             onPress={()=>{
                 setVisiblity2(!visibility2)
             }}
            >
                <Image source = {require('../Images/ojo.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
            </View>
            </View>
            </View>
            </View>
            <TouchableOpacity
             style={styles.ButtonLogin}
             onPress={()=>{
                 if(name === '' || email === '' || password === ''){
                    alert('Falta campos por llenar')
                     
                 }else{
                     if(comparePass)
                     APIRegister(name,lastName,selectRoll,email,password);
                 }
            }}
            >
                <Text
                 style={styles.TextBtn}
                >Crear mi usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress = {()=>{
                 EventEmitter.emit('onCloseRegister',true)
             }}
             style={{position:'absolute',top:20,left:20}}
            >
                <Image source = {require('../Images/cerrar.png')} style={{width:25,height:25}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    containerInputs:{
        width:'100%',
        height:'90%',
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonLogin:{
        backgroundColor:'#0564B3',
        width:'85%',
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginVertical:15,
    },
    TextBtn:{
        color:'white',
        fontWeight:'bold'
    },
    TextInput:{
        borderBottomWidth:1
    },
    Title:{
        fontSize:22,
        marginVertical:10
    }
})

export default Register