import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { buscarJogos, salvarJogos } from '../services/storage';

const STATUS_OPCOES = ['Quero jogar', 'Jogando', 'Concluído'];

export default function CadastroScreen({ jogoParaEditar, onSalvar, onCancelar }) {
  const [nome, setNome] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [genero, setGenero] = useState('');
  const [nota, setNota] = useState('');
  const [status, setStatus] = useState('Quero jogar');

  const editando = !!jogoParaEditar;

  useEffect(() => {
    if (jogoParaEditar) {
      setNome(jogoParaEditar.nome ?? '');
      setPlataforma(jogoParaEditar.plataforma ?? '');
      setGenero(jogoParaEditar.genero ?? '');
      setNota(jogoParaEditar.nota ? String(jogoParaEditar.nota) : '');
      setStatus(jogoParaEditar.status ?? 'Quero jogar');
    }
  }, [jogoParaEditar]);

  function validar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do jogo.');
      return false;
    }

    if (!plataforma.trim()) {
      Alert.alert('Atenção', 'Informe a plataforma do jogo.');
      return false;
    }

    if (nota) {
      const notaNumero = Number(nota.replace(',', '.'));

      if (isNaN(notaNumero) || notaNumero < 0 || notaNumero > 10) {
        Alert.alert('Atenção', 'A nota deve ser um número entre 0 e 10.');
        return false;
      }
    }

    return true;
  }

  async function handleSalvar() {
    if (!validar()) {
      return;
    }

    const listaAtual = await buscarJogos();

    const jogoSalvo = {
      id: editando ? jogoParaEditar.id : Date.now().toString(),
      nome: nome.trim(),
      plataforma: plataforma.trim(),
      genero: genero.trim(),
      nota: nota ? Number(nota.replace(',', '.')) : null,
      status,
    };

    let novaLista;

    if (editando) {
      novaLista = listaAtual.map((jogo) =>
        jogo.id === jogoSalvo.id ? jogoSalvo : jogo
      );
    } else {
      novaLista = [...listaAtual, jogoSalvo];
    }

    await salvarJogos(novaLista);

    onSalvar();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.titulo}>
          {editando ? '✏️ Editar Jogo' : '🎮 Novo Jogo'}
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: The Legend of Zelda"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Plataforma</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Switch, PC, PS5..."
          value={plataforma}
          onChangeText={setPlataforma}
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: RPG, Ação, Aventura..."
          value={genero}
          onChangeText={setGenero}
        />

        <Text style={styles.label}>Nota (0 a 10)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 9.5"
          value={nota}
          onChangeText={setNota}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {STATUS_OPCOES.map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.statusBotao,
                status === opcao && styles.statusBotaoSelecionado,
              ]}
              onPress={() => setStatus(opcao)}
            >
              <Text
                style={[
                  styles.statusTexto,
                  status === opcao && styles.statusTextoSelecionado,
                ]}
              >
                {opcao}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.botaoTexto}>
            {editando ? 'Salvar Alterações' : 'Cadastrar Jogo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  statusContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },

  statusBotao: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  statusBotaoSelecionado: {
    backgroundColor: '#3498db',
  },

  statusTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },

  statusTextoSelecionado: {
    color: '#fff',
  },

  botaoSalvar: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 10,
    marginTop: 4,
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },

  botaoCancelar: {
    padding: 14,
    marginTop: 8,
  },

  botaoCancelarTexto: {
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});