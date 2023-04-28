
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/todo';
import Modal from './components/modal';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});
  // ekle butonuna tıklanınca yeni todo oluşturur
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) {
      toast.warn('Formu doldurun', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    // todo için gerekli bilgleri içeren obje ouşturma
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };

    // oluşturulan todo objesini todolar stateine aktarma
    // spread opertorle önceden eklenenleri muhafaza ettik
    setTodos([...todos, newTodo]);

    // eleman eklenince formu sıfırlama
    setTodoText('');
  };

  // silme butonuna tıklandığında çalışır
  // todo dizisini gezer ve id si silinecek todonun idsine eşit olmayanları döndürür
  const handleDelete = (deletedTodo) => {
    const filtred = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filtred);

    // bildirim verme
    toast.error('Todo kaldırıldı', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  // yapıldı butonuna tıklanıldığında çaılşır
  // 1 - düzenelenicek todonun dizideki sırasını bulma
  // 2 - düzenlenicek todonun isDone değerini terişne çevirme
  // 3 - todoyu diziden çıkarıp yerine düzenlenmiş halini koyma
  // 4 - todolar dizisinin bir kopyasını oluşturup onu güncelledik
  //  5 - güncelellenen kopyayı todoloların yerni değeri olarak tanımladık
  // ["elma" , "armut1", "karpuz"]
  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);

    const newValue = !todos[index].isDone;
    const changedTodo = { ...todo, isDone: newValue };

    const newTodos = [...todos];

    newTodos.splice(index, 1, changedTodo);

    setTodos(newTodos);
  };

  // modaldaki save butonuna tıklandığında değerleri değişen objeyi dizeye aktarma
  const handleSaveEdit = () => {
    // eğer girilen title değeri boş ise ekrana uyarı verme
    if (!editingTodo.title) {
      toast.warn('Başlık değeri boş bırakılamaz', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    // splice için değişecek elemanın dizideki yerini bulduk(indexi)
    let index = todos.findIndex((item) => item.id === editingTodo.id);

    // direkt olarak statei değiştirmek yerine todo dizisinin bir kopyasını oluşturduk
    const cloneTodos = [...todos];

    // dizinin güncellenecek todoyu çıkarıp yerine düzenlenmiş todoyu ekledik
    cloneTodos.splice(index, 1, editingTodo);

    // ekrana bastığımız diziyi güncelledik
    setTodos(cloneTodos);

    // kaydedildikten sora modalı kapatma
    setShowModal(false);

    // ekrana bildirim gönderme
    toast.success('Todo başarıyla güncellendi', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="bg-dark">CRUD</h1>
      <div className="container border p-4 mt-4">
        <form onSubmit={handleSubmit} className="d-flex gap-3">
          <input
            className="form-control"
            type="text"
            placeholder="yapılcakları giriniz..."
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          <button className="btn btn-warning btn-lg">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {/* eğer state içersi boş ise ekrana yapılcak yok basıyoruz */}

          {todos.length === 0 && (
            <h4 className="text-center">Yapılacak herhangi bir işiniz yok.</h4>
          )}

          {/* eğer state içerisinde eleman varsa elemanalrı ekrana basıyoruz */}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditingTodo={setEditingTodo}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowModal={setShowModal}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;