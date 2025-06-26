import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [memos, setMemos] = useState(() => {
    const stored = localStorage.getItem('memos');
    return stored ? JSON.parse(stored) : [];
  });

  //メモ追加
  const handleAdd = () => {
    if(input.trim() === '') return;
    const newMemos = {id: Date.now(), text: input};
    setMemos((prev) => [...prev, newMemos]);
    setInput('');
  };

  //メモ削除
  const handleDelete = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  //ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  return (
    <div className='App'>
      <h1>メモ帳アプリ</h1>
      <input
        type = "text"
        value = {input}
        placeholder='メモを入力...'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) =>  e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>追加</button>

      <ul> 
        {memos.map((memo) => (
          <li key = {memo.id}>
            {memo.text}
            <button onClick={() => handleDelete(memo.id)}>削除</button>
          </li>
        ))}  
      </ul>  
    </div>
  );
}


export default App;
