import { useEffect, useRef, useState } from 'react';
import { useBookSourceStore } from 'renderer/store';
import '@material-ui/icons/Close';

function Upload() {
  // 触发选择文件模拟点击事件
  const fileRef = useRef<HTMLInputElement>(null);
  const getFilds = () => fileRef.current?.click();

  const fileinputChange = (event: any) => {
    const fileData = event.target.files[0];
    if (fileData) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        console.log(fileContent); // 打印文件内容
      };

      reader.readAsText(fileData);
    }
  };

  return (
    <div>
      <input
        id="file"
        ref={fileRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={(e) => fileinputChange(e)}
      />
      <button onClick={getFilds}>上传excel</button>
    </div>
  );
}

export default function SourceManger() {
  const sourceStore = useBookSourceStore();

  return (
    <div>
      {sourceStore.bookSources.map((item, key) => (
        <div key={key}>{item.SourceName}</div>
      ))}

      <button onClick={() => sourceStore.export()}>按钮</button>
      <Upload />
    </div>
  );
}
