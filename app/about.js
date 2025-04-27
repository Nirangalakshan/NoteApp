import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign, Fontisto, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'

const AboutScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View>

        <Image style={{
          width: 190,
          height: 190,
          borderRadius: 100,
          marginLeft: 83,
          marginTop: 10,
          borderWidth: 4,
          borderColor: '#b2bec3',
        }} source={require('../assets/images/author.jpg')} />

        <Text style={{
          color: '#ee5253',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
         
          
        }}>Creator</Text>

        <Text style={{
          color: '#2d3436',
          fontSize: 20,
          textAlign: 'center',
        }}>Niranga_lakshan</Text>

        <Text style={{
          textAlign: 'center',
          color: '#576574',
          fontSize: 16,
          fontWeight: 'bold',
        }}>(Science & Technology Mechatronics Specialization)</Text>

      </View>
      <View style={{borderRadius: 20,
        elevation: 5,
        marginTop: 10,
        marginBottom: 30, 
        padding: 21,
        backgroundColor: '#b2bec3', 
        width: '90%', 
        alignSelf: 'center' }}>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        }}>Contact me</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'center',
         
        }}><MaterialCommunityIcons style={{alignSelf:'flex-start'}} name="gmail" size={28} color="black" />Email: nirangaexample@gmail.com</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'center',
        
        }}><Foundation style={{alignSelf:'flex-start'}} name="telephone" size={28} color="black" />Tel: +94 78 123 4567</Text>



      </View>
      <View>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 5,
        }}>Social media</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 10,
        }}><AntDesign style={{alignSelf:'flex-start'}} name="instagram" size={28} color="#d63031" />Instagram: @nirangaexample</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 10,
        }}><Fontisto style={{alignSelf:'flex-start'}} name="twitter" size={28} color="#00aced" />Twitter: @nirangaexample</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 10,
        }}><MaterialCommunityIcons style={{alignSelf:'flex-start'}} name="facebook" size={28} color="#3b5998" />Facebook: @nirangaexample</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 10,
        }}><Fontisto style={{alignSelf:'flex-start'}} name="github" size={28} color="#333" />Github: @nirangaexample</Text>

        <Text style={{
          fontSize: 16,
          textAlign: 'left',
          marginLeft: 20,
          marginTop: 10,
        }}><MaterialCommunityIcons style={{alignSelf:'flex-start'}} name="linkedin" size={28} color="#0077b5" />LinkedIn: @nirangaexample</Text>
      </View>
    </View>
  )
}

export default AboutScreen