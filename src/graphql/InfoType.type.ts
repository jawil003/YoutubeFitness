export default interface InfoType {
  cacheControl: Record<string, unknown>;
  fieldName: string;
  fieldNotes: {
    alias: { kind: "string"; loc: any };
    selectionSet: SelectionSet;
  }[];
  fragments: Record<string, unknown>;
  parentType: Record<string, unknown>;
  path: {
    prev: string;
    key: string;
    typename: string;
  };
  schema: any;
}

interface SelectionSet {
  kind: string;
  selections: {
    kind: string;
    name: { value: string };
    selectionSet?: SelectionSet;
  }[];
}
