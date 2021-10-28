import React, { useEffect, useState } from "react";
import { Text, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Pad, DetailsView, Container } from "../../components/style";
import { Button, ButtonText } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { db } from "../../services/firebase";
import InputEdit from "../../components/Input/InputEdit";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const DetailsAds = ({ navigation, route }) => {
  const [anuncios, setAnuncios] = useState(route.params);
  const [fabricante, setFabricante] = useState();
  const [desc_veiculo, setDescV] = useState();
  const [desc_marca, setDescM] = useState();
  const [ano_fabricacao, setAnoF] = useState();
  const [ano_modelo, setAno_Modelo] = useState();
  const [valor_veiculo, setPreco] = useState();
  const [cod_anunciante, setCod] = useState();

  const Edinting = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/atualizar/anuncio/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fabricante,
        ano_fabricacao,
        ano_modelo,
        cod_anunciante,
        desc_marca,
        desc_veiculo,
        valor_veiculo,
      }),
    });
    const anuncios = await res.json();

    setAnuncios(anuncios);
  };

  //Rota de edição
  const Edintin = async () => {
    console.log(anuncios);
  };

  const getAnuncios = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncio/${id}`);
    const anuncios = await res.json();

    setAnuncios(anuncios);
    setFabricante(anuncios.fabricante);
    setDescV(anuncios.desc_veiculo);
    setDescM(anuncios.desc_marca);
    //setId(anuncios.id)
    setAnoF(anuncios.ano_fabricacao);
    setAno_Modelo(anuncios.ano_modelo);
    setPreco(anuncios.valor_veiculo);
    setCod(anuncios.cod_anunciante);
  };

  return (
    <Container>
      <ScrollView>
        <StatusBar style="dark" />
        <Image style={pannel.image} source={anuncios.img} />

        <DetailsView>
          <Pad>
            <Text>Fabricante</Text>
            <InputEdit
              onChangeText={(fabricante) => setFabricante(fabricante)}
              value={fabricante}
            />

            <Text>Descrição do Veiculo</Text>
            <InputEdit onChangeText={(t) => setDescV(t)} value={desc_veiculo} />
            <Text>Descrição da Marca</Text>
            <InputEdit onChangeText={(t) => setDescM(t)} value={desc_marca} />
            <Text>Ano de Fabricação</Text>
            <InputEdit
              onChangeText={(t) => setAnoF(t)}
              value={ano_fabricacao}
            />
            <Text>Ano do Modelo</Text>
            <InputEdit
              onChangeText={(t) => setAno_Modelo(t)}
              value={ano_modelo}
            />
            <Text>Preço</Text>
            <InputEdit
              onChangeText={(t) => setPreco(t)}
              value={valor_veiculo}
            />
            <Text>Codigo</Text>
            <InputEdit onChangeText={(t) => setCod(t)} value={cod_anunciante} />

            <Button title="Salvar" onPress={() => Edinting(anuncios.id)}>
              <ButtonText> Salvar</ButtonText>
            </Button>
            <Button title="Salvar" onPress={() => getAnuncios(anuncios.id)}>
              <ButtonText>Liberar</ButtonText>
            </Button>
          </Pad>
        </DetailsView>
      </ScrollView>
    </Container>
  );
};

export default DetailsAds;

export const pannel = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenHeight / 3.0,
    resizeMode: "cover",
  },
});
