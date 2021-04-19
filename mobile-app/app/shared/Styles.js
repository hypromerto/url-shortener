import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    height: 50,
    color: "black",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#16589b",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

export {styles};
