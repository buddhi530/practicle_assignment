import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const api_key =
    "https://api.themoviedb.org/3/movie/popular?api_key=165c5b2569f11b7cd963310be5b4b6e3&language=en-US";
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {},
  });

  const search = () => {
    axios(api_key + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      //console.log(results);
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const openpopup = () => {
    axios(api_key + "&i=" + id).then(({ data }) => {
      let result = data;
      //console.log(results);
      setState((prevState) => {
        return { ...prevState, selected: results };
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headername}>THE MOVIE DB </Text>

      <TextInput
        style={styles.search}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      ></TextInput>

      <ScrollView>
        {state.results.map((result) => {
          <TouchableHighlight
            key={result.id}
            onPress={() => openpopup(result.id)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.poster_path }}
                style={{
                  width: "100%",
                  height: 300,
                }}
                resizeMode="cover"
              />
              <Text style={styles.header}>{result.original_title}</Text>
            </View>
            ;
          </TouchableHighlight>;
        })}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.title != "undefined" ? true : false}
      >
        <View>
          <Text style={styles.poptitle}>{state.selected.original_title}</Text>
          <Text styele={{ marginBottom: 30 }}>
            Rating : {state.selected.imbdranking}
          </Text>
          <Text>{state.selected.overview}</Text>
        </View>
        <TouchableHighlight
          onPress={() =>
            setState((prevState) => {
              return { ...prevState, selected: {} };
            })
          }
        >
          <Text style={styles.closebtn}> CLOSE </Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#482ff7",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    padding: 15,
  },
  headername: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 30,
    color: "#FFFFFF",
  },
  search: {
    padding: 20,
    backgroundColor: "#fff",
    borderColor: 10,
    marginBottom: 40,
    width: "100%",
    fontSize: 20,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 15,
    marginTop: 20,
  },
  header: {
    color: "#fff",
    fontSize: 18,
    padding: 20,
    backgroundColor: "#445565",
  },
  popup: {
    padding: 5,
  },
  poptitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 5,
  },
  closebtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: 600,
    backgroundColor: "#2463C4",
  },
});
