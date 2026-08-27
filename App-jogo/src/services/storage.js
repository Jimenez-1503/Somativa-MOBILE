import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@gamelist_jogos';

export async function buscarJogos() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.log('Erro ao buscar jogos:', erro);
    return [];
  }
}

export async function salvarJogos(jogos) {
  try {
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(jogos));
  } catch (erro) {
    console.log('Erro ao salvar jogos:', erro);
  }
}