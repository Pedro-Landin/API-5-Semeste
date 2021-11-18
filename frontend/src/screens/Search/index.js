import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  ItemText,
  ContainerInfo,
  ContainerAnuncio,
  HeadContainer,
} from "../../components/style";
import { Button, SubTitle } from "../../components/styles";
import SearchInput from "../../components/Input/searchInput";
import { FlatList } from "react-native";
//import anuncios from "../../data/anuncios";
import Header from "../../components/header";

const listTab = [
  {
    status: "All",
  },
  {
    status: "Preto",
  },
  {
    status: "Verde",
  },
];

const marcaList = [
  {
    status: "All",
  },
  {
    status: "Volkswagen",
  },
  {
    status: "Chevrolet",
  },
];

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();

  //Passando para imagem de detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("Details", { ...item });
  };

  // Filtro campo de pesquisa
  useEffect(() => {
    if (searchText === "") {
      getAnuncios();
     setList(list);
    } else {
      setList(
        list.filter(
          (item) =>
            item.fabricante.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const getAnuncios = async () => {
    const res = await fetch(`http://127.0.0.1:5000/listar/anuncios`);
    const anuncios = await res.json();
    setList(anuncios);
  };

  useEffect(() => {

  }, []);

  return (
    <HeadContainer>
      <Header />
      <BasicContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <SearchInput
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            placeholder="Pesquisar"
          />

          <SubTitle>Resultados...</SubTitle>

          <FlatList
            data={list}
            renderItem={({ item }) => (
              <Item onPress={() => showDetails(item)}>
                <ContainerInfo>
                  <ItemTitle>{item.fabricante}</ItemTitle>
                </ContainerInfo>
                <ItemImage source={item.img} />
                <ContainerAnuncio>
                  <ItemText>{item.desc_veiculo}</ItemText>
                </ContainerAnuncio>
              </Item>
            )}
          />
        </ScrollView>
      </BasicContainer>
    </HeadContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  btnTab2: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
  },
  textTab2: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#3F37C9",
  },
  textTabActive: {
    color: "#fff",
  },
  btnTabActive2: {
    backgroundColor: "#3F37C9",
  },
  textTabActive2: {
    color: "#fff",
  },
});
