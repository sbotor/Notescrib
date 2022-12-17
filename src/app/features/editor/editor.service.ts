import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { EditorMode } from './editor.models';
import { EditorView } from 'codemirror';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import { defaultKeymap } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import {
  ViewUpdate,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import {
  bracketMatching,
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { markdownHighlighting, theme } from './code-mirror.utils';

@Injectable()
export class EditorService {
  private dirty = false;
  private mode: EditorMode = 'readonly';

  private readonly saveSubject = new Subject<void>();
  public readonly save$ = this.saveSubject.asObservable();

  private readonly contentSubject = new BehaviorSubject<string>('');
  public readonly content$ = this.contentSubject.asObservable();

  public readonly renderedContent$ = this.content$.pipe(switchMap(this.render));

  private codeMirrorState: EditorState;

  constructor() {
    this.codeMirrorState = this.resetCodeMirrorState('');
  }

  public getCodeMirrorState() {
    return this.codeMirrorState;
  }

  public resetContent(content: string, dirty = true) {
    this.dirty = dirty;
    this.codeMirrorState = this.resetCodeMirrorState(content);
    this.emitContent();
  }

  public isDirty() {
    return this.dirty;
  }

  public clearDirty() {
    this.dirty = false;
  }

  public save() {
    this.saveSubject.next();
  }

  public getMode() {
    return this.mode;
  }

  public setMode(mode: EditorMode) {
    this.mode = mode;
  }

  private async render(content: string) {
    const promise = marked.parse(content, {
      async: true,
    });

    return await promise;
  }

  private onViewUpdate(update: ViewUpdate) {
    if (update.docChanged) {
      this.dirty = true;
      this.codeMirrorState = update.state;
      this.emitContent();
    }
  }

  private emitContent() {
    const content = this.codeMirrorState.doc.toJSON().join('\n');
    this.contentSubject.next(content);
  }

  private resetCodeMirrorState(content: string) {
    return EditorState.create({
      doc: content,
      extensions: [
        markdown({
          addKeymap: false,
          base: markdownLanguage,
        }),
        keymap.of([...markdownKeymap, ...defaultKeymap, ...searchKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        indentOnInput(),
        bracketMatching(),
        foldGutter(),
        highlightSpecialChars(),
        theme,
        EditorView.lineWrapping,
        syntaxHighlighting(markdownHighlighting),
        EditorView.updateListener.of((update) => this.onViewUpdate(update)),
      ],
    });
  }
}
