import { useState, useEffect } from "react";
import { AppShell, useMantineTheme, Flex, Button, ScrollArea } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NavbarNested from "~/Navbar/Navbar";
import { MainCard } from "~/Card/Card";

// const MockData = [
//   // {
//   //   position: 6,
//   //   mass: 12.011,
//   //   symbol: "C",
//   //   name: "Radio",
//   //   color: theme.colors.teal[0],
//   //   icon: <IconCircleDot color="black" size={24} />,
//   // },
//   // {
//   //   position: 7,
//   //   mass: 14.007,
//   //   symbol: "N",
//   //   name: "Checkboxes",
//   //   color: theme.colors.indigo[0],
//   //   icon: <IconCheckbox color="black" size={24} />,
//   // },
//   // {
//   //   position: 39,
//   //   mass: 88.906,
//   //   symbol: "Y",
//   //   name: "Short Answer",
//   //   color: theme.colors.yellow[0],
//   //   icon: <IconMenu color="black" size={24} />,
//   // },
//   // {
//   //   position: 56,
//   //   mass: 137.33,
//   //   symbol: "Ba",
//   //   name: "Long Answer",
//   //   color: theme.colors.red[0],
//   //   icon: <IconMenu2 color="black" size={24} />,
//   // },
//   // {
//   //   position: 58,
//   //   mass: 140.12,
//   //   symbol: "Ce",
//   //   name: "Email",
//   //   color: theme.colors.teal[0],
//   //   icon: <IconMail color="black" size={24} />,
//   // },
// ];

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  
  const [listState, handlers] = useListState([]);
  const [questions, setQuestions] = useState(listState || []);

  useEffect(() => {
    setQuestions(listState);
  }, [listState])

  console.log('Current questions:', questions);

  //create  an onDragEnd function that will be used by all the draggable components
  const onDragEnd = (result: any, provided: any) => {

    if (!result.destination) return;
    const { source, destination } = result;

    const newQuestion = {
      id: Math.floor(Math.random() * 999),
      type: result.draggableId,
      options: [
        { id: Math.floor(Math.random() * 999), option: "Carbon", isCorrectAnswer: true },
      ],
    }
    // if (source.droppableId === destination.droppableId && destination.droppableId === 'dnd-list') {
    //   handlers.reorder({
    //     from: source.index,
    //     to: destination?.index || 0,
    //   });
    //   console.log('Reordering');
    // }

    if(destination.droppableId === 'dnd-list2') {
      handlers.append(newQuestion);
    };

      
  };

  const onAddNewQuestion = () => {
    const newQuestion = {
      id: Math.floor(Math.random() * 999),
      type: 'Radio',
      options: [
        { id: Math.floor(Math.random() * 999), option: "Carbon", isCorrectAnswer: true },
      ],
    }

    handlers.append(newQuestion);
  }

  return (
    //create a drag and drop context that will be used by all the droppable components
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <AppShell
        hidden={burgerOpen}
        styles={{
          main: {
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={<NavbarNested opened={opened} />}
      >
          <Droppable droppableId="dnd-list2" direction="horizontal">
            {(provided) => (
              <ScrollArea h="100vh">
                <Flex
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  mih="100vh"
                  mx="auto"
                  direction='column'
                  gap='10px'   
                  p={{ base: 'sm', sm:'md', lg: 'lg' }} 
                  justify='center' 
                  align='center'
                            
                >
                  {provided.placeholder}
                  {/* <h2>Hello World</h2> */}
                  {
                    questions?.length > 0 
                    && questions.map((element, index) => <MainCard handlers={handlers} questions={questions} setQuestions={setQuestions} listState={listState} questionData={element} key={`${element}-${index}`}/>)
                  }

                  <Button w='100%' variant='default' onClick={onAddNewQuestion}>
                    <Flex align='center' gap='5px'>
                      <IconCirclePlus/>
                      Add Question
                    </Flex>
                  </Button>
                </Flex>
              </ScrollArea>
            )}
            
          </Droppable>
      </AppShell>
    </DragDropContext>
  );
}
