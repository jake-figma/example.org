export type ParamsMap = {
  [k: string]: {
    TEXT?: string;
    BOOLEAN?: boolean;
    INSTANCE_SWAP?: string;
    VARIANT?: string;
  };
};
export interface BasicObject {
  [k: string]: string | undefined;
}
export type ParamsValues = BasicObject;

type SnippetStrings = {
  [k: string]:
    | string
    | string[]
    | undefined
    | BasicObject
    | {
        [k: string]: BasicObject | BasicObject[];
      };
};
export interface Snippet extends SnippetStrings {
  name: string;
  alternates?: string[];
  params: BasicObject;
  props: BasicObject;
}
