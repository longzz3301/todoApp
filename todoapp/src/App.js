import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { VscCircleSlash } from "react-icons/vsc";
import { RxCountdownTimer } from "react-icons/rx";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";

function App() {
  const [pick, setPick] = useState();
  // console.log(pick)

  const [todo, setTodo] = useState([
    
  ]);

  const [text, setText] = useState("");


  // update item 
  useEffect(() => {
    if (pick !== undefined) {
      const itemUpdate = todo[pick];
      console.log("itemUpdate", itemUpdate);
      setText(itemUpdate?.content);
    } else {
      setText("");
    }
  }, [pick]);



  // create new item
  const onClickCreate = () => {
    console.log("input value :", text);
            const todoItem = {
              content: text,
              status: false,
            };
            // console.log(todoItem);
            let toDoNew = [...todo];
            // console.log(toDoNew)

            if (pick !== undefined) {
              toDoNew = toDoNew.map((value, index) => {
                if (index === pick) {
                  return todoItem;
                } else {
                  return value;
                }
              });
              console.log("toDoNew", toDoNew);
            } else {
              toDoNew.push(todoItem);
            }
            setTodo(toDoNew);

  }

  const onDelete =(index) => {
    console.log("log ra item", index)
    let todoItem = [...todo]
    todoItem =todoItem.filter((value ,index0)=> index !== index0 )
    

    setTodo(todoItem)
  }



  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          onChange={(e) => {
            const getText = e.target.value;
            setText(getText);
          }}
          value={text}
        />
        <button
          onClick={onClickCreate}
        >
          <IoIosAddCircleOutline /> {pick !== undefined ? "update" : "add"}
        </button>
      </div>

      <div className="content">
        <label className="list">TodoList</label>

        {todo.map((item, index) => (
          <div className="item ">
            <>
              <div className="item-value">
                <input
                  type="checkbox"
                  name="pick"
                  id=""
                  className="itemCheckbox"
                  onClick={(e) => {
                    // console.log(e.target.checked)

                    if (e.target.checked === true) {
                      setPick(index);
                      // console.log(index)
                      console.log(pick)
                    } else {
                      setPick(undefined);
                    }
                  }}
                  checked={pick === index} 
                  
                />
                <div className="item-value">
                  {item?.status ? <IoCheckmarkDone /> : <RxCountdownTimer />} 

                  <p>{item?.content}</p>
                </div>
              </div>
              <button className="item_delete" onClick={() => {
                // delete item
                console.log("log ra item", index)
                let todoItem = [...todo]
                todoItem =todoItem.filter((value ,index0)=> index !== index0 )
                

                setTodo(todoItem)
              }}> 
                <IoTrashOutline /> Delete
              </button>
              <button
                className="item_delete"
                onClick={() => {
                  // update trang thai status
                  console.log("button click", index);
                  let todoItem = [...todo];
                  todoItem = todoItem.map((value,index1) => {
                    if ((index1 === index)) {
                      return {
                        content: value.content,
                        status: !value.status,
                      };
                      
                    }
                    return value;
                    
                  });
                  setTodo(todoItem);
                }}
              >
                <IoIosCheckboxOutline /> {item?.status ? "done" : "proccessing"}
              </button>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
