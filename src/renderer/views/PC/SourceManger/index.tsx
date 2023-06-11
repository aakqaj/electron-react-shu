import { Button ,IconButton} from '@material-ui/core';
import { Upload } from 'renderer/components/Upload';
import { useBookSourceStore } from 'renderer/store';
import styles from './index.module.scss';
import { isBookSource } from 'renderer/utils';

import DownloadingIcon from '@mui/icons-material/Downloading';

export default function SourceManger() {
  const sourceStore = useBookSourceStore();

  const handleImport = (text: string) => {
    try {
      const data = JSON.parse(text);
      if (!isBookSource(data?.[0])) {
        console.log('no source');

        return false;
      }
      sourceStore.importSource(data as BookSource[]);
    } catch (e) {
      console.log(e, 'err');
    }
  };

  return (
    <div className={styles.sourceManger}>
      <div className={styles.toolsBar}>
        <Upload accept={['json']} callback={handleImport}>
          <IconButton variant="contained" className={styles.uploadBtn}>
            <DownloadingIcon/>
          </IconButton>
        </Upload>
        <Button variant="contained">导出</Button>

        <Button variant="contained">清空</Button>
      </div>
      {sourceStore.bookSources.map((item, key) => (
        <div key={key}>{item.SourceName}</div>
      ))}

      <DownloadingIcon/>
      <button onClick={() => sourceStore.clearSource()}>按钮</button>
    </div>
  );
}
