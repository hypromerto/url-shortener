import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    backgroundColor: "#16589b",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  externalBackground: {
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
  internalBackground: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#6794b5",
    justifyContent: "center",
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
  registerContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#4b84ac",
    justifyContent: "center"
  },
  text: {
    color: "white",
  },
  welcomeButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  welcomeBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export { styles };
