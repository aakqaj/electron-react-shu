declare global {
  interface BookSource {
    Weight: number;
    SourceName: string;
    BaseUrl: string;
    Search: {
      SearchUrl: string;
      Method: string;
      Payload: any;
      ResultBookListRule: string;
      DetailUrlRule: string;
      BookNameRule: string;
      AuthorRule: string;
      TypeRule: string;
      WordsCountRule: string;
      NewChapterRule: string;
      IntroRule: string;
      ImgURLRule: string;
      NewChapterDateRule: string;
    };
    BookDetail: {
      BookNameRule: string;
      AuthorRule: string;
      TypeRule: string;
      WordsCountRule: string;
      NewChapterRule: string;
      NewChapterDateRule: string;
      IntroRule: string;
      ImgURLRule: string;
      Content: {
        DetailUrlRule: string;
        CatalogueListRule: string;
        CatalogueNameRule: string;
        CatalogueUrlRule: string;
        NextCatalogePageRule: string;
        ContentRule: string;
        NextContentPageRule: string;
      };
    };
  }

  interface Message {
    state: boolean;
    message: string;
  }
}

export default global;
