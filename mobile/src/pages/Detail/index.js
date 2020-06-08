import React from 'react';
import {View, FlatList, Image, Text, TouchableOpacity, Linking} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logo from '../assets/logo.jpg'
import styles from './styles'

export default function Detail() {

    const route = useRoute()
    const incident = route.params.incident
    const navigation = useNavigation()
    const message = `Olá, ${incident.name}! Estou entrando em contato para juadar sobre o caso ${incident.title}`
    
    

    function navigateBack() {
        navigation.goBack()
    }
    
    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herois do Caso: ${incident.title}`,
            recipients: [`incident.email`],
            body: message

        })
    }

    function SendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
       <View style={styles.container}>
           
            <View style={styles.header}>
                <Image source={logo} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#E82041' />
                </TouchableOpacity>
            
        </View> 

        <View style={styles.incident}>  
            <Text style={styles.incidentProperty}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{incident.value}</Text>
        </View>
        
        <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o heroi deste caso.</Text>
           
            <Text style={styles.heroDescription}>Entre em contato</Text>

            <View style={styles.actions}>

                <TouchableOpacity style={styles.action} onPress={SendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

            </View>

        </View>



        </View>
    )
}