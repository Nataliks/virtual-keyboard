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
  createKeys() {
    const fragment = document.createDocumentFragment();

    const keyboard = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
      'Ctrl', 'En', 'Alt', 'space', 'Alt', '◀', '▼', '▶', 'Ctrl',
    ];

    keyboard.forEach((key, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Del', 'Enter', 'right', 'Shift '].indexOf(key) !== -1;
      keyElement.id = key;
      keyElement.setAttribute('data-code', keyCode[index]);
      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('id', keyCode[index]);
      keyElement.classList.add('keyboard-key');

      switch (key) {
        case 'Backspace':
          keyElement.innerHTML = 'Backspace';

          keyElement.addEventListener('click', () => {
            const pos = this.getCursorPosition();
            this.properties.posCursor = pos - 1;
            this.setCursorPosition(this.properties.posCursor);
            this.elements.inputField.value = this.elements.inputField.value
              .substring(0, this.elements.inputField.value.length - 1);
          });
          break;

        case 'Tab':
          keyElement.innerHTML = 'Tab';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.value += '  ';

            const pos = this.getCursorPosition();
            this.properties.posCursor = pos + 2;
            this.setCursorPosition(this.properties.posCursor);
          });
          break;

        case 'Caps Lock':
          keyElement.classList.add('keyboard-key_activatable');
          keyElement.innerHTML = 'Caps Lock';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
            this.toggleCapsLock();

            keyElement.classList.toggle('keyboard-key_active');
          });
          break;

        case 'Shift':
          keyElement.innerHTML = 'Shift';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
            this.changeNumberRow();
          });
          break;

        case 'Enter':
          keyElement.innerHTML = 'Enter';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.value += '\n';

            const pos = this.getCursorPosition();
            this.properties.posCursor = pos + 1;
            this.setCursorPosition(this.properties.posCursor);
          });
          break;

        case 'En':
          keyElement.innerHTML = 'En';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
            this.togglechangeLang();
          });
          break;

        case 'Alt':
          keyElement.innerHTML = 'Alt';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
          });
          break;

        case 'Ctrl':
          keyElement.innerHTML = 'Ctrl';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
          });
          break;
        case 'Del':
          keyElement.innerHTML = 'Del';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.focus();
          });
          break;

        case 'space':
          keyElement.innerHTML = '';

          keyElement.addEventListener('click', () => {
            this.elements.inputField.value += ' ';

            const pos = this.getCursorPosition();
            this.properties.posCursor = pos + 1;
            this.setCursorPosition(this.properties.posCursor);
          });
          break;

          case '▶':
            keyElement.innerHTML = '▶';
  
            keyElement.addEventListener('click', () => {
              this.elements.inputField.value += '';
            });
            break;

            case '◀':
              keyElement.innerHTML = '◀';
    
              keyElement.addEventListener('click', () => {
                this.elements.inputField.value += '';
              });
              break;
          
              case '▼':
                keyElement.innerHTML = '▼';
      
                keyElement.addEventListener('click', () => {
                  this.elements.inputField.value += '';
                });
                break;

                case '▲':
            keyElement.innerHTML = '▲';
  
            keyElement.addEventListener('click', () => {
              this.elements.inputField.value += '';
            });
            break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            const pos = this.getCursorPosition();
            this.properties.posCursor = pos + 1;
            if (this.properties.capsLock || this.properties.shift) {
              this.elements.inputField.value = this.elements.inputField.value
                .slice(0, pos) + keyElement.textContent.toUpperCase() + this.elements.inputField
                .value.slice(pos);
            } else {
              this.elements.inputField.value = this.elements.inputField.value
                .slice(0, pos) + keyElement.textContent.toLowerCase() + this.elements.inputField
                .value.slice(pos);
            }
            this.setCursorPosition(this.properties.posCursor);
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  togglechangeLang() {
    const en = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
      'Ctrl', 'En', 'Alt', '', 'Alt', '◀', '▼', '▶', 'Ctrl',
    ];

    const ru = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\'', 'Del',
      'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
      'Ctrl', 'Ru', 'Alt', '', 'Alt', '◀', '▼', '▶', 'Ctrl',
    ];

    this.properties.lang = !this.properties.lang;
    if (this.properties.lang) {
      for (let i = 0; i < this.elements.keys.length; i += 1) {
        this.elements.keys[i].textContent = ru[i];
      }
    } else {
      for (let i = 0; i < this.elements.keys.length; i += 1) {
        this.elements.keys[i].textContent = en[i];
      }
    }
  },

  changeNumberRow() {
    const shiftKey = ['`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
    const en = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

    const ru = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

    this.properties.shift = !this.properties.shift;
    if (this.properties.shift) {
      for (let i = 0; i < 13; i += 1) {
        this.elements.keys[i].textContent = shiftKey[i];
      }
    } else if (!this.properties.shift && this.properties.lang) {
      for (let i = 0; i < 13; i += 1) {
        this.elements.keys[i].textContent = ru[i];
      }
    } else {
      for (let i = 0; i < 13; i += 1) {
        this.elements.keys[i].textContent = en[i];
      }
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && key.textContent.length <= 1) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  getCursorPosition() {
    return this.elements.inputField.selectionStart;
  },

  setCursorPosition(position) {
    this.elements.inputField.focus();
    this.elements.inputField.setSelectionRange(position, position);
  },

};

const falseClick = (e) => {
  const inputField = document.querySelector('.keyboard-input');

  if (document.activeElement !== inputField) {
    inputField.focus();
  }

  e.preventDefault();
  const currentEvent = { ...e };
  currentEvent.target = document.querySelector(`[data-code=${e.code}]`);
  return currentEvent;
};

const keyPress = (e) => {
  const inputField = document.querySelector('.keyboard-input');
  const currentKey = e.target ? e.target.getAttribute('data-code') : '';
  const pos = inputField.selectionStart;

  if (currentKey === 'Tab') {
    inputField.value = `${inputField.value.substring(0, pos)}  ${inputField.value.substring(pos)}`;
    inputField.setSelectionRange(pos + 2, pos + 2);
  } else if (currentKey === 'Space') {
    inputField.value = `${inputField.value.substring(0, pos)} ${inputField.value.substring(pos)}`;
    inputField.setSelectionRange(pos + 1, pos + 1);
  } else if (currentKey === 'Enter') {
    inputField.value = `${inputField.value.substring(0, pos)}\n${inputField.value.substring(pos)}`;
    inputField.setSelectionRange(pos + 1, pos + 1);
  } else if (currentKey === 'Backspace') {
    inputField.value = `${inputField.value.substring(0, pos - 1)}\n${inputField.value.substring(pos)}`;
    inputField.setSelectionRange(pos - 1, pos - 1);
  } else if (currentKey === 'CapsLock' || currentKey === 'AltRight' || currentKey === 'AltLeft' || currentKey === 'ShiftLeft' || currentKey === 'ShiftRight' || currentKey === 'ControlLeft' || currentKey === 'ControlRight' || currentKey === 'ShiftRight' || currentKey === 'ControlLeft' || currentKey === "ArrowLeft" || currentKey === "ArrowDown" || currentKey === "ArrowUp" ||currentKey === "ArrowRight") {
    inputField.value = `${inputField.value.substring(0, pos)}${inputField.value.substring(pos)}`;
  } else {
    const keyElement = e.target.innerHTML;
    inputField.value = inputField.value.substring(0, pos) + keyElement + inputField
      .value.substring(pos);
    inputField.setSelectionRange(pos + 1, pos + 1);
  }
};

document.addEventListener('keydown', (e) => keyPress(falseClick(e)));

window.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft' && e.ctrlKey) {
    Keyboard.togglechangeLang();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

window.addEventListener('keydown', (e) => {
  document.querySelector(`.keyboard-key[data-code="${e.code}"]`).classList.add('active');
});

window.addEventListener('keyup', (e) => {
  const currentKey = document.querySelector(`.keyboard-key[data-code="${e.code}"]`);

  if (currentKey) {
    currentKey.classList.remove('active');
  }

  const capsKey = document.querySelector('.keyboard-key[data-code="CapsLock"]');
  if (e.code === 'CapsLock') {
    Keyboard.toggleCapsLock();
    capsKey.classList.toggle('keyboard-key_active');
  }

  if (e.code === 'ShiftLeft') {
    Keyboard.changeNumberRow();
  }
});
