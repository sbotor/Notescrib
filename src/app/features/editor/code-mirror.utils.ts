import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { EditorView } from "codemirror";

export const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    class: 'mat-h1'
  },
  {
    tag: tags.heading2,
    class: 'mat-h2'
  },
  {
    tag: tags.heading3,
    class: 'mat-h3'
  },
  {
    tag: tags.heading4,
    class: 'mat-h4'
  },
  {
    tag: tags.heading5,
    class: 'mat-h5'
  },
  {
    tag: tags.heading6,
    class: 'mat-h6'
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
