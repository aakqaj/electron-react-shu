import { Button } from '@material-ui/core';
import { Upload } from 'renderer/components/Upload';
import { useBookSourceStore } from 'renderer/store';
import styles from './index.module.scss';
import { isBookSource } from 'renderer/utils';

export default function SourceManger() {
  const sourceStore = useBookSourceStore();

  const handleImport = (text: string) => {
    try {
      const data = JSON.parse(text);
      if (!isBookSource(data?.[0])) {
        console.log('no source');

        return false;
      }
      data as BookSource[];
      sourceStore.importSource(data);
    } catch (e) {
      console.log(e, 'err');
    }
  };

  return (
    <div className={styles.sourceManger}>
      <div className={styles.toolsBar}>
        <Upload accept={['json']} callback={handleImport}>
          <Button variant="contained" className={styles.uploadBtn}>
            导入
          </Button>
        </Upload>
        <Button variant="contained">导出</Button>

        <Button variant="contained">清空</Button>
      </div>
      {sourceStore.bookSources.map((item, key) => (
        <div key={key}>{item.SourceName}</div>
      ))}

      <button onClick={() => sourceStore.clearSource()}>按钮</button>
    </div>
  );
}
