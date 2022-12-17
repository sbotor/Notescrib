import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { EditorView } from "codemirror";

export const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading4,
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading5,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading6,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic',
  },
  {
    tag: tags.strong,
    fontWeight: 'bold',
  },
  {
    tag: tags.quote,
    fontStyle: 'italic',
  },
]);

export const theme = EditorView.theme({
  '&': {
    height: '100%',
    cursor: 'text',
  },
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
});
