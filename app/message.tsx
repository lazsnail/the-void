import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { supabase } from './supabaseClient';
import SpinningSphere from './purpleVoid';

const MessageComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [retrievedMessage, setRetrievedMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    setLoading(true);
    try {
      // Insert message into Supabase table
      const { error } = await supabase
        .from('messages')
        .insert({
          content: message,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      Alert.alert('Success', 'Message submitted successfully');
      setMessage(''); // Clear input after submission
    } catch (error: any) {
      Alert.alert('Submission Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMessage = async () => {
    setLoading(true);
    try {
      const { data: countData, error: countError } = await supabase
        .from('messages')
        .select('id');

      const totalRows = countData?.length || 0;
      const randomOffset = Math.floor(Math.random() * totalRows);

      // Fetch the most recent message
      const { data, error } = await supabase
        .from('messages')
        .select('content')
        .range(randomOffset, randomOffset)
        .single();

      if (error) throw error;

      setRetrievedMessage(data?.content || 'No messages found');
    } catch (error: any) {
      Alert.alert('Fetch Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleVoid} />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter your message"
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.submitButton,
            loading && styles.disabledButton
          ]}
          onPress={handleSubmitMessage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Submit Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.getMessageButton,
            loading && styles.disabledButton
          ]}
          onPress={handleGetMessage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Get Message</Text>
        </TouchableOpacity>
      </View>

      {retrievedMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Retrieved Message: {retrievedMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    minHeight: 100,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  getMessageButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  messageText: {
    textAlign: 'center',
  },
  purpleVoid: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'blue',
    width: 200,
    height: 200,
    borderRadius: '100%'
  },
});

export default MessageComponent;
