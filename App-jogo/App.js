import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CadastroScreen from './src/screens/CadastroScreen';

export default function App() {
  const [tela, setTela] = useState('home'); // 'home' | 'cadastro'
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  function irParaNovoJogo() {
    setJogoSelecionado(null);
    setTela('cadastro');
  }

  function irParaEditar(jogo) {
    setJogoSelecionado(jogo);
    setTela('cadastro');
  }

  function voltarParaHome() {
    setJogoSelecionado(null);
    setTela('home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {tela === 'home' && (
        <HomeScreen
          onNovoJogo={irParaNovoJogo}
          onEditar={irParaEditar}
        />
      )}

      {tela === 'cadastro' && (
        <CadastroScreen
          jogoParaEditar={jogoSelecionado}
          onSalvar={voltarParaHome}
          onCancelar={voltarParaHome}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});