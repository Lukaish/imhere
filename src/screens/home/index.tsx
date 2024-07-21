import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import React, { useState } from "react";

// Exportação nomeada
// export const CONFIG = ''

export default function Home() {

  //conteudo da lista | atualiza a lista
  const [participants, setParticipants] = useState<string[]>([]);

  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante já existe", "Por gentileza, informe outro participante")
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {


    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(p => p !== name))

      },
      {
        text: "Não",
        style: "cancel"
      }
    ])
    console.log(`${name} Participant removed`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome evento</Text>
      <Text style={styles.eventDate}>Sábado, 8 de junho</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor={"#6B6B6B"}
          onChangeText={setParticipantName}
          // onChangeText={text => setParticipantName(text)}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyComponent}>
            Ninguém chegou no evento ainda? Adicione participantes!
          </Text>
        )}
      />



    </View>
  )
}