function createButton({ type, name, callback, className, eventType }) {
  const button = renderButton({ type, className, name });

  if (!callback) return button;

  button.addEventListener(eventType, (event) => {
    event.preventDefault();
    callback();
  });

  return button;
}

function renderButton({ type, className, name }) {
  const button = document.createElement('button');
  button.type = type ? type : 'button';
  button.className = className;
  button.textContent = name;

  return button;
}

export default createButton;
