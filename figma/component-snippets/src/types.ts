export type ParamsMap = {
  [k: string]: {
    TEXT?: string;
    BOOLEAN?: boolean;
    INSTANCE_SWAP?: string;
    VARIANT?: string;
  };
};
export interface BasicObject {
  [k: string]: string;
}
export type ParamsValues = BasicObject;

export interface Snippet {
  name: string;
  props: {
    [k: string]: BasicObject | BasicObject[];
  };
  propTypes: BasicObject;
}
