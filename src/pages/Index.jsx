import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() === '') {
      toast({
        title: 'No task entered',
        description: "Please enter a task before adding.",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: inputValue, isCompleted: false }]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button colorScheme="blue" onClick={addTask}>Add Task</Button>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.text}</span>
              <div>
                <IconButton icon={<FaCheckCircle />} onClick={() => toggleTaskCompletion(task.id)} colorScheme={task.isCompleted ? 'green' : 'gray'} m={1} aria-label="Complete Task" />
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" m={1} aria-label="Delete Task" />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;