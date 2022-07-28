'use babel';

import HalooView from './haloo-view';
import { CompositeDisposable } from 'atom';

export default {

  halooView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.halooView = new HalooView(state.halooViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.halooView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'haloo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.halooView.destroy();
  },

  serialize() {
    return {
      halooViewState: this.halooView.serialize()
    };
  },

  toggle() {
    console.log('Haloo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
