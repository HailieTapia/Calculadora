import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (button) => {
    if (button === '=') {
      calculateResult();
    } else if (button === 'C') {
      clearInput();
    } else {
      setInput(input + button);
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input);
      if (evalResult === Infinity || isNaN(evalResult)) {
        setResult('Error: Número inválido');
      } else {
        setResult(evalResult.toString());
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input}</Text>
        <Text style={styles.displayResult}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonsRow}>
            {row.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, button.style]}
                onPress={() => handleInput(button.value)}
              >
                <Text style={styles.buttonText}>{button.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC', 
  },
  displayContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  displayText: {
    fontSize: 36,
    marginBottom: 5,
  },
  displayResult: {
    fontSize: 24,
    color: 'gray',
  },
  buttonsContainer: {
    width: windowWidth * 0.8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', 
    height: 75,
    width: 70,
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#333333', 
  },
  buttonText: {
    fontSize: 24,
  },
});

const buttons = [
  [{ value: 'C', style: { backgroundColor: 'orange' } }, { value: '(', style: {} }, { value: ')', style: {} }, { value: '÷', style: {} }],
  [{ value: '7', style: {} }, { value: '8', style: {} }, { value: '9', style: {} }, { value: '×', style: {} }],
  [{ value: '4', style: {} }, { value: '5', style: {} }, { value: '6', style: {} }, { value: '-', style: {} }],
  [{ value: '1', style: {} }, { value: '2', style: {} }, { value: '3', style: {} }, { value: '+', style: {} }],
  [{ value: '0', style: { flex: 2 } }, { value: '.', style: {} }, { value: '=', style: { backgroundColor: 'lightgreen' } }],
];
