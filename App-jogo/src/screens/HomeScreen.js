import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import JogoCard from '../components/JogoCard';
import { buscarJogos, salvarJogos } from '../services/storage';

export default function HomeScreen({ onNovoJogo, onEditar }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    carregarJogos();
  }, []);

  async function carregarJogos() {
    const lista = await buscarJogos();
    setJogos(lista);
  }

  async function excluirJogo(id) {
    Alert.alert(
      'Excluir jogo',
      'Tem certeza que deseja excluir este jogo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const novaLista = jogos.filter(
              (jogo) => jogo.id !== id
            );

            setJogos(novaLista);
            await salvarJogos(novaLista);
          },
        },
      ]
    );
  }

  async function alterarStatus(jogo) {
    let novoStatus;

    if (jogo.status === 'Quero jogar') {
      novoStatus = 'Jogando';
    } else if (jogo.status === 'Jogando') {
      novoStatus = 'Concluído';
    } else {
      novoStatus = 'Quero jogar';
    }

    const novaLista = jogos.map((item) =>
      item.id === jogo.id
        ? { ...item, status: novoStatus }
        : item
    );

    setJogos(novaLista);
    await salvarJogos(novaLista);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎮 GameList</Text>

      <Text style={styles.subtitulo}>
        Meus Jogos
      </Text>

      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JogoCard
            jogo={item}
            onEditar={onEditar}
            onExcluir={excluirJogo}
            onStatus={alterarStatus}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum jogo cadastrado.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={onNovoJogo}
      >
        <Text style={styles.botaoTexto}>
          + Novo Jogo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 35,
  },

  subtitulo: {
    fontSize: 20,
    marginBottom: 15,
  },

  vazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },

  botao: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
});