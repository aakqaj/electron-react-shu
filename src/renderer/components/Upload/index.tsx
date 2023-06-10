import { useRef, ReactNode, FC } from 'react';

type FileType =
  | 'json'
  | 'zip'
  | 'pdf'
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'gif'
  | 'txt'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx';

type IUpload = {
  accept: FileType[];
  callback: (text: string) => void;
  children: ReactNode;
};

export const Upload: FC<IUpload> = ({ accept, callback, children }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const getFilds = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
      fileRef.current.click();
    }
  };

  const fileinputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files?.[0];
    if (!fileData) return;
    const reader = new FileReader();
    reader.readAsText(fileData);
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      callback(fileContent);
    };
  };

  return (
    <div>
      <input
        id="file"
        ref={fileRef}
        type="file"
        accept={accept.map((item) => `.${item}`).join(',')}
        style={{ display: 'none' }}
        onChange={(e) => fileinputChange(e)}
      />
      <span onClick={getFilds}>{children}</span>
    </div>
  );
};
