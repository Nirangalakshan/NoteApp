import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import moment from 'moment';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      let response = await fetch('http://192.168.8.210:3000/notes');
      let data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const saveNote = async () => {
    if (!textInputValue || !selectedImage) {
      alert('Please enter text and select an image');
      return;
    }

    let localUri = selectedImage;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('note_text', textInputValue);
    formData.append('image', { uri: localUri, name: filename, type });

    try {
      let response = await fetch('http://192.168.8.210:3000/notes', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let result = await response.json();
      console.log(result);
      fetchNotes(); // Refresh the notes after saving a new one
      setModalVisible(false);
      clearModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async () => {
    if (noteToDelete) {
      try {
        let response = await fetch(`http://192.168.8.210:3000/notes/${noteToDelete.id}`, {
          method: 'DELETE',
        });
        let result = await response.json();
        console.log(result);
        setNotes(notes.filter(note => note.id !== noteToDelete.id)); // Update the notes state after deletion
        setOptionVisible(false);
        setNoteToDelete(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateNote = async () => {
    if (!textInputValue) {
      alert('Please enter text');
      return;
    }

    let localUri = selectedImage;
    let filename = localUri ? localUri.split('/').pop() : null;
    let match = filename ? /\.(\w+)$/.exec(filename) : null;
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('note_text', textInputValue);
    if (localUri) {
      formData.append('image', { uri: localUri, name: filename, type });
    }

    try {
      let response = await fetch(`http://192.168.8.210:3000/notes/${currentNote.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let result = await response.json();
      console.log(result);
      fetchNotes(); // Refresh the notes after updating
      setEditVisible(false);
      clearModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setTextInputValue(note.note_text);
    setSelectedImage(`http://192.168.8.210:3000/uploads/${note.image_name}`);
    setEditVisible(true);
  };

  const openOptions = (note) => {
    setNoteToDelete(note);
    setOptionVisible(true);
  };

  const clearModal = () => {
    setTextInputValue('');
    setSelectedImage(null);
    setCurrentNote(null);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY/MM/DD  h:mm a');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          clearModal();
        }}
      >
        <ScrollView contentContainerStyle={styles.modalView}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter text"
            value={textInputValue}
            onChangeText={setTextInputValue}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image1} />
          )}
          <Button icon="view-gallery" mode="contained-tonal" onPress={pickImage}>
            Pick from Gallery
          </Button>
          <Button style={{ marginTop: 5 }} icon="camera" mode="contained-tonal" onPress={captureImage}>
            Capture
          </Button>
          <Button style={{ marginTop: 5 }} icon="content-save-check" mode="contained-tonal" onPress={saveNote}>
            Save
          </Button>
          <Button style={{ marginTop: 5 }} icon="close" mode="contained-tonal" onPress={() => { setModalVisible(false); clearModal(); }}>
            Close
          </Button>
        </ScrollView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={editVisible}
        onRequestClose={() => {
          setEditVisible(!editVisible);
        }}
      >
        <ScrollView contentContainerStyle={styles.modalView}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter text"
            value={textInputValue}
            onChangeText={setTextInputValue}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image1} />
          )}
          <Button icon="view-gallery" mode="contained-tonal" onPress={pickImage}>
            Pick from Gallery
          </Button>
          <Button style={{ marginTop: 5 }} icon="camera" mode="contained-tonal" onPress={captureImage}>
            Capture
          </Button>
          <Button style={{ marginTop: 5 }} icon="content-save-check" mode="contained-tonal" onPress={updateNote}>
            Update
          </Button>
          <Button style={{ marginTop: 5 }} icon="close" mode="contained-tonal" onPress={() => { setEditVisible(false); clearModal(); }}>
            Close
          </Button>
        </ScrollView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={optionVisible}
        onRequestClose={() => {
          setOptionVisible(!optionVisible);
        }}
      >
        <View style={{ height: '50%', width: '50%', marginLeft: '25%', marginTop: '50%', borderRadius: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <Button icon={() => <AntDesign name="edit" size={24} color="black" />} mode="contained-tonal" style={{ marginBottom: 10 }} onPress={() => { setOptionVisible(false); openEditModal(noteToDelete); }}>
            Edit
          </Button>
          <Button icon={() => <AntDesign name="delete" size={24} color="black" />} mode="contained-tonal" style={{ marginBottom: 10 }} onPress={deleteNote}>
            Delete
          </Button>
          <Button icon="close" mode="contained-tonal" onPress={() => setOptionVisible(!optionVisible)}>
            Close
          </Button>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.notesContainer}>
        {notes.map(note => (
          <TouchableOpacity key={note.id} style={styles.noteItem} onPress={() => openEditModal(note)}>
            <Text>{note.note_text}</Text>
            <Text>{formatDate(note.created_at)}</Text>
            <Image source={{ uri: `http://192.168.8.210:3000/uploads/${note.image_name}` }} style={styles.image} />
            <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: 'white', padding: 3, borderRadius: 20 }} onPress={() => openOptions(note)}>
              <SimpleLineIcons name="options" size={24} color="black" style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.pressable} onPress={() => setModalVisible(true)}>
          <AntDesign style={{ alignSelf: 'center' }} name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notesContainer: {
    padding: 20,
  },
  noteItem: {
    backgroundColor: '#ffda79',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  touchableContainer: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  pressable: {
    backgroundColor: '#ffaf40',
    padding: 30,
    paddingHorizontal: 30,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 10,
    alignItems: 'center',
  },
  modalView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 20,
  },
  textInput: {
    borderRadius: 10,
    width: 330,
    height: 200,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 50,
    textAlignVertical: 'top',
  },
  image: {
    width: 90,
    height: 90,
    marginTop: 10,
    borderRadius: 20,
  },
  image1: {
    width: 330,
    height: 200,
    marginTop: 0,
  },
});

export default HomeScreen;
