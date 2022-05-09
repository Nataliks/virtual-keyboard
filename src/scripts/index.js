const keyCode = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];

const Keyboard = {
  elements: {
    inputField: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    posCursor: 0,
    capsLock: false,
    shift: false,
    lang: false,
  },

  init() {
    this.elements.inputField = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard_hidden');
    this.elements.inputField.classList.add('keyboard-input');
    this.elements.keysContainer.classList.add('keyboard-keys');

    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.inputField);
    document.body.appendChild(this.elements.main);
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
