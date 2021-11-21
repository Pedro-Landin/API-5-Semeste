import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonText, SubTitle } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  ItemText,
  ContainerInfo,
  ContainerAnuncio,
} from "../../components/style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SearchInput from "../../components/Input/searchInput";
import {
  Alert,
  FlatList,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { HeadContainer } from "../../components/style";
import Header from "../../components/header";
//import AuthContext  from "../../context/auth";
import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

const Ads = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [arquivo, setArquivo] = useState(list );
  const [doc, setDoc] = useState();
  const [pausar, setPausar] = useState(false);

  const { user, setUser } = useAuth();
  //const {user, setUser} = useContext(AuthContext);


  const { cpf } = user;

  //Onclick para ir para o detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("DetailsAds", { ...item });
  };

  //Rota de deletar anuncio
  const Deletion = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncios/${id}`, {
      method: "DELETE",
    });
  };

  //Pesquisa pelo campo de busca
  useEffect(() => {
    if (searchText === "") {
      getAnuncio(cpf);
      // pegarValor()
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

  //Rota de pegar anuncio
  const getAnuncio = async (cpf_anunciante) => {
    const res = await fetch(
      `http://127.0.0.1:5000/listar/anuncio/${cpf_anunciante}`
    );
    const anuncios = await res.json();
    setList([anuncios]);
  };

  async function pegarValor(){
     const myuser = await AsyncStorage.getItem('user')

  }

  pegarValor();

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar style="dark" />

      <BasicContainer>
        <SearchInput
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          placeholder="Pesquisar"
        />
        <SubTitle>Seus Anuncios...</SubTitle>

        <form //Rota do banco python
          action="http://127.0.0.1:5000/create/anuncio"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" id="anuncio" name="anuncio" />
          <input type="submit" defaultValue="Submit" />
        </form>
      </BasicContainer>

      <ScrollView>
        <BasicContainer>
          <FlatList
            data={list}
            //Rendereziar somente o item do valor pedro henrique
            renderItem={({ item }) => (
              <Item onPress={() => showDetails(item)}>
                <ContainerInfo>
                  <ItemTitle>{item.fabricante}</ItemTitle>
                </ContainerInfo>

                <ItemImage source={item.img} />

                <ContainerAnuncio>
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      paddingHorizontal: 5,
                    }}
                  >
                    <TouchableOpacity>
                      <Icon
                        onPress={() => Deletion(item._id)}
                        name="delete"
                        size={25}
                        color="#36343A"
                        style={{ width: 20, padding: 2, marginLeft: 5 }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Icon
                        onPress={() => showDetails(item)}
                        name="lead-pencil"
                        size={25}
                        color="#36343A"
                        style={{ marginLeft: 15, padding: 2 }}
                      />
                    </TouchableOpacity>

                    <Icon
                      onPress={() => setPausar(true)}
                      name="eye"
                      size={25}
                      color="#36343A"
                      style={{ marginLeft: 70, padding: 2 }}
                    />
                    <View>{item.views}</View>

                    <TouchableOpacity>
                      <Icon
                        onPress={() => setPausar(true)}
                        name="block-helper"
                        size={25}
                        color="#36343A"
                        style={{ marginLeft: 15, padding: 2 }}
                      />
                    </TouchableOpacity>
                  </View>
                </ContainerAnuncio>
              </Item>
            )}
          />
        </BasicContainer>
      </ScrollView>
    </ImageBackground>
  );
};

export default Ads;
