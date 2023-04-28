const Todo = ({
    todo,
    handleDelete,
    handleDone,
    setShowModal,
    setEditingTodo,
  }) => {
    return (
      <div className="border shadow p-3 d-flex justify-content-between align-items-center rounded">
        <div className="d-flex flex-column gap-2  ">
          <h5
            style={{
              textDecoration: todo.isDone ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </h5>
          <p>{todo.date}</p>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(todo);
            }}
          >
            Sil
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
              setEditingTodo(todo);
            }}
          >
            Düzenle
          </button>
          <button className="btn btn-success" onClick={() => handleDone(todo)}>
            {todo.isDone ? 'Yapıldı' : ' Yapılacak'}
          </button>
        </div>
      </div>
    );
  };
  
  export default Todo;