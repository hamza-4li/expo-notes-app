import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    { id: "1", text: "Note One" },
    { id: "2", text: "Note Two" },
    { id: "3", text: "Note Three" },
    { id: "4", text: "Note Four" },
    { id: "5", text: "Note Five" },
    { id: "6", text: "Note Six" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.text}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=> setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      
      {/* Modal for Adding Notes */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter note"
              style={styles.input}
              value={newNote}
              onChangeText={setNewNote}
            />
            <TouchableOpacity
              onPress={() => {
                if (newNote.trim() !== "") {
                  setNotes([{ id: Date.now().toString(), text: newNote }, ...notes]);
                  setNewNote("");
                  setModalVisible(false);
                }
              }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  noteItem: {
    felxDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Modal UI
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row"

  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default NoteScreen;
