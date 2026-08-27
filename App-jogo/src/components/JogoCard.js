import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function JogoCard({ jogo, onEditar, onExcluir, onStatus }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{jogo.nome}</Text>

      <Text style={styles.info}>🎮 Plataforma: {jogo.plataforma}</Text>
      <Text style={styles.info}>🎯 Gênero: {jogo.genero}</Text>
      <Text style={styles.info}>⭐ Nota: {jogo.nota}</Text>
      <Text style={styles.status}>📌 {jogo.status}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => onStatus(jogo)}
        >
          <Text style={styles.textoBotao}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => onEditar(jogo)}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => onExcluir(jogo.id)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    marginBottom: 4,
  },

  status: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },

  botoes: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },

  botao: {
    backgroundColor: '#3498db',
    padding: 9,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  botaoExcluir: {
    backgroundColor: '#e74c3c',
    padding: 9,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});