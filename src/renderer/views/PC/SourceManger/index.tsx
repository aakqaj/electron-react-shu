import { Button, IconButton } from "@material-ui/core";
import { Upload } from "renderer/components/Upload";
import { useBookSourceStore } from "renderer/store";
import styles from "./index.module.scss";
import { isBookSource } from "renderer/utils";
import FadeIn from "../../../components/FadeIn";


import Tooltip from "@material-ui/core/Tooltip";
import DownloadingIcon from "@mui/icons-material/Downloading";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function SourceManger() {
  const sourceStore = useBookSourceStore();

  const handleImport = (text: string) => {
    try {
      const data = JSON.parse(text);
      if (!isBookSource(data?.[0])) {
        console.log("no source");

        return false;
      }
      sourceStore.importSource(data as BookSource[]);
    } catch (e) {
      console.log(e, "err");
    }
  };

  return (
    <FadeIn>
      <div className={styles.sourceManger}>
        <div className={styles.toolsBar}>
          <Upload accept={["json"]} callback={handleImport}>
            <Tooltip title="导入书源" placement="top" arrow><IconButton
              className={styles.uploadBtn}><DownloadingIcon /></IconButton></Tooltip>
          </Upload>
          <Tooltip title="导出书源" placement="top" arrow><IconButton><DownloadingIcon /></IconButton></Tooltip>
          <Tooltip title="清空书源" placement="top" arrow><IconButton><DeleteOutlineIcon /></IconButton></Tooltip>

        </div>
        {sourceStore.bookSources.map((item, key) => (
          <div key={key}>{item.SourceName}</div>
        ))}

        <DownloadingIcon />
        <button onClick={() => sourceStore.clearSource()}>按钮</button>
      </div>
    </FadeIn>
  );
}
